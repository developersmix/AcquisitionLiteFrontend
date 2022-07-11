import { Injectable } from '@angular/core';
import { RequisitionSerialized } from '../../requisition/models/RequisitionSerialized';
import { QuotationSerialized } from '../models/QuotationSerialized';

@Injectable({
  providedIn: 'root'
})
export class QuotationControlService {

  public requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  public requisitionSerializedList: RequisitionSerialized[] = [];

  public quotationSerialized: QuotationSerialized = new QuotationSerialized();
  public quotationSerializedList: QuotationSerialized[] = [];
  constructor() { }
}
