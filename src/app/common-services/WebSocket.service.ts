import {Injectable, OnInit} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {ToasterNotificationService} from './toaster-notification.service';

@Injectable()
export class WebSocketService implements OnInit {

  private serverUrl = 'http://localhost:8080/cif-notify-connection';
  private stompClient;
  private orderStatusNotification: any;

  constructor(private toasterNotification: ToasterNotificationService) {}

  ngOnInit() {
  }

  connect(userId) {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
       console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/status-notification/' + userId, function (message) {
         console.log('status-notification subscribed : ' + JSON.parse(message.body));
        _this.showGreeting(JSON.parse(message.body));
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  sendNotification(orderConfirm: any) {
    this.stompClient.send('/update-order-status/updateStatus/' + orderConfirm.uid.uid, {}, JSON.stringify(orderConfirm));
  }

  setNotification(order) {
    this.orderStatusNotification = order;
  }

  getNotification() {
    return this.orderStatusNotification;
  }

  showGreeting(order) {
    const shoowSuccessMessage = 'Order status updated for ' + order.orderId.aid.analysisname + '. Please refresh page.';
    this.toasterNotification.showSuccess(shoowSuccessMessage);
  }

}
