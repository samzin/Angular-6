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

  constructor(private toasterNotification: ToasterNotificationService, private commonService: CommonService) {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.Stomp.over(socket);
  }

  ngOnInit() {
  }

  connectToUser() {
    this.stompClient.connect({}, function (frame) {
       console.log('connect To User: ' + frame);
    });
  }

  subscribeToUser(userId) {
    this.stompClient.subscribe('/user-notification/' + userId, function (message) {
      console.log('user-notification subscribed : ' + JSON.stringify(message.body));
      // alert(JSON.stringify(message.body));
     /// this.WebSocketService.showGreeting(JSON.parse(message.body));
  });
  }

  connectToOperator(operatorId) {
    this.stompClient.subscribe('/operator-notification/' + operatorId, function (message) {
      console.log('operator-notification subscribed : ' + JSON.stringify(message.body));
      // alert(JSON.stringify(message.body));
      //this.WebSocketService.showGreeting(JSON.parse(message.body));
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
