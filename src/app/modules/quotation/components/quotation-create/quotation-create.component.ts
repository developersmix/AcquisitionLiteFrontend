import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Activity } from 'src/app/modules/requisition/models/Activity';
import { RequisitionSerialized } from 'src/app/modules/requisition/models/RequisitionSerialized';
import { RequisitionService } from 'src/app/modules/requisition/services/requisition.service';
import { Supplier } from 'src/app/modules/supplier/models/Supplier';
import { SupplierService } from 'src/app/modules/supplier/services/supplier.service';
import { Userprofile } from 'src/app/modules/user/models/Userprofile';
import { SessionService } from 'src/app/modules/user/services/session-.service';
import { Quotation } from '../../models/Quotation';
import { QuotationControlService } from '../../services/quotation-control.service';
import { QuotationService } from '../../services/quotation.service';

interface QuotationTemp {
  id ? : number;
  file ? : File;
  folio ? : string;
  price ? : number;
  activity ? : Activity;
  supplier ? : Supplier;
}

@Component({
  selector: 'app-quotation-create',
  templateUrl: './quotation-create.component.html',
  styleUrls: ['./quotation-create.component.scss']
})
export class QuotationCreateComponent implements OnInit {

  // ACTIVITY
  public activity: Activity = new Activity();
  public activityToUpdate: Activity = new Activity();
  private status: number = 2; // STATUS 2 => QUOTATION
  // QUOTATION
  public quotation: QuotationTemp = {};
  public quotationsNew: Quotation[] = [];
  public quotationsOld: QuotationTemp[] = [];
  public selectedQuotation: QuotationTemp = {};
  // REQUISITION SERIALIZED
  public requisitionSerialized: RequisitionSerialized = new RequisitionSerialized();
  // SUPPLIER 
  public supplier: Supplier = new Supplier();
  public suppliers: Supplier[] = [];
  public selectedSupplier: Supplier = new Supplier();
  public newSupplier: Supplier = new Supplier();
  // USER
  private userprofile: Userprofile = new Userprofile();

  // ADD ITEM TO TABLE
  submittedAdd: boolean = false;

  // SEARCH ITEM
  public name: string = "";
  public submittedSearch: boolean = false;
  public showTableSupplierDialog = false;

  // CREATE ITEM
  public submittedNew: boolean = false;
  public showNewSupplierDialog: boolean = false;

  @ViewChild('dt') table?: Table;

  private pipe = new DatePipe('es-MX');
  private date = Date.now();
  errorMessage: string = "";

  constructor( private router: Router,
    private sessionService: SessionService,
    private quotationService: QuotationService,
    private quotationControlService: QuotationControlService,
    private supplierService: SupplierService,
    private requisitionService: RequisitionService,
    private messageService: MessageService ) { }

  ngOnInit(): void {
    this.requisitionSerialized = this.quotationControlService.requisitionSerialized;
    this.prepareData();
  }


  // PREPARE DATA FOR TO SAVE THE QUOTATIONS
  prepareData() {
    // GET USER PROFILE
    this.userprofile = this.sessionService.getUserprofile();
    // PREPARE NEW ACTIVITY
    this.activity.date = this.pipe.transform(this.date, 'dd-MM-yyyy')!;
    this.activity.status = this.status;
    this.activity.time = this.pipe.transform(this.date, 'HH:mm')!;
    this.activity.userId = this.userprofile.userId;
    this.activity.trackingId = this.requisitionSerialized.trackingId;
  }

  // FIND SUPPLIER LIST

  findAllByLikeName() {
    if (this.supplier.name == undefined || !this.supplier.name.valueOf() || this.supplier.name.length < 4) {
      this.submittedSearch = true;
      return;
    } else {
      this.supplierService.findAllByLikeName(this.supplier.name)
        .subscribe(data => {
          this.suppliers = data;
          this.showTableSupplierDialog = true;
          this.submittedSearch = false;
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

  onRowSelect(event: any) { 
    this.supplier = this.selectedSupplier;
    this.selectedSupplier = new Supplier();
    this.showTableSupplierDialog = false;
  }

  onRowUnselect(event: any) {
    this.selectedSupplier = new Supplier();
  }

  // SAVE SUPPLIER
  
  showNewDialog() {
    this.newSupplier = new Supplier();
    this.submittedNew = false;
    this.showNewSupplierDialog = true;
  }

  saveSupplier(supplierForm: NgForm) {
    if (!supplierForm.valid) {
      this.submittedNew = true;
      return;
    } else {
      this.supplierService.save(this.newSupplier)
        .subscribe(data => {
          this.supplier = data;
          this.messageService.add({severity:'success', summary: 'Mensaje', detail: 'Registro agregado', life: 3000});
          this.hideNewDialog();
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

  hideNewDialog() {
    this.showNewSupplierDialog = false;
    this.submittedNew = false;
    this.newSupplier = new Supplier();
  }

  // ADD NEW QUOTATION TO TABLE FOR TO SAVE 

  addQuotation(quotationForm: NgForm) {
    if (!quotationForm.valid) {
      this.submittedAdd = true;
      return;
    } else {
      this.quotation.activity = this.activity;
      this.quotation.supplier = this.supplier;
      this.prepareQuotationToSave(this.quotation);
      setTimeout(() => { 
        this.quotationsOld.push(this.quotation);
        this.quotation = new Quotation;
        this.supplier = new Supplier;
        this.submittedAdd = false;
      }, 100);
      
    }
  }

  prepareQuotationToSave(quotation: QuotationTemp) {
    var quotationToSave: Quotation = new Quotation();
    quotationToSave.activity = this.activity;
    quotationToSave.file = quotation.file!;
    quotationToSave.folio = quotation.folio!;
    quotationToSave.id = quotation.id!;
    quotationToSave.price = quotation.price!;
    quotationToSave.supplierId = quotation.supplier!.id;
    this.quotationsNew.push(quotationToSave);
  }

  // SAVE ALL THE QUOTATIONS IN TABLE

  saveQuotations() {
    console.log("this.quotationsNew in save : ", this.quotationsNew);
    if ( this.quotationsNew.length > 0 ) {
      this.quotationService.saveAll(this.quotationsNew)
        .subscribe(() => {
          this.messageService.add({severity:'success', summary: 'Mensaje', detail: 'Registros agregados', life: 3000});
          var created: number = this.requisitionService.requisitionsCreated.value;
          this.requisitionService.updateRequisitionsCreated(created-1);
          this.router.navigate(['quotation/read']);
        }, error => {
          var e: HttpErrorResponse = error;
          if (e.status === 0) {
            this.errorMessage = "Connection to server not established.";
          } else if (e.status === 401) {
            this.errorMessage = "Unauthorized -> Bad credentials.";
          } else { alert("Status : " + e.status + " Error : " + e.message + " in " + this.constructor.name.toString()); }
        });
    } else { alert("Error no hay elementos en la tabla para guardar.") }
  }

  loadEditForm(quotation: Quotation) {
    console.log("Edit quotation : ", quotation);
  }

  delete(quotation: Quotation) {
    console.log("Delete quotation : ", quotation);
  }

  // REFRESH

  refresh() {
      this.router.navigate(['']);
      this.router.navigate(['quotation/create']);
  }

  editSupplier(supplier: Supplier) {

  }

  deleteSupplier(supplier: Supplier) {

  }

}
