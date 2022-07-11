import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Office } from '../models/Office';


@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  
  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(): Observable<HttpResponse<any>>{
    let headers = new HttpHeaders();
    const h = headers.get('OfficeController');
    return this.http.get<Office[]>(this.baseUrl+"office",
        {observe: 'response'});
  }

  findById(id:number) {
    return this.http.get<Office>(this.baseUrl+"office/"+id);
  }

  save(office: Office) {
    return this.http.post<Office>(this.baseUrl+"office", office);
  }

  update(office:Office) {
    return this.http.put<Office>(this.baseUrl+"office", office);
  }
  
  deleteById(id:number) {
    return this.http.delete<Office>(this.baseUrl+"office/"+id);
  }

    // CUSTOM REQUEST

    findByCriteriaInColumns(criteria: string) {
      return this.http.get<Office[]>(this.baseUrl+"office/criteria/" + criteria);
    }
}
