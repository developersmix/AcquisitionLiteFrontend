import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Employee[]>(this.baseUrl+"employee");
  }

  findById(id: number) {
    return this.http.get<Employee>(this.baseUrl + "employee/" + id);
  }

  findByName(name: string){
    return this.http.get<Employee[]>(this.baseUrl + "employee/name/" + name);
  }

  findByNumber(number: number){
    return this.http.get<Employee>(this.baseUrl + "employee/number/" + number);
  }

  save(employee: Employee) {
    return this.http.post<Employee>(this.baseUrl + "employee", employee);
  }

  update(employee: Employee) {
    return this.http.put<Employee>(this.baseUrl + "employee", employee);
  }
  
  deleteById(id: number) {
    return this.http.delete<Employee>(this.baseUrl + "employee/" + id);
  }
}
