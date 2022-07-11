import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeService } from './services/employee.service';
import { EmployeeComponent } from './employee.component';
import { EmployeeStepComponent } from './components/employee-step/employee-step.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [EmployeeComponent, EmployeeStepComponent],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeRoutingModule,
    ButtonModule,
    CardModule
  ],
  providers: [EmployeeService]
})
export class EmployeeModule { }
