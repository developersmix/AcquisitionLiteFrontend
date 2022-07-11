import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserReadComponent } from './components/user-read/user-read.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    UserComponent,
    UserReadComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [UserService]
})
export class UserModule { }
