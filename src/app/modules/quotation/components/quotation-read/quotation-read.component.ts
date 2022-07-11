import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { QuotationSerialized } from '../../models/QuotationSerialized';
import { QuotationControlService } from '../../services/quotation-control.service';
import { QuotationService } from '../../services/quotation.service';

@Component({
  selector: 'app-quotation-read',
  templateUrl: './quotation-read.component.html',
  styleUrls: ['./quotation-read.component.scss']
})
export class QuotationReadComponent implements OnInit {

  public quotationSerialized: QuotationSerialized = new QuotationSerialized();
  public quotationSerializedList: QuotationSerialized[] = [];
  public selectedQuotationSerialized: QuotationSerialized = new QuotationSerialized();

  @ViewChild('dt') table?: Table;

  public showSelectedItemDialog: boolean = false;
  errorMessage: string = "";

  constructor( private router: Router,
    private quotationService: QuotationService,
    private quotationControlService: QuotationControlService ) { }

  ngOnInit(): void {
    this.findAllQuotationSerialized();
  }

  findAllQuotationSerialized() {
    this.quotationService.findAllQuotationSerialized()
      .subscribe(data => {
        this.quotationSerializedList = data;
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
    this.quotationSerialized = this.selectedQuotationSerialized;
    this.quotationControlService.quotationSerialized = this.quotationSerialized;
    this.selectedQuotationSerialized = new QuotationSerialized();
    this.showSelectedItemDialog = true;
  }

  onRowUnselect(event: any) {
    this.selectedQuotationSerialized = new QuotationSerialized();
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.quotationSerializedList);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "quotations");
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
      this.router.navigate([""])
      this.router.navigate(["quotation/to-process"]);
  }

}
