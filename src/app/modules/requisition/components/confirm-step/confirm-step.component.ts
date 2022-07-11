import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Drug } from 'src/app/modules/catalog/models/Drug';
import { RequisitionSerialized } from 'src/app/modules/requisition/models/RequisitionSerialized';
import { Office } from 'src/app/modules/office/models/Office';
import { Patient } from 'src/app/modules/patient/models/Patient';
import { Prescription } from 'src/app/modules/prescription/models/Prescription';
import { SessionService } from 'src/app/modules/user/services/session-.service';
import { Activity } from '../../models/Activity';
import { Requisition } from '../../models/Requisition';
import { Tracking } from '../../models/Tracking';
import { RequisitionStepsService } from '../../services/requisition-steps.service';
import { RequisitionService } from '../../services/requisition.service';
import { TrackingService } from '../../services/tracking.service';
import { Affiliation } from 'src/app/modules/patient/models/Affiliation';
import { Userprofile } from 'src/app/modules/user/models/Userprofile';

@Component({
  selector: 'app-confirm-step',
  templateUrl: './confirm-step.component.html',
  styleUrls: ['./confirm-step.component.scss']
})
export class ConfirmStepComponent implements OnInit {

  // ACTIVITY
  public activity: Activity = new Activity();
  private status: number = 0; // STATUS 0 => CREATED
  public requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  // Drug
  public drug: Drug = new Drug();
  // Office
  public office: Office = new Office();
  // Patient
  public affiliation: Affiliation = new Affiliation();
  public patient: Patient = new Patient();
  // Prescription
  public prescription: Prescription = new Prescription();
  // Requisition
  public requisition: Requisition = new Requisition();
  // User
  private userprofile: Userprofile = new Userprofile();
  private userId: number = 0;
  // Tracking
  tracking: Tracking = new Tracking();

  private pipe = new DatePipe('es-MX');
  private date = Date.now();

  public errorMessage = "";
    
  constructor( private router: Router,
    private trackingService: TrackingService,
    private sessionService: SessionService,
    private requisitionStepsService: RequisitionStepsService,
    private requisitionService: RequisitionService ) { }

  ngOnInit() { 
    this.loadSavedData();
    // PREPARE TRACKING
    this.tracking.number = this.requisition.consecutive! + new Date().getFullYear();
  }

  prevPage() {
    this.router.navigate(['requisition/create/patient-step']);
  }

  loadSavedData() {
    this.userprofile = this.sessionService.getUserprofile();
    var requisitionInformation = this.requisitionStepsService.requisitionInformation;
    this.affiliation = requisitionInformation.Affiliation;
    this.drug = requisitionInformation.Drug;
    this.office = requisitionInformation.Office;
    this.patient = requisitionInformation.Patient;
    this.prescription = requisitionInformation.Prescription;
    this.requisition = requisitionInformation.Requisition;
  }

  saveOnCascade() {
    this.saveTracking().then(() => {
      this.prepareData();
      setTimeout(() => { 
        this.saveRequisition();
      }, 100);
    });
  }

  saveTracking() {
    const promise = new Promise((resolve, reject) => {
      this.trackingService.save(this.tracking)
        .toPromise()
        .then((data: any) => {
          this.tracking = data;
          this.requisitionStepsService.tracking = this.tracking;
          resolve("");
        }, error => {
          reject(error);
          var e: HttpErrorResponse = error;
          if (e.status === 0) {
            this.errorMessage = "Connection to server not established.";
          } else if (e.status === 401) {
            this.errorMessage = "Unauthorized -> Bad credentials.";
          } else { alert(e.message + " in " + this.constructor.name.toString()); }
        });
    });
    return promise;
  }

  prepareData() {

    // PREPARE ACTIVITY
    this.activity.date = this.pipe.transform(this.date, 'dd-MM-yyyy')!;
    this.activity.status = this.status;
    this.activity.time = this.pipe.transform(this.date, 'HH:mm')!;
    this.activity.userId = this.userprofile.userId;
    this.activity.trackingId = this.tracking.id;

    // PREPARE PRESCRIPTION
    this.prescription.drugId = this.drug.id;
    this.prescription.officeId = this.office.id;
    this.prescription.patientId = this.patient.id;

    // PREPARE REQUISITION
    this.requisition.activity = this.activity;
    this.requisition.prescription = this.prescription;

    // PREPARE NOTIFICATION SERIALIZED
    this.requisitionSerialized.date = this.activity.date;
    this.requisitionSerialized.status = this.activity.status;
    this.requisitionSerialized.time = this.activity.time;
    this.requisitionSerialized.code = this.patient.affiliation!.code!;
    this.requisitionSerialized.description = this.drug.description!;
    this.requisitionSerialized.employeeName = this.userprofile.employeeName;
    this.requisitionSerialized.patientName = this.patient.name!;
    this.requisitionSerialized.phone = this.patient.phone!;
    this.requisitionSerialized.rfc = this.patient.rfc!;
    this.requisitionSerialized.prescriptionOffice = this.office.name!;
    this.requisitionSerialized.quantity = this.prescription.quantity!;
    this.requisitionSerialized.serie = this.prescription.serie!;
    this.requisitionSerialized.requisitionId = this.requisition.id;
    this.requisitionSerialized.consecutive = this.requisition.consecutive;
    this.requisitionSerialized.trackingNumber = this.tracking.number;
    this.requisitionSerialized.userOffice = this.userprofile.officeName;
  }

  saveRequisition() {
    this.requisitionService.save(this.requisition)
      .subscribe(data => {
        /*
        this.requisition = data;
        this.requisitionStepsService.requisition = data;
        this.requisitionStepsService.requisitionSerializedList.push(this.requisitionSerialized);
        */
       this.requisitionStepsService.requisition =  new Requisition();
        this.requisitionStepsService.complete();
        this.router.navigate(["/requisition/read"]);
      }, error => {
        var e: HttpErrorResponse = error;
        if (e.status === 0) {
          this.errorMessage = "Connection to server not established.";
        } else if (e.status === 401) {
          this.errorMessage = "Unauthorized -> Bad credentials.";
        } else { alert(e.message + " in " + this.constructor.name.toString()); }
      });
  }
  
}
