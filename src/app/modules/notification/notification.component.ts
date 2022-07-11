import { Component, OnInit } from '@angular/core';
import { Notification } from './models/Notification';
import { SocketClientService } from './services/socket-client.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public message: string = "";
  public notifications: Notification[] = [];

  constructor( private socketClientService: SocketClientService ) { }

  ngOnInit(): void {
    this.notifications = this.socketClientService.notifications;
  }

  sendMessageWithSocket() {
    this.socketClientService.sendMessage(this.message);
    this.notifications = this.socketClientService.notifications;
  }

  closeConnection() {
    this.socketClientService.disconnect();
  }

}
