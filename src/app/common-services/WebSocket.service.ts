import {Injectable, OnInit} from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

const subject = webSocket('wss://localhost:8080/notification-out');

@Injectable()
export class WebSocketService implements OnInit {

  constructor() {}

  ngOnInit() {
    // this.listenFromServer();
  }

  listenFromServer() {
    subject.subscribe(
      msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
  }


  sendNotificationToServer(msg: string) {
    subject.subscribe();
    subject.next(JSON.stringify({message: msg}));
  }
}
