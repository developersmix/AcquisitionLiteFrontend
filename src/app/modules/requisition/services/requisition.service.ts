import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Requisition } from '../models/Requisition';
import { RequisitionSerialized } from '../models/RequisitionSerialized';

@Injectable({
  providedIn: 'root'
})
export class RequisitionService {

  baseUrl = environment.baseUrl;

  public requisitionsCreated = new BehaviorSubject(0);
  requisitionsCreated$ = this.requisitionsCreated.asObservable();
  
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Requisition[]>(this.baseUrl+"requisition");
  }

  findById(id:number) {
    return this.http.get<Requisition>(this.baseUrl+"requisition/"+id);
  }

  save(requisition: Requisition) {
    return this.http.post<Requisition>(this.baseUrl+"requisition", requisition);
  }

  update(requisition:Requisition) {
    return this.http.put<Requisition>(this.baseUrl+"requisition", requisition);
  }
  
  deleteById(id:number) {
    return this.http.delete<Requisition>(this.baseUrl+"requisition/"+id);
  }

  // UPDATE ACTIVITIES COUNTER
  updateRequisitionsCreated(total: number) {
    this.requisitionsCreated.next(total);
  }

  // CUSTOM HTTP REQUEST

    // CUSTOM REQUEST

  findByCriteriaInColumns(criteria: string) {
    return this.http.get<RequisitionSerialized[]>(this.baseUrl+"requisition/criteria/" + criteria);
  }

  findAllRequisitionSerialized() {
    return this.http.get<RequisitionSerialized[]>(this.baseUrl+"requisition/serialized");
  }

  findSerializedByRequisitionId(requisition_id: number) {
    return this.http.get<RequisitionSerialized>(this.baseUrl+"requisition/serialized-by-id/"+requisition_id);
  }

  findAllByActivityStatus(status: number) {
    return this.http.get<RequisitionSerialized[]>(this.baseUrl+"requisition/by-activity-status/"+status);
  }

  findAllInCreatedStatus() {
    return this.http.get<RequisitionSerialized[]>(this.baseUrl+"requisition/in-created-status");
  }

  findByTrackingNumber(number: string) {
    return this.http.get<RequisitionSerialized>(this.baseUrl+"requisition/by-tracking-number/"+number);
  }

}
