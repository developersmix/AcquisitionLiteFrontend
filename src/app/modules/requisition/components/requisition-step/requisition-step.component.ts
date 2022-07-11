import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prescription } from 'src/app/modules/prescription/models/Prescription';
import { Requisition } from '../../models/Requisition';
import { RequisitionStepsService } from '../../services/requisition-steps.service';

@Component({
  selector: 'app-requisition-step',
  templateUrl: './requisition-step.component.html',
  styleUrls: ['./requisition-step.component.scss']
})
export class RequisitionStepComponent implements OnInit {

  public prescription: Prescription = new Prescription();
  public requisition: Requisition = new Requisition();
  submitted: boolean = true;

  constructor( private router: Router,
    private requisitionStepsService: RequisitionStepsService) { }

  ngOnInit(): void {
    localStorage.clear();
    this.requisition = this.requisitionStepsService.getRequistionInformation().Requisition;
    this.prescription = this.requisitionStepsService.getRequistionInformation().Prescription;
  }

  nextPage() {
    if (this.requisition.consecutive && this.prescription.serie) {
        this.requisitionStepsService.requisitionInformation.Requisition = this.requisition;
        this.requisitionStepsService.requisitionInformation.Prescription = this.prescription;
        this.router.navigate(["requisition/create/drug-step"]);
        return;
    } else {
      this.submitted = false;
      alert("Por favor complete los campos obligatorios.")
    }
  }

}
