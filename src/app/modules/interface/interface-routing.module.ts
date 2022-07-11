import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InterfaceComponent } from './interface.component';

const routes: Routes = [
  {
    path: '',
    component: InterfaceComponent,
    children:
    [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'loader', component: SpinnerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterfaceRoutingModule { }
