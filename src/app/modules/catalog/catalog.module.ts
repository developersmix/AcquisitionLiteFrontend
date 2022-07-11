import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogComponent } from './catalog.component';
import { DrugComponent } from './components/drug/drug.component';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DrugService } from './services/drug.service';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RequisitionRoutingModule } from '../requisition/requisition-routing.module';
import { DrugStepComponent } from './components/drug-step/drug-step.component';

@NgModule({
  declarations: [
    CatalogComponent, DrugComponent, DrugStepComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    CatalogRoutingModule,
    FormsModule,
    RequisitionRoutingModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    InputNumberModule,
    CalendarModule
  ],
  providers: [DrugService]
})
export class CatalogModule { }
