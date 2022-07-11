import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PatientRoutingModule } from './patient-routing.module';
import { AffiliationService } from './services/affiliation.service';
import { PatientService } from './services/patient.service';
import { PatientStepComponent } from './components/patient-step/patient-step.component';
import { PatientComponent } from './patient.component';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [PatientComponent, PatientStepComponent],
  imports: [
    CommonModule,
    FormsModule,
    PatientRoutingModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    TableModule
  ],
  providers: [AffiliationService, PatientService]
})
export class PatientModule { }
