import { Component, OnInit } from '@angular/core';

import { Prescription } from 'src/app/modules/prescription/models/Prescription';
import { Drug } from 'src/app/modules/catalog/models/Drug';
import { Affiliation } from 'src/app/modules/patient/models/Affiliation';
import { Patient } from 'src/app/modules/patient/models/Patient';
import { Activity } from 'src/app/modules/requisition/models/Activity';
import { Requisition } from 'src/app/modules/requisition/models/Requisition';
import { Office } from 'src/app/modules/office/models/Office';
import { RequisitionStepsService } from '../../services/requisition-steps.service';

import {MenuItem} from 'primeng/api';
import { Subscription } from 'rxjs';
import { SocketClientService } from 'src/app/modules/notification/services/socket-client.service';

@Component({
  selector: 'app-requisition-create',
  templateUrl: './requisition-create.component.html',
  styleUrls: ['./requisition-create.component.scss']
})
export class RequisitionCreateComponent implements OnInit {

  // PRESCRIPTION
  public prescription: Prescription = new Prescription();
  // REQUISITION
  public activity: Activity = new Activity();
  public requisition: Requisition = new Requisition();
  // DRUG
  public drug: Drug = new Drug();
  public drugs: Drug[] = [];
  // PATIENT
  public affiliation: Affiliation = new Affiliation();
  public patient: Patient = new Patient();
  public patients: Patient[] = []; 
  // OFFICE
  public office: Office = new Office();

  public isValidFormSubmitted = false;
  public errorMessage = "";

  /*
  tempDialog: boolean;
  patientDialog: boolean;
  submittedPatient: boolean;
  drugDialog: boolean;
  submittedDrug: boolean;
  employeeDialog: boolean;
  submittedEmployee: boolean;

  @ViewChild('drugComponent', {static: true, read: ViewContainerRef})
  drugViewContainerRef: ViewContainerRef;

  @ViewChild(DrugComponent)
  drugComponent: DrugComponent;
  */

  stepItems: MenuItem[] = [];
  subscription?: Subscription;
  requisitionInformation: any;
  prescriptionInformation: any;
  submitted: boolean = false;

  constructor( private requisitionStepsService: RequisitionStepsService,
    private socketClientService: SocketClientService ) { }

  ngOnInit(): void {

    this.stepItems = [
      {
        label: 'Requisición',
        routerLink: 'requisition/create/requisition-step'
      },
      {
        label: 'Medicamento',
        routerLink: 'requisition/create/drug-step'
      },
      {
        label: 'Servicio',
        routerLink: 'requisition/create/office-step'
      },
      {
        label: 'Paciente',
        routerLink: 'requisition/create/patient-step'
      },
      {
        label: 'Confirmar',
        routerLink: 'requisition/create/confirm-step'
      }
    ];

    this.subscription = this.requisitionStepsService.requisitionComplete$.subscribe((data) =>{
      var message = 'Requisición: ' + data.Requisition.consecutive
          + '\n Receta:' + data.Prescription.serie
          + '\n Paciente:' + data.Patient.name
          + '\n' + ' completada.'
      this.socketClientService.sendMessage(message);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
