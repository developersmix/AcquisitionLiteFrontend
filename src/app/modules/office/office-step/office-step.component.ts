import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RequisitionStepsService } from '../../requisition/services/requisition-steps.service';
import { Office } from '../models/Office';
import { OfficeService } from '../services/office.service';

@Component({
  selector: 'app-office-step',
  templateUrl: './office-step.component.html',
  styleUrls: ['./office-step.component.scss']
})
export class OfficeStepComponent implements OnInit {

  public office: Office = new Office();
  public selectedOffice: Office = new Office();
  public newOffice: Office = new Office();
  public offices: Office[] = [];

  // SEARCH ITEM
  public criteria: string = "";
  public submittedSearch: boolean = false;
  public showTableOfficeDialog = false;
  
  // CREATE ITEM
  public submittedNew: boolean = false;
  public showNewOfficeDialog: boolean = false;

  public errorMessage = "";

  public isAdmin: boolean = false;

  constructor( private router: Router,
    private officeService: OfficeService,
    private requisitionStepsService: RequisitionStepsService,
    private messageService: MessageService ) { }

  ngOnInit(): void {
    this.office = this.requisitionStepsService.requisitionInformation.Office;
  }

  // SEARCH AND CHOOSE ONE ITEM

  findByCriteriaInColumns() {
    if (this.criteria == undefined || !this.criteria.valueOf() || this.criteria.length < 4) {
      this.submittedSearch = true;
      return;
    } else {
      this.officeService.findByCriteriaInColumns(this.criteria)
        .subscribe(data => {
          this.offices = data;
          this.showTableOfficeDialog = true;
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
    this.showTableOfficeDialog = false;
    this.office = this.selectedOffice;
    this.requisitionStepsService.requisitionInformation.Office = this.selectedOffice;
    this.selectedOffice = new Office();
    this.offices = [];
  }

  onRowUnselect(event: any) {
    this.office = new Office;
    this.requisitionStepsService.requisitionInformation.Office = this.office;
  }

  hideTableOfficeDialog() {
    this.showTableOfficeDialog = false;
  }

  // SAVE ONE ITEM

  showNewDialog() {
    this.newOffice = new Office();
    this.submittedNew = false;
    this.showNewOfficeDialog = true;
  }

  hideNewDialog() {
    this.showNewOfficeDialog = false;
    this.submittedNew = false;
    this.newOffice = new Office();
  }

  saveOffice(officeForm: NgForm) {
    if (!officeForm.valid) {
      this.submittedNew = true;
      return;
    } else {
      this.officeService.save(this.newOffice)
        .subscribe(data => {
          this.office = data;
          this.messageService.add({severity:'success', summary: 'Mensaje', detail: 'Registro agregado', life: 3000});
          this.hideNewDialog();
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

  // NAVIGATION OPTIONS

  nextPage() {
    if (this.office.name) {
      this.requisitionStepsService.requisitionInformation.Office = this.office;
      this.router.navigate(['requisition/create/patient-step']);
    } else {
      alert("Por favor seleccione un servicio.");
      return;
    }
  }

  prevPage() {
      this.router.navigate(['requisition/create/drug-step']);
  }

  editOffice(office: Office) {

  }

  deleteOffice(office: Office) {

  }

}
