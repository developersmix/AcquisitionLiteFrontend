import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Drug } from '../models/Drug';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Drug[]>(this.baseUrl + "drug");
  }

  findById(id: number) {
    return this.http.get<Drug>(this.baseUrl+"drug/" + id);
  }

  findByCode(code: string) {
    return this.http.get<Drug>(this.baseUrl+"drug/code/" + code);
  }

  findByName(name: string) {
    return this.http.get<Drug[]>(this.baseUrl+"drug/name/" + name);
  }

  save(drug: Drug) {
    return this.http.post<Drug>(this.baseUrl + "drug", drug);
  }

  update(drug: Drug) {
    return this.http.put<Drug>(this.baseUrl + "drug", drug);
  }
  
  deleteById(id: number) {
    return this.http.delete<Drug>(this.baseUrl + "drug/" + id);
  }

  // CUSTOM REQUEST

  findByCriteriaInColumns(criteria: string) {
    return this.http.get<Drug[]>(this.baseUrl+"drug/criteria/" + criteria);
  }
}
