import {Injectable, OnInit} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {ToasterNotificationService} from './toaster-notification.service';
import {CommonService} from './common.service';

@Injectable()
export class WebSocketService implements OnInit {

  private serverUrl = 'http://localhost:8080/cif-notify-connection';
  private stompClient;

  constructor(private toasterNotification: ToasterNotificationService, private commonService: CommonService) {}

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
    const updateOrderStatusAPI = '/update-order-status/updateStatus/' + orderConfirm.uid.uid;
    this.stompClient.send(updateOrderStatusAPI, {}, JSON.stringify(orderConfirm));
  }

  showGreeting(order) {
    const showSuccessMessage = 'Order status updated for ' + order.orderId.aid.analysisname + '. Please refresh page.';
    this.toasterNotification.showSuccess(showSuccessMessage);
    this.commonService.updateOrderStatusInfo(order);
  }

}
