import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RequisitionSerialized } from '../../models/RequisitionSerialized';
import { RequisitionService } from '../../services/requisition.service';

@Component({
  selector: 'app-requisition-read',
  templateUrl: './requisition-read.component.html',
  styleUrls: ['./requisition-read.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class RequisitionReadComponent implements OnInit {
    
  public requisitionsCreated: number = 0;
  public requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  public requisitionSerializedList: RequisitionSerialized[] = [];
  public selectedRequisitionSerialized: RequisitionSerialized = new RequisitionSerialized();

  @ViewChild('dt') table?: Table;

  errorMessage: string = "";

  constructor( private router: Router,
    private requisitionService: RequisitionService ) { }

  ngOnInit(): void {
    this.findAllRequisitionSerialized();
  }

  findAllRequisitionSerialized() {
    this.requisitionService.findAllRequisitionSerialized()
      .subscribe(data => {
        this.requisitionSerializedList = data;
    }, error => {
        var e: HttpErrorResponse = error;
        if (e.status === 0) {
          this.errorMessage = "Connection to server not established.";
        } else if (e.status === 401) {
          this.errorMessage = "Unauthorized -> Bad credentials.";
        } else { alert("Status : " + e.status + " Error : " + e.message + " in " + this.constructor.name.toString()); }
    });
  }

  onRowSelect(event: any) { 
    this.requisitionSerialized = this.selectedRequisitionSerialized;
    this.selectedRequisitionSerialized = new RequisitionSerialized();
  }

  onRowUnselect(event: any) {
    this.selectedRequisitionSerialized = new RequisitionSerialized();
  }

  openNew() {
    this.requisitionSerialized = new RequisitionSerialized();
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.requisitionSerializedList);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "requisitions");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  refresh() {
      this.router.navigate(['']);
      this.router.navigate(['requisition/read']);
  }

  editRequisition(requisitionSerialized: RequisitionSerialized) {

  }

  deleteRequisition(requisitionSerialized: RequisitionSerialized) {

  }

}
