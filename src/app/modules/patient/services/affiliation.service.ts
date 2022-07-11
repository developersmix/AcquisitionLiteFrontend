import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Affiliation } from '../models/Affiliation';

@Injectable({
  providedIn: 'root'
})
export class AffiliationService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Affiliation[]>(this.baseUrl+"affiliation");
  }

  findById(id:number) {
    return this.http.get<Affiliation>(this.baseUrl+"affiliation/"+id);
  }

  save(affiliation: Affiliation) {
    return this.http.post<Affiliation>(this.baseUrl+"affiliation", affiliation);
  }

  update(affiliation:Affiliation) {
    return this.http.put<Affiliation>(this.baseUrl+"affiliation", affiliation);
  }
  
  deleteById(id:number) {
    return this.http.delete<Affiliation>(this.baseUrl+"affiliation/"+id);
  }
}
