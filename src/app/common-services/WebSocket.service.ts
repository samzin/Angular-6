import {Injectable, OnInit} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebSocketService implements OnInit {

  private serverUrl = 'http://localhost:8080/cif-notify-connection';
  private stompClient;
  private orderStatusNotification: any;

  constructor() {}

  ngOnInit() {
  }

  connect(orderId) {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
       console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/status-notification/' + orderId, function (message) {
         console.log('status-notification subscribed : ' + JSON.parse(message.body));
        _this.showGreeting(JSON.parse(message.body));
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected!');
  }

  sendNotification(orderConfirm: any) {
    const orderSTtausObject = this.getNotification();
    orderSTtausObject.state = 1;
    console.log('update-order-status : ' + JSON.stringify(orderSTtausObject));
    this.stompClient.send('/update-order-status/updateStatus', {}, JSON.stringify(orderSTtausObject));
  }

  setNotification(order) {
    this.orderStatusNotification = order;
  }

  getNotification() {
    return this.orderStatusNotification;
  }

  showGreeting(message) {
    console.log('message : ' + JSON.stringify(message));
  }

}
