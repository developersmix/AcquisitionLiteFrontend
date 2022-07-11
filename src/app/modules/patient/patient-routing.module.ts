import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientStepComponent } from './components/patient-step/patient-step.component';
import { PatientComponent } from './patient.component';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    children:
    [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'patient-step', component: PatientStepComponent,
        data: { breadcrumb: 'Control de pacientes' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
