import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './authorization.component';
import { AuthorizationReadComponent } from './authorization-read/authorization-read.component';
import { AuthorizationCreateComponent } from './authorization-create/authorization-create.component';


@NgModule({
  declarations: [AuthorizationComponent, AuthorizationReadComponent, AuthorizationCreateComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule
  ]
})
export class AuthorizationModule { }
