import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog.component';
import { DrugStepComponent } from './components/drug-step/drug-step.component';
import { DrugComponent } from './components/drug/drug.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    children:
    [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'drug', component: DrugComponent,
        data: { breadcrumb: 'Medicamento' }
      },
      {
        path: 'drug-step', component: DrugStepComponent,
        data: { breadcrumb: 'Control de medicamentos' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
