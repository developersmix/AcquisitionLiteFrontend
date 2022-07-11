import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OfficeRoutingModule } from './office-routing.module';
import { OfficeService } from './services/office.service';
import { OfficeComponent } from './office.component';
import { OfficeStepComponent } from './office-step/office-step.component';

import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [OfficeComponent, OfficeStepComponent],
  imports: [
    CommonModule,
    OfficeRoutingModule,
    FormsModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    TableModule
  ],
  providers: [OfficeService]
})
export class OfficeModule { }
