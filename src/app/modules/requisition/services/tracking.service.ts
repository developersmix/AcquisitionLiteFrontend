import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Tracking } from '../models/Tracking';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Tracking[]>(this.baseUrl+"tracking");
  }

  findById(id:number) {
    return this.http.get<Tracking>(this.baseUrl+"tracking/"+id);
  }

  save(tracking: Tracking) {
    return this.http.post<Tracking>(this.baseUrl+"tracking", tracking);
  }

  update(tracking:Tracking) {
    return this.http.put<Tracking>(this.baseUrl+"tracking", tracking);
  }
  
  deleteById(id:number) {
    return this.http.delete<Tracking>(this.baseUrl+"tracking/"+id);
  }
}
