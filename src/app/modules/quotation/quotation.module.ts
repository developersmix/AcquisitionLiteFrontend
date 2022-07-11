import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
registerLocaleData(localeES, "es");

import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';
import { QuotationCreateComponent } from './components/quotation-create/quotation-create.component';
import { QuotationReadComponent } from './components/quotation-read/quotation-read.component';
import { QuotationService } from './services/quotation.service';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { QuotationToProcessComponent } from './components/quotation-to-process/quotation-to-process.component';
import { QuotationResumeComponent } from './components/quotation-resume/quotation-resume.component'


@NgModule({
  declarations: [QuotationComponent, QuotationCreateComponent, QuotationReadComponent, QuotationToProcessComponent, QuotationResumeComponent],
  imports: [
    CommonModule,
    FormsModule,
    QuotationRoutingModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule
  ],
  providers: [QuotationService]
})
export class QuotationModule { }
