import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RequisitionStepsService } from 'src/app/modules/requisition/services/requisition-steps.service';
import { Affiliation } from '../../models/Affiliation';
import { Patient } from '../../models/Patient';
import { AffiliationService } from '../../services/affiliation.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-step',
  templateUrl: './patient-step.component.html',
  styleUrls: ['./patient-step.component.scss']
})
export class PatientStepComponent implements OnInit {

  public patient: Patient = new Patient();
  public selectedPatient: Patient = new Patient();
  public newPatient: Patient = new Patient();
  public patients: Patient[] = [];
  public affiliation: Affiliation = new Affiliation();
  public affiliations: Affiliation[] = [];

  // SEARCH ITEM
  public criteria: string = "";
  public submittedSearch: boolean = false;
  public showTablePatientDialog = false;

  // CREATE ITEM
  public submittedNew: boolean = false;
  public showNewPatientDialog: boolean = false;
  
  public errorMessage = "";

  public isAdmin: boolean = false;

  constructor( private router: Router,
    private patientService: PatientService,
    private affiliationService: AffiliationService,
    private requisitionStepsService: RequisitionStepsService,
    private messageService: MessageService ) { }

  ngOnInit(): void {
    this.patient = this.requisitionStepsService.requisitionInformation.Patient;
    this.affiliation = this.requisitionStepsService.requisitionInformation.Affiliation;
  }

  // SEARCH AND CHOOSE ONE ITEM

  findByCriteriaInColumns() {
    if (this.criteria == undefined || !this.criteria.valueOf() || this.criteria.length < 4) {
      this.submittedSearch = true;
      return;
    } else {
      this.patientService.findByCriteriaInColumns(this.criteria)
        .subscribe(data => {
          this.patients = data;
          this.showTablePatientDialog = true;
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
    this.showTablePatientDialog = false;
    this.patient = this.selectedPatient;
    this.requisitionStepsService.requisitionInformation.Patient = this.selectedPatient;
    this.affiliation = this.patient.affiliation!;
    this.requisitionStepsService.requisitionInformation.Affiliation = this.affiliation;
    this.selectedPatient = new Patient();
    this.patients = [];
  }

  onRowUnselect(event: any) {
    this.patient = new Patient;
    this.requisitionStepsService.requisitionInformation.Patient = this.patient;
  }

  hideTablePatientDialog() {
    this.showTablePatientDialog = false;
  }

  // SAVE ONE ITEM
  
  showNewDialog() {
    this.findAllAffiliations();
    this.newPatient = new Patient();
    this.submittedNew = false;
    this.showNewPatientDialog = true;
  }

  hideNewDialog() {
    this.showNewPatientDialog = false;
    this.submittedNew = false;
    this.newPatient = new Patient();
  }

  findAllAffiliations() {
    this.affiliationService.findAll()
      .subscribe(data => {
        this.affiliations = data;
        }, error => {
          var e: HttpErrorResponse = error;
          if (e.status === 0) {
            this.errorMessage = "Connection to server not established.";
          } else if (e.status === 401) {
            this.errorMessage = "Unauthorized -> Bad credentials.";
          } else { alert("Status : " + e.status + " Error : " + e.message + " in " + this.constructor.name.toString()); }
      });
  }

  savePatient(patientForm: NgForm) {
    if (!patientForm.valid) {
      this.submittedNew = true;
      return;
    } else {
      this.patientService.save(this.newPatient)
        .subscribe(data => {
          this.patient = data;
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

  // NAVEGATION BUTTONS

  nextPage() {
    if (this.patient.name && this.patient.rfc) {
      this.requisitionStepsService.requisitionInformation.Patient = this.patient;
      this.router.navigate(['requisition/create/confirm-step']);
    } else {
      alert("Por favor seleccione un paciente.");
      return;
    }
  }

  prevPage() {
      this.router.navigate(['requisition/create/office-step']);
  }

  editPatient(patient: Patient) {

  }

  deletePatient(patient: Patient) {

  }

}
