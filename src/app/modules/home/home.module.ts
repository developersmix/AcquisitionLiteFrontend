import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import {ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { LoginComponent } from '../user/components/login/login.component';
import { LoginService } from '../user/services/login.service';
import { NotificationModule } from '../notification/notification.module';
import { LoginTestComponent } from '../user/components/login-test/login-test.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    LoginTestComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    BrowserAnimationsModule,
    MenubarModule,
    ButtonModule,
    ToastModule,
    NotificationModule
  ],
  providers: [LoginService],
})
export class HomeModule { }
