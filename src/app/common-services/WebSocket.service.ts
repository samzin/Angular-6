import {Injectable, OnInit} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {ToasterNotificationService} from './toaster-notification.service';
import {CommonService} from './common.service';
import {environment} from '../../environments/environment';

@Injectable()
export class WebSocketService implements OnInit {

  private serverUrl = environment.websocketUrl + 'cif-notify-connection';
  private stompClient;

  constructor(private toasterNotification: ToasterNotificationService, private commonService: CommonService) {}

  ngOnInit() {
  }

  connectToUser(userId) {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.Stomp.over(socket);

    const _this = this;
    this.stompClient.connect({}, function (frame) {
       console.log('connect To User: ' + frame);
      _this.stompClient.subscribe('/user-notification/' + userId, function (message) {
         console.log('user-notification subscribed : ' + JSON.parse(message.body));
        _this.showGreeting(JSON.parse(message.body));
      });
    });
  }

  connectToOperator(operatorId) {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('connectToOperator: ' + frame);
      _this.stompClient.subscribe('/operator-notification/' + operatorId, function (message) {
        console.log('operator-notification subscribed : ' + JSON.parse(message.body));
        _this.showGreeting(JSON.parse(message.body));
      });
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }

  sendNotificationToUser(orderConfirm: any) {
    const updateOrderStatusAPI = '/update-order-status/userStatus/' + orderConfirm.uid.uid;
    console.log('sendNotificationToUser : ' + JSON.stringify(orderConfirm));
    this.stompClient.send(updateOrderStatusAPI, {}, JSON.stringify(orderConfirm));
  }

  sendNotificationToOperator(orderConfirm: any) {
    const updateOrderStatusAPI = '/update-order-status/operatorStatus/' + orderConfirm.aid.aid;
    console.log('sendNotificationToOperator : ' + JSON.stringify(orderConfirm));
    this.stompClient.send(updateOrderStatusAPI, {}, JSON.stringify(orderConfirm));
  }

  showGreeting(order) {
    const showSuccessMessage = 'Order status updated for ' + order.orderId.aid.analysisname + '. Please refresh page.';
    this.toasterNotification.showSuccess(showSuccessMessage);
    this.commonService.updateOrderStatusInfo(order);
  }

}
