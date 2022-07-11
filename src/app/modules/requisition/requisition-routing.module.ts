import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequisitionComponent } from './requisition.component';
import { RequisitionCreateComponent } from './components/requisition-create/requisition-create.component';
import { RequisitionDashboardComponent } from './components/requisition-dashboard/requisition-dashboard.component';
import { RequisitionReadComponent } from './components/requisition-read/requisition-read.component';
import { RequisitionRecieveComponent } from './components/requisition-recieve/requisition-recieve.component';
import { RequisitionSendComponent } from './components/requisition-send/requisition-send.component';
import { RequisitionStepComponent } from './components/requisition-step/requisition-step.component';
import { RequisitionTrackingComponent } from './components/requisition-tracking/requisition-tracking.component';
import { RequisitionUpdateComponent } from './components/requisition-update/requisition-update.component';

import { ConfirmStepComponent } from './components/confirm-step/confirm-step.component';
import { DrugStepComponent } from '../catalog/components/drug-step/drug-step.component';
import { EmployeeStepComponent } from '../employee/components/employee-step/employee-step.component';
import { PatientStepComponent } from '../patient/components/patient-step/patient-step.component';
import { OfficeStepComponent } from '../office/office-step/office-step.component';

const routes: Routes = [
  { path: '',
    component: RequisitionComponent,
    children:
    [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: RequisitionDashboardComponent,
        data: { breadcrumb: 'Administrar'}
      },
      {
        path: 'receive',
        component: RequisitionRecieveComponent,
        data: { breadcrumb: 'Recibir'}
      },
      {
        path: 'send',
        component: RequisitionSendComponent,
        data: { breadcrumb: 'Enviar'}
      },
      {
        path: 'tracking',
        component: RequisitionTrackingComponent,
        data: { breadcrumb: 'Rastrear'}
      },
      {
        path: 'create',
        component: RequisitionCreateComponent,
        data: { breadcrumb: 'Crear'},
        children: [
          {
            path: '', redirectTo: 'requisition-step', pathMatch: 'full'
          },
          {
            path: 'requisition-step',
            component: RequisitionStepComponent,
            data: { breadcrumb: 'Requisición'}
          },
          {
            path: 'drug-step',
            component: DrugStepComponent,
            data: { breadcrumb: 'Medicamento'}
          },
          {
            path: 'office-step',
            component: OfficeStepComponent,
            data: { breadcrumb: 'Servicio'}
          },
          {
            path: 'patient-step',
            component: PatientStepComponent,
            data: { breadcrumb: 'Paciente'}
          },
          {
            path: 'employee-step',
            component: EmployeeStepComponent,
            data: { breadcrumb: 'Employee'}
          },
          {
            path: 'confirm-step',
            component: ConfirmStepComponent,
            data: { breadcrumb: 'Confirmar'}
          }
        ]
      },
      {
        path: 'read',
        component: RequisitionReadComponent,
        data: { breadcrumb: 'Listado'}
      },
      {
        path: 'update',
        component: RequisitionUpdateComponent,
        data: { breadcrumb: 'Actualizar'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisitionRoutingModule { }
