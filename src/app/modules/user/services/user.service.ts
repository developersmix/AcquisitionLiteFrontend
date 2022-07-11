import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<User[]>(this.baseUrl+"user");
  }

  findById(id:number) {
    return this.http.get<User>(this.baseUrl+"user/"+id);
  }

  save(user: User) {
    return this.http.post<User>(this.baseUrl+"user", user);
  }

  update(user:User) {
    return this.http.put<User>(this.baseUrl+"user", user);
  }
  
  delete(id:number) {
    return this.http.delete<User>(this.baseUrl+"user/"+id);
  }
}
