import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../user/components/login/login.component';
import { LoginTestComponent } from '../user/components/login-test/login-test.component';
import { HomeComponent } from './home.component';
import { NotificationComponent } from '../notification/notification.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Inicio' },
    children:
    [
      {
        path: 'catalog',
        loadChildren: () => import( `../catalog/catalog.module`).then(m => m.CatalogModule),
        data: { breadcrumb: 'Catálogo' }
      },
      {
        path: 'employee',
        loadChildren: () => import( `../employee/employee.module`).then(m => m.EmployeeModule),
        data: { breadcrumb: 'Empleado' }
      },
      {
        path: 'interface',
        loadChildren: () => import( `../interface/interface.module`).then(m => m.InterfaceModule),
        data: { breadcrumb: '' }
      },
      {
        path: 'notification',
        component: NotificationComponent,
        data: { breadcrumb: 'Notificaciones' }
      },
      {
        path: 'office',
        loadChildren: () => import( `../office/office.module`).then(m => m.OfficeModule),
        data: { breadcrumb: 'Servicio' }
      },
      {
        path: 'patient',
        loadChildren: () => import( `../patient/patient.module`).then(m => m.PatientModule),
        data: { breadcrumb: 'Paciente' }
      },
      {
        path: 'quotation',
        loadChildren: () => import( `../quotation/quotation.module`).then(m => m.QuotationModule),
        data: { breadcrumb: 'Cotizaciones' }
      },
      {
        path: 'requisition',
        loadChildren: () => import( `../requisition/requisition.module`).then(m => m.RequisitionModule),
        data: { breadcrumb: 'Requisición' }
      },
      {
        path: 'user',
        loadChildren: () => import( `../user/user.module`).then(m => m.UserModule),
        data: { breadcrumb: 'Usuarios' }
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'login-test', component: LoginTestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
