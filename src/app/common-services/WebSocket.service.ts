import {Injectable, OnInit} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebSocketService implements OnInit {

  private serverUrl = 'http://localhost:8080/cif-notify-connection';
  private stompClient;

  constructor() {}

  ngOnInit() {
  }

  connect() {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
       console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/status-notification/notify', function (hello) {
        console.log(JSON.parse(hello.body));
        _this.showGreeting(JSON.parse(hello.body));
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
    this.stompClient.send('/update-order-status/updateStatus', {}, JSON.stringify(orderConfirm));
  }

  showGreeting(message) {
    console.log('message : ' + JSON.stringify(message));
  }

}
