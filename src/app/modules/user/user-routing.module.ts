import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserReadComponent } from './components/user-read/user-read.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children:
    [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'read', component: UserReadComponent,
        data: { breadcrumb: 'Lista de usuarios' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
