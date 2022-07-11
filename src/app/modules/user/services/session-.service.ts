import { Injectable } from '@angular/core';
import { Userprofile } from '../models/Userprofile';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private token: string = "";
  private Userprofile?: Userprofile;
  private authorities: Array<string> = [];
  private employeeName: string = "";

  constructor() { }

  public setToken(token: string) {
    this.token = token;
  }
 
  public getToken(): string {
    return this.token;
  }
 
  public setUserprofile(Userprofile: Userprofile) {
    this.Userprofile = Userprofile;
  }
 
  public getUserprofile(): Userprofile {
    return this.Userprofile!;
  }

  public setAuthorities(authorities: string[]) {
    authorities.forEach((authority: any) => {
      this.authorities.push(authority['authority']);
    });
  }
 
  public getAuthorities(): string[] {
    return this.authorities;
  }

  public setEmployeeName(employeeName: string) {
    this.employeeName = employeeName;
  }
 
  public getEmployeeName(): string {
    return this.employeeName;
  }

  public clear() {
    this.token = "";
    this.Userprofile = new Userprofile();
    this.authorities = [];
    this. employeeName = "";
  }

}
