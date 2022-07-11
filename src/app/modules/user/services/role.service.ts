import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Role } from '../models/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Role[]>(this.baseUrl+"role");
  }

  findById(id:number) {
    return this.http.get<Role>(this.baseUrl+"role/"+id);
  }

  save(role: Role) {
    return this.http.post<Role>(this.baseUrl+"role", role);
  }

  update(role:Role) {
    return this.http.put<Role>(this.baseUrl+"role", role);
  }
  
  deleteById(id:number) {
    return this.http.delete<Role>(this.baseUrl+"role/"+id);
  }

}
