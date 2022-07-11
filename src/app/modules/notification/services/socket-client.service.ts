import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { MessageService } from 'primeng/api';
import { Notification } from '../models/Notification';
import { RequisitionService } from '../../requisition/services/requisition.service';

@Injectable({
  providedIn: 'root'
})
export class SocketClientService  implements OnDestroy {

  baseUrl = environment.baseUrl;
  public notifications: Notification[] = [];
  //private stompEndpointRegistry: string = 'http://localhost:8080/notifications';
  private stompEndpointRegistry: string = this.baseUrl+'notifications';
  private messageMapping: string = '/app/requisition';
  private sendToMapping: string = '/topic/requisitions';

  private client: StompJs.Client | null = null;

  constructor( private messageService: MessageService,
    private requisitionService: RequisitionService ) { }

  connect() {
    if (!this.client || !this.client.connected) {
      this.client = new StompJs.Client({
        webSocketFactory: () => new SockJS(this.stompEndpointRegistry),
        debug: (msg: string) => console.log("debug : ", msg)
      });
      this.client.onConnect = () => {
        this.client!.subscribe(this.sendToMapping, (response) => {
          const messageReceived: string = JSON.parse(response.body).text;
          this.messageService.add({severity:'success', summary:'Requisición creada', 
              detail: messageReceived});
          let requisitionSerialized: Notification = new Notification();
          requisitionSerialized.text = messageReceived;
          this.notifications.push(requisitionSerialized);
          var created: number = this.requisitionService.requisitionsCreated.value;
          this.requisitionService.updateRequisitionsCreated(created+1);
        });
        console.info('connected!');
      };
      this.client.onStompError = (frame) => {
        console.error('error headers : ', frame.headers['message']);
        console.error('error body:', frame.body);
      };
      this.client.activate();
    }
  }

  sendMessage(message : string) {
    if (this.client && this.client.connected) {
      this.client.publish(
        {
          destination: this.messageMapping,
          body: JSON.stringify({ 'text': message
        }
      )});
    }
  }

  disconnect() {
    if (this.client && this.client.connected) {
      this.client.deactivate();
      this.client = null;
      console.info("disconnected!");
    }
  }

  ngOnDestroy() {
    this.disconnect();
  }

  /*
  connect() {
    var url = "/topic/requisitions";
    //const socket = new SockJS('http://localhost:8080/notifications');
    const webSocket = new WebSocket('ws://localhost:8080/notifications/websocket');
    this.stomp = Stomp.over(webSocket);
    this.stomp.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      this.stomp.subscribe(url, function (requisition) {
        var messageReceived = JSON.parse(requisition.body).text;
        this.messageService.add({severity:'success', summary:'Requisición creada', 
        detail: messageReceived});
        this.messages.push(messageReceived);
      });
    });
  }

  sendMessage(message: string) {
    console.log("message : ", message);
    var url = "/app/requisition";
    this.stomp.send( url, {}, JSON.stringify({ 'text': message }));
  }

  disconnect() {
    if (this.stomp != null) { this.stomp.disconnect(); }
    console.log('Disconnected!');
  }
*/
}
