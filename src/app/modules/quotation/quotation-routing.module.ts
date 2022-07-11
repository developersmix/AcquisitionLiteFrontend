import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuotationCreateComponent } from './components/quotation-create/quotation-create.component';
import { QuotationReadComponent } from './components/quotation-read/quotation-read.component';
import { QuotationResumeComponent } from './components/quotation-resume/quotation-resume.component';
import { QuotationToProcessComponent } from './components/quotation-to-process/quotation-to-process.component';
import { QuotationComponent } from './quotation.component';

const routes: Routes = [
  { path: '',
    component: QuotationComponent,
    children:
    [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'create',
        component: QuotationCreateComponent,
        data: { breadcrumb: 'Cotizar'},
      },
      {
        path: 'read',
        component: QuotationReadComponent,
        data: { breadcrumb: 'Listado'}
      },
      {
        path: 'resume',
        component: QuotationResumeComponent,
        data: { breadcrumb: 'Resumen'}
      },
      {
        path: 'to-process',
        component: QuotationToProcessComponent,
        data: { breadcrumb: 'A procesar'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
