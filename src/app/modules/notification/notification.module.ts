import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { SocketClientService } from './services/socket-client.service';

@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    NotificationRoutingModule
  ],
  providers: [SocketClientService]
})
export class NotificationModule { }
