import {Injectable, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable()
export class WebSocketService implements OnInit {

  private serverUrl = 'http://localhost:8080/notificationConnect';
  private stompClient;

  constructor() {}

  ngOnInit() {
  }

  listenFromServer() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, function(frame) {
      this.stompClient.subscribe('/notifystatus', (message) => {
        if (message.body) {
          console.log(message.body);
        }
      });
    });
  }

  sendNotificationToServer(msg: string) {
    this.stompClient.send('/app/send/message' , {}, msg);
  }
}
