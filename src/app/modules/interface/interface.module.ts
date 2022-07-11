import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterfaceRoutingModule } from './interface-routing.module';
import { InterfaceComponent } from './interface.component';

@NgModule({
  declarations: [
    InterfaceComponent
  ],
  imports: [
    CommonModule,
    InterfaceRoutingModule
  ]
})
export class InterfaceModule { }
