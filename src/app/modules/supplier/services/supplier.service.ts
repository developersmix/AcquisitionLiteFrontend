import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Supplier } from '../models/Supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Supplier[]>(this.baseUrl+"supplier");
  }

  findById(id:number) {
    return this.http.get<Supplier>(this.baseUrl+"supplier/"+id);
  }

  save(supplier: Supplier) {
    return this.http.post<Supplier>(this.baseUrl+"supplier", supplier);
  }

  update(supplier:Supplier) {
    return this.http.put<Supplier>(this.baseUrl+"supplier", supplier);
  }
  
  deleteById(id:number) {
    return this.http.delete<Supplier>(this.baseUrl+"supplier/"+id);
  }

  // CUSTOM REQUEST

  findAllByLikeName(name: string) {
    return this.http.get<Supplier[]>(this.baseUrl+"supplier/by-name/"+name);
  }
}
