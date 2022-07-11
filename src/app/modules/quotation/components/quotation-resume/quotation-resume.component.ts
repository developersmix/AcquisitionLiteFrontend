import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RequisitionSerialized } from 'src/app/modules/requisition/models/RequisitionSerialized';
import { RequisitionService } from 'src/app/modules/requisition/services/requisition.service';
import { QuotationResume } from '../../models/QuotationResume';
import { QuotationSerialized } from '../../models/QuotationSerialized';
import { QuotationService } from '../../services/quotation.service';

@Component({
  selector: 'app-resume',
  templateUrl: './quotation-resume.component.html',
  styleUrls: ['./quotation-resume.component.scss']
})
export class QuotationResumeComponent implements OnInit {

  public number: string = "";
  public isVisible: boolean = false;

  public quotationSerializedList: QuotationSerialized[] = [];
  public quotationResume: QuotationResume = new QuotationResume();
  public quotationIds: string[] = [];
  public quotationPrices: string[] = [];

  public requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  
  private errorMessage: string = "";

  constructor( private requisitionService: RequisitionService,
    private quotationService: QuotationService) { }

  ngOnInit(): void {
  }

  searchRequisition() {
    this.findByTrakingNumber().then(() => {
      this.findAllQuotationSerializedByRequitisionId(this.requisitionSerialized.requisitionId!);
      //this.findQuotationResume(this.requisitionSerialized.requisitionId);
    });
  }

  findByTrakingNumber() {
    const promise = new Promise((resolve, reject) => {
      this.requisitionService.findByTrackingNumber(this.number)
        .toPromise()
        .then((data: any) => {
          this.requisitionSerialized = data;
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

  findAllQuotationSerializedByRequitisionId(requisition_id: number) {
    this.quotationService.findAllQuotationSerializedByRequitisionId(requisition_id)
      .subscribe(data => {
        this.quotationSerializedList = data;
        this.isVisible = true;
      }, error => {
        var e: HttpErrorResponse = error;
        if (e.status === 0) {
          this.errorMessage = "Connection to server not established.";
        } else if (e.status === 401) {
          this.errorMessage = "Unauthorized -> Bad credentials.";
        } else { alert("Status : " + e.status + " Error : " + e.message + " in " + this.constructor.name.toString()); }
      });
  }

  findQuotationResume(requisition_id: number) {
    this.quotationService.findQuotationResume(requisition_id)
      .subscribe(data => {
        this.quotationResume = data;
        this.quotationIds = data.quotationIds!.split(",");
        this.quotationPrices = data.quotationPrices!.split(",");
        this.isVisible = true;
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
