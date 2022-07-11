import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './app-interceptor'
import { MessageService, ConfirmationService } from 'primeng/api';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {APP_ROUTES} from './app-routing.module';
import { HomeModule } from './modules/home/home.module';
import { ToastModule } from 'primeng/toast';
import { UppercaseDirective } from './directives/uppercase.directive';
import { SpinnerComponent } from './modules/interface/components/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    UppercaseDirective],
  imports: [
    BrowserModule,
    HttpClientModule,
    HomeModule,
    ToastModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    httpInterceptorProviders,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
