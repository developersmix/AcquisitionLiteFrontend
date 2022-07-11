import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { RequisitionSerialized } from 'src/app/modules/requisition/models/RequisitionSerialized';
import { RequisitionService } from 'src/app/modules/requisition/services/requisition.service';
import { QuotationControlService } from '../../services/quotation-control.service';

@Component({
  selector: 'app-quotation-to-process',
  templateUrl: './quotation-to-process.component.html',
  styleUrls: ['./quotation-to-process.component.scss']
})
export class QuotationToProcessComponent implements OnInit {

  public requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  public requisitionSerializedList: RequisitionSerialized[] = [];
  public selectedRequisitionSerialized: RequisitionSerialized = new RequisitionSerialized();

  @ViewChild('dt') table?: Table;

  errorMessage: string = "";

  constructor( private router: Router,
    private requisitionService: RequisitionService,
    private quotationControlService: QuotationControlService ) { }

  ngOnInit(): void {
    this.findAllInCreatedStatus();
  }

  findAllInCreatedStatus() {
    this.requisitionService.findAllInCreatedStatus()
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
    this.quotationControlService.requisitionSerialized = this.requisitionSerialized;
    this.selectedRequisitionSerialized = new RequisitionSerialized();
    this.router.navigate(["quotation/create"]);
  }

  onRowUnselect(event: any) {
    this.selectedRequisitionSerialized = new RequisitionSerialized();
  }

  refresh() {
      this.router.navigate([""])
      this.router.navigate(["quotation/to-process"]);
  }

}
