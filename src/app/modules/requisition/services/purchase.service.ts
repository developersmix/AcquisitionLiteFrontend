import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Purchase } from '../models/Purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Purchase[]>(this.baseUrl+"purchase");
  }

  findById(id:number) {
    return this.http.get<Purchase>(this.baseUrl+"purchase/"+id);
  }

  save(purchase: Purchase) {
    return this.http.post<Purchase>(this.baseUrl+"purchase", purchase);
  }

  update(purchase:Purchase) {
    return this.http.put<Purchase>(this.baseUrl+"purchase", purchase);
  }
  
  deleteById(id:number) {
    return this.http.delete<Purchase>(this.baseUrl+"purchase/"+id);
  }
}
