import {Component} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector : 'app-wallet',
  templateUrl : 'wallet.component.html'
})

export class WalletComponent {
  greetings: string[] = [];
  disabled = true;
  name: string;
  private stompClient = null;

  constructor() {
    this.connect();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8080/cif-notify-connection');
    this.stompClient = Stomp.Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
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
    this.setConnected(false);
  }

  sendName() {
    this.stompClient.send('/update-order-status/updateStatus', {}, JSON.stringify({ 'name': this.name }));
  }

  showGreeting(message) {
    console.log('message : ' + JSON.stringify(message));
    this.greetings.push(JSON.parse(message.notificationMessage));
  }

}
