import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Prescription } from 'src/app/modules/prescription/models/Prescription';
import { RequisitionStepsService } from 'src/app/modules/requisition/services/requisition-steps.service';
import { Drug } from '../../models/Drug';
import { DrugService } from '../../services/drug.service';

@Component({
  selector: 'app-drug-step',
  templateUrl: './drug-step.component.html',
  styleUrls: ['./drug-step.component.scss']
})
export class DrugStepComponent implements OnInit {

  public drug: Drug = new Drug();
  public selectedDrug: Drug = new Drug();
  public newDrug: Drug = new Drug();
  public drugs: Drug[] = [];
  public prescription: Prescription = new Prescription();

  // SEARCH ITEM
  public criteria: string = "";
  public submittedSearch: boolean = false;
  public showTableDrugDialog = false;

  // CREATE ITEM
  public submittedNew: boolean = false;
  public showNewDrugDialog: boolean = false;

  // ADD QUANTITY AND UNIT
  public submittedQuantity: boolean = false;

  public errorMessage = "";

  public isAdmin: boolean = false;

  constructor( private router: Router,
    private drugService: DrugService,
    private requisitionStepsService: RequisitionStepsService,
    private messageService: MessageService ) { }

  ngOnInit(): void {
    this.prescription = this.requisitionStepsService.requisitionInformation.Prescription;
    this.drug = this.requisitionStepsService.requisitionInformation.Drug;
  }

  // SEARCH AND CHOOSE ONE ITEM

  findByCriteriaInColumns() {
    if (this.criteria == undefined || !this.criteria.valueOf() || this.criteria.length < 4) {
      this.submittedSearch = true;
      return;
    } else {
      this.drugService.findByCriteriaInColumns(this.criteria)
        .subscribe(data => {
          this.drugs = data;
          this.showTableDrugDialog = true;
          }, error => {
            var e: HttpErrorResponse = error;
            if (e.status === 0) {
              this.errorMessage = "Connection to server not established.";
            } else if (e.status === 401) {
              this.errorMessage = "Unauthorized -> Bad credentials.";
            } else { alert(e + " in " + this.constructor.name.toString()); }
        });
      }
  }

  onRowSelect(event: any) { 
    this.showTableDrugDialog = false;
    this.drug = this.selectedDrug;
    this.requisitionStepsService.requisitionInformation.Drug = this.selectedDrug;
    this.selectedDrug = new Drug();
    this.drugs = [];
  }

  onRowUnselect(event: any) {
    this.drug = new Drug;
    this.requisitionStepsService.requisitionInformation.Drug = this.drug;
  }

  hideTableDrugDialog() {
    this.showTableDrugDialog = false;
  }

  // SAVE ONE ITEM

  showNewDialog() {
    this.newDrug = new Drug();
    this.submittedNew = false;
    this.showNewDrugDialog = true;
  }

  hideNewDialog() {
    this.showNewDrugDialog = false;
    this.submittedNew = false;
    this.newDrug = new Drug();
  }

  saveDrug(drugForm: NgForm) {
    if (!drugForm.valid) {
      this.submittedNew = true;
      return;
    } else {
      this.drugService.save(this.newDrug)
        .subscribe(data => {
          this.drug = data;
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

  nextPage(quantityForm: NgForm) {
    if (quantityForm.valid && this.drug.code && this.drug.description) {
      this.requisitionStepsService.requisitionInformation.Drug = this.drug;
      this.requisitionStepsService.requisitionInformation.Prescription = this.prescription;
      this.router.navigate(['requisition/create/office-step']); 
    } else {
      this.submittedQuantity = true;
      return;
    }
  }

  prevPage() {
      this.router.navigate(['requisition/create/requisition-step']);
  }

  editDrug(drug: Drug) {

  }

  deleteDrug(drug: Drug) {

  }

}
