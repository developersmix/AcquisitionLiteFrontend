import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeStepComponent } from './components/employee-step/employee-step.component';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children:
    [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'employee-step', component: EmployeeStepComponent,
        data: { breadcrumb: 'Control de empleados' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
