import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Activity } from '../../models/Activity';
import { ActivitySerialized } from '../../models/ActivitySerialized';
import { RequisitionSerialized } from '../../models/RequisitionSerialized';
import { ActivityService } from '../../services/activity.service';
import { RequisitionService } from '../../services/requisition.service';

@Component({
  selector: 'app-requisition-tracking',
  templateUrl: './requisition-tracking.component.html',
  styleUrls: ['./requisition-tracking.component.scss']
})
export class RequisitionTrackingComponent implements OnInit {

  public number: string = "";
  public isVisible: boolean = false;

  public requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  public activitySerializedList: ActivitySerialized[] = [];

  private errorMessage: string = "";

  constructor( private activityService: ActivityService,
    private requisitionService: RequisitionService) { }

  ngOnInit(): void {
  }

  searchRequisition() {
    this.findByTrakingNumber().then(() => {
      this.findAllActivities();
    });
  }

  findByTrakingNumber() {
    const promise = new Promise((resolve, reject) => {
      this.requisitionService.findByTrackingNumber(this.number)
        .toPromise()
        .then((data: any) => {
          this.requisitionSerialized = data;
          this.isVisible = true;
          resolve("");
        }, error => {
          reject(error);
          var e: HttpErrorResponse = error;
          if (e.status === 0) {
            this.errorMessage = "Connection to server not established.";
          } else if (e.status === 401) {
            this.errorMessage = "Unauthorized -> Bad credentials.";
          } else { alert("Status : " + e.status + " Error : " + e.message + " in " + this.constructor.name.toString()); }
        });
    });
    return promise;
  }

  findAllActivities() {
    this.activityService.findAllByTrackingId(this.requisitionSerialized.trackingId!)
      .subscribe(data => {
        this.activitySerializedList = data;
      }, error => {
        var e: HttpErrorResponse = error;
        if (e.status === 0) {
          this.errorMessage = "Connection to server not established.";
        } else if (e.status === 401) {
          this.errorMessage = "Unauthorized -> Bad credentials.";
        } else { alert("Status : " + e.status + " Error : " + e.message + " in " + this.constructor.name.toString()); }
      });
  }

}
