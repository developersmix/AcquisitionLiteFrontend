import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Patient[]>(this.baseUrl + "patient");
  }

  findById(id: number) {
    return this.http.get<Patient>(this.baseUrl + "patient/" + id);
  }

  findByName(name: string) {
    return this.http.get<Patient[]>(this.baseUrl + "patient/name/" + name);
  }

  findByRfc(rfc: string) {
    return this.http.get<Patient[]>(this.baseUrl + "patient/rfc/" + rfc);
  }

  save(patient: Patient) {
    return this.http.post<Patient>(this.baseUrl + "patient", patient);
  }

  update(patient: Patient) {
    return this.http.put<Patient>(this.baseUrl + "patient", patient);
  }
  
  deleteById(id: number) {
    return this.http.delete<Patient>(this.baseUrl + "patient/" + id);
  }

  // CUSTOM REQUEST

  findByCriteriaInColumns(criteria: string) {
    return this.http.get<Patient[]>(this.baseUrl+"patient/criteria/" + criteria);
  }
}
