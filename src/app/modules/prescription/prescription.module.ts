import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrescriptionRoutingModule } from './prescription-routing.module';
import { PrescriptionService } from './services/prescription.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrescriptionRoutingModule
  ],
  providers: [PrescriptionService]
})
export class PrescriptionModule { }
