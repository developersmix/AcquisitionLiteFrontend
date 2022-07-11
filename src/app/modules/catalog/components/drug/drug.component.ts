import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RequisitionStepsService } from 'src/app/modules/requisition/services/requisition-steps.service';
import { Drug } from '../../models/Drug';

@Component({
  selector: 'app-drug',
  templateUrl: './drug.component.html',
  styleUrls: ['./drug.component.scss']
})
export class DrugComponent implements OnInit {

  public drug: Drug = new Drug();
  public drugs: Drug[] = [];
  submitted: boolean = false;
  submittedDrug: boolean = false;
  tempDialog: boolean = false;
  
  constructor( private router: Router,
    private messageService: MessageService,
    private requisitionStepsService: RequisitionStepsService) { }

  ngOnInit(): void {
    this.drug = this.requisitionStepsService.getRequistionInformation().Drug;
  }

  nextPage() {
    if (this.drug.code && this.drug.name && this.drug.measure && this.drug.unit) {
        this.requisitionStepsService.requisitionInformation.Drug = this.drug;
        this.router.navigate(['requisition/create/requisition-recieve']);
    }
}

prevPage() {
    this.router.navigate(['requisition/create/requisition-drug']);
}

  prepareData(drugForm: NgForm) {
    if (!drugForm.valid) {
      return;
    } else {
      this.submittedDrug = true;
      this.saveDrug();
    }
  }
  saveDrug() {
    console.log("drug in DrugComponent : ", this.drug);
    this.messageService.add({severity:'success', summary: 'Mensaje', detail: 'Registro agregado', life: 3000});
    this.hideDrugDialog();
    /*
    this.drugService.save(this.drug)
      .subscribe(data => {
        alert("Registro agregado.");
      }, error => {
        var e: HttpErrorResponse = error;
        if (e.status === 0) {
          this.errorMessage = "Connection to server not established.";
        } else if (e.status === 401) {
          this.errorMessage = "Unauthorized -> Bad credentials.";
        } else { console.log(e + " in + " + this.constructor.name.toString()); }
      });
      */
  }

  hideDrugDialog() {
    this.tempDialog = false;
    this.submittedDrug = false;
  }


}
