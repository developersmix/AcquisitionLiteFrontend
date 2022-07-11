import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Drug } from '../../catalog/models/Drug';
import { Employee } from '../../employee/models/Employee';
import { Office } from '../../office/models/Office';
import { Affiliation } from '../../patient/models/Affiliation';
import { Patient } from '../../patient/models/Patient';
import { Prescription } from '../../prescription/models/Prescription';
import { Activity } from '../models/Activity';
import { RequisitionSerialized } from '../models/RequisitionSerialized';
import { NotificationForRequisition } from '../models/NotificationForRequisition';
import { Requisition } from '../models/Requisition';
import { Tracking } from '../models/Tracking';

@Injectable({
  providedIn: 'root'
})
export class RequisitionStepsService {
  
  activity: Activity = new Activity();
  affiliation: Affiliation = new Affiliation();
  drug: Drug = new Drug();
  employee: Employee = new Employee();
  office: Office = new Office();
  patient: Patient = new Patient();
  prescription: Prescription = new Prescription();
  requisition: Requisition = new Requisition();
  tracking: Tracking = new Tracking();
  
  drugs: Drug[] = [];
  offices: Office[] = [];
  patients: Patient[] = [];
  requisitions: Requisition[] = [];
  notifications: NotificationForRequisition[] = [];
  requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  requisitionSerializedList: RequisitionSerialized[] = [];

  requisitionInformation =
  {
    Affiliation: this.affiliation,
    Activity: this.activity,
    Drug: this.drug,
    Employee: this.employee,
    Office: this.office,
    Patient: this.patient,
    Prescription: this.prescription,
    Requisition: this.requisition
  };
    
  private requisitionComplete = new Subject<any>();
  requisitionComplete$ = this.requisitionComplete.asObservable();

  getRequistionInformation() {
      return this.requisitionInformation;
  }

  setRequisitionInformation(requisitionInformation: { Affiliation: Affiliation; Activity: Activity; Drug: Drug; Employee: Employee; Office: Office; Patient: Patient; Prescription: Prescription; Requisition: Requisition; }) {
      this.requisitionInformation = requisitionInformation;
  }

  complete() {
    this.requisitionComplete.next(this.requisitionInformation);
    this.requisitions.push(this.requisitionInformation.Requisition);
  }

}
