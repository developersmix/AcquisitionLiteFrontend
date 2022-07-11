import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
registerLocaleData(localeES, "es");

import { RequisitionRoutingModule } from './requisition-routing.module';
import { RequisitionComponent } from './requisition.component';
import { ConfirmStepComponent } from './components/confirm-step/confirm-step.component';
import { RequisitionCreateComponent } from './components/requisition-create/requisition-create.component';
import { RequisitionReadComponent } from './components/requisition-read/requisition-read.component';
import { RequisitionUpdateComponent } from './components/requisition-update/requisition-update.component';
import { RequisitionDashboardComponent } from './components/requisition-dashboard/requisition-dashboard.component';
import { RequisitionRecieveComponent } from './components/requisition-recieve/requisition-recieve.component';
import { RequisitionSendComponent } from './components/requisition-send/requisition-send.component';
import { RequisitionStepComponent } from './components/requisition-step/requisition-step.component';
import { RequisitionTrackingComponent } from './components/requisition-tracking/requisition-tracking.component';

import { ActivityService } from './services/activity.service';
import { AuthorizationService } from './services/authorization.service';
import { PurchaseService } from './services/purchase.service';
import { RequisitionService } from './services/requisition.service';
import { TrackingService } from './services/tracking.service';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { CardModule } from 'primeng/card';
import { StepsModule } from 'primeng/steps';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    ConfirmStepComponent,
    RequisitionComponent,
    RequisitionCreateComponent,
    RequisitionReadComponent,
    RequisitionUpdateComponent,
    RequisitionDashboardComponent,
    RequisitionRecieveComponent,
    RequisitionSendComponent,
    RequisitionStepComponent,
    RequisitionTrackingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RequisitionRoutingModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    CardModule,
    CalendarModule,
    StepsModule
  ],
  providers: [
    ActivityService,
    AuthorizationService,
    PurchaseService,
    RequisitionService,
    TrackingService
  ]
})
export class RequisitionModule { }
