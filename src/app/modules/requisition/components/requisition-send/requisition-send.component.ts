import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RequisitionSerialized } from '../../models/RequisitionSerialized';
import { RequisitionService } from '../../services/requisition.service';

@Component({
  selector: 'app-requisition-send',
  templateUrl: './requisition-send.component.html',
  styleUrls: ['./requisition-send.component.scss']
})
export class RequisitionSendComponent implements OnInit {

  // FOR TABLE WITH ALL REQUISITIONS
  public requisition: RequisitionSerialized = new RequisitionSerialized();
  public requisitions: RequisitionSerialized[] = [];
  public selectedRequisition: RequisitionSerialized = new RequisitionSerialized();
  // FOR REQUISITIONS TO RECIEVE
  public requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  public requisitionSerializedList: RequisitionSerialized[] = [];
  public selectedRequisitionSerialized: RequisitionSerialized = new RequisitionSerialized();

  // SEARCH ITEM
  public criteria: string = "";
  public submittedSearch: boolean = false;
  public showTableRequisitionDialog: boolean = false;
  private errorMessage: string = "";

  constructor( private router: Router,
    private requisitionService: RequisitionService,
    private messageService: MessageService ) { }

    ngOnInit(): void {
    }
  
    // SEARCH AND CHOOSE ONE ITEM
  
    findByCriteriaInColumns() {
      if (this.criteria == undefined || !this.criteria.valueOf()) {
        this.submittedSearch = true;
        return;
      } else {
        this.requisitionService.findByCriteriaInColumns(this.criteria)
          .subscribe(data => {
            this.requisitions = data;
            if(data.length>1) {
            this.showTableRequisitionDialog = true;
            } else { this.requisitionSerializedList.push(this.requisitions[0])}
            }, error => {
              var e: HttpErrorResponse = error;
              if (e.status === 0) {
                this.errorMessage = "Connection to server not established.";
              } else if (e.status === 401) {
                this.errorMessage = "Unauthorized -> Bad credentials.";
              } else { alert("Status : " + e.status + " Error : " + e.message + " in " + this.constructor.name.toString()); }
          });
      }
    }
  
    onRowSelect(event: any) { 
      this.showTableRequisitionDialog = false;
      this.requisition = this.selectedRequisition;
      this.requisitionSerializedList.push(this.requisition);
      this.selectedRequisition = new RequisitionSerialized();
      this.requisitions = [];
    }
  
    onRowUnselect(event: any) {
      this.requisition = new RequisitionSerialized;
    }
  
    hideTableRequisitionDialog() {
      this.showTableRequisitionDialog = false;
    }

    removeRequisition(requisitionSerialized: RequisitionSerialized) {
      this.requisitionSerializedList = this.requisitionSerializedList.filter(r => r !== requisitionSerialized);
    }

    send() {
      this.messageService.add({severity:'success', summary: 'Mensaje', detail: 'Registros agregados', life: 3000});
      this.requisitionSerializedList = [];
    }

}
