import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeStepComponent } from './office-step/office-step.component';
import { OfficeComponent } from './office.component';

const routes: Routes = [
  {
    path: '',
    component: OfficeComponent,
    children:
    [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'office-step', component: OfficeStepComponent,
        data: { breadcrumb: 'Control de servicios' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeRoutingModule { }
