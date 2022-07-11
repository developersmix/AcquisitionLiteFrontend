import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Authorization } from '../models/Authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Authorization[]>(this.baseUrl+"authorization");
  }

  findById(id:number) {
    return this.http.get<Authorization>(this.baseUrl+"authorization/"+id);
  }

  save(authorization: Authorization) {
    return this.http.post<Authorization>(this.baseUrl+"authorization", authorization);
  }

  update(authorization:Authorization) {
    return this.http.put<Authorization>(this.baseUrl+"authorization", authorization);
  }
  
  deleteById(id:number) {
    return this.http.delete<Authorization>(this.baseUrl+"authorization/"+id);
  }
}
