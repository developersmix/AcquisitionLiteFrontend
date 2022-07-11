import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../models/Activity';
import { ActivitySerialized } from '../models/ActivitySerialized';
import { RequisitionSerialized } from '../models/RequisitionSerialized';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  baseUrl = environment.baseUrl;
  
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Activity[]>(this.baseUrl+"activity");
  }

  findById(id:number) {
    return this.http.get<Activity>(this.baseUrl+"activity/"+id);
  }

  save(activity: Activity) {
    return this.http.post<Activity>(this.baseUrl+"activity", activity);
  }

  update(activity: Activity) {
    return this.http.put<Activity>(this.baseUrl+"activity", activity);
  }
  
  deleteById(id: number) {
    return this.http.delete<Activity>(this.baseUrl+"activity/"+id);
  }

  findAllByTrackingId(tracking_id: number){
    return this.http.get<ActivitySerialized[]>(this.baseUrl+"activity/by-tracking-id/"+tracking_id);
  }
}
