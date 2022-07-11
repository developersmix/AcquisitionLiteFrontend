import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtResponse } from '../models/JwtResponse';
import { Login } from '../models/Login';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  attemptLogin(credentials: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.baseUrl+'user/login', credentials, httpOptions);
  }
}
