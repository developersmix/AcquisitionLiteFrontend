import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierService } from './services/supplier.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SupplierRoutingModule
  ],
  providers: [SupplierService]
})
export class SupplierModule { }
