import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Prescription } from '../models/Prescription';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Prescription[]>(this.baseUrl+"prescription");
  }

  findById(id:number) {
    return this.http.get<Prescription>(this.baseUrl+"prescription/"+id);
  }

  save(prescription: Prescription) {
    return this.http.post<Prescription>(this.baseUrl+"prescription", prescription);
  }

  update(prescription:Prescription) {
    return this.http.put<Prescription>(this.baseUrl+"prescription", prescription);
  }
  
  deleteById(id:number) {
    return this.http.delete<Prescription>(this.baseUrl+"prescription/"+id);
  }
}
