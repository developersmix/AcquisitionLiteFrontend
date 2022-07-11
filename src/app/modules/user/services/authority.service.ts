import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Authority } from '../models/Authority';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Authority[]>(this.baseUrl+"authority");
  }

  findById(id:number) {
    return this.http.get<Authority>(this.baseUrl+"authority/"+id);
  }

  save(authority: Authority) {
    return this.http.post<Authority>(this.baseUrl+"authority", authority);
  }

  update(authority:Authority) {
    return this.http.put<Authority>(this.baseUrl+"authority", authority);
  }
  
  deleteById(id:number) {
    return this.http.delete<Authority>(this.baseUrl+"authority/"+id);
  }

}
