import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Quotation } from '../models/Quotation';
import { QuotationResume } from '../models/QuotationResume';
import { QuotationSerialized } from '../models/QuotationSerialized';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Quotation[]>(this.baseUrl+"quotation");
  }

  findById(id:number) {
    return this.http.get<Quotation>(this.baseUrl+"quotation/"+id);
  }

  save(quotation: Quotation) {
    return this.http.post<Quotation>(this.baseUrl+"quotation", quotation);
  }

  saveAll(quotationList: Quotation[]) {
    return this.http.post<Quotation[]>(this.baseUrl+"quotation/list", quotationList);
  }

  update(quotation:Quotation) {
    return this.http.put<Quotation>(this.baseUrl+"quotation", quotation);
  }
  
  deleteById(id:number) {
    return this.http.delete<Quotation>(this.baseUrl+"quotation/"+id);
  }

  findAllQuotationSerialized(){
    return this.http.get<QuotationSerialized[]>(this.baseUrl+"quotation/serialized");
  }

  findAllQuotationSerializedByRequitisionId(requisition_id: number){
    return this.http.get<QuotationSerialized[]>(this.baseUrl+"quotation/by-requisition-id/"+requisition_id);
  }

  findQuotationSerializedByTrackingNumber(tracking_id: string){
    return this.http.get<QuotationSerialized>(this.baseUrl+"quotation/by-tracking-id/"+tracking_id);
  }

  findQuotationResume(requisition_id: number) {
    return this.http.get<QuotationResume>(this.baseUrl+"quotation/resume/"+requisition_id);
  }

}
