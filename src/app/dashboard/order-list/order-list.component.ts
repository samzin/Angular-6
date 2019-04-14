import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Constants, CIFConstants, LocalStorageLabels, APIResponse} from '../../shared/Constants';
import {TaborderModel} from '../../shared/models/taborder.model';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';
import {Router} from '@angular/router';
import {ConfirmOrderModel} from '../../shared/models/confirm-order.model';
import {WebSocketService} from '../../common-services/WebSocket.service';
import {UserModel} from '../../shared/models/user.model';
import {CommonService} from '../../common-services/common.service';

@Component({
  selector : 'app-order-listing',
  templateUrl : 'order-list.component.html',
  styleUrls : ['order-list.component.css']
})

export class OrderListComponent implements OnInit {

  orderList = [];
  selctedOrderModel = new TaborderModel();
  totalOrderAmount = 0;
  disableCheckout = true;
  subscription : any;
  CIFConstants = CIFConstants;

  constructor(private userService: UserService, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService, private router: Router, private websocketService: WebSocketService,
              private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.websocketService.connectToUser();
    this.subscribeOrderStatusUpdate();
  }

  subscribeOrderStatusUpdate() {
    this.subscription = this.commonService.updateOrderStatusInfo$
      .subscribe(item => {
          if (item !== undefined || item !== null) {
            this.getAllOrders();
          }
        }
      );
  }

  getAllOrders() {
    this.startLoader();
    const billNo = localStorage.getItem('bill_no');
    if (billNo) {
      this.userService.getAllUserOrders(billNo).subscribe(
        res => {
          this.onSuccessGettingAllOrders(res);
        },
        err => {
          this.onErrorGettingAllOrders(err);
        }
      );
    }
  }

  onSuccessGettingAllOrders(response) {
    this.stopLoader();
    this.orderList = response;
    this.calculateTotalOrderAmount(this.orderList);
    const uid = parseInt(localStorage.getItem('user_id'), 0);
    this.websocketService.subscribeToUser(uid);
    // this.toasterNotification.showSuccess(APIResponse.SUCCESS_GETTING_ORDERS);
  }

  calculateTotalOrderAmount(orderList) {
    for (const order of orderList) {
      this.totalOrderAmount = this.totalOrderAmount + order.total_Amount;
    }
  }

  onErrorGettingAllOrders(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_ORDERS);
  }

  editSelectedOrder(order) {
    this.selctedOrderModel = order;
  }

  refreshTabOrderList(event) {
    this.getAllOrders();
  }

  deleteSelectedOrder(ordid) {
    this.startLoader();
    this.userService.deleteOrderByBillNumber(ordid).subscribe(
      res => {
        this.successDeleteSelectedOrder(res);
      },
      err => {
        this.errorDeleteSelectedOrder(err);
      }
    );
  }

  successDeleteSelectedOrder(response) {
    this.stopLoader();
    this.totalOrderAmount = 0;
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_DELETING_ORDERS);
    this.getAllOrders();
  }

  errorDeleteSelectedOrder(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_DELETING_ORDERS);
  }

  confirmOrder() {
    this.startLoader();
    const uid = localStorage.getItem('user_id');
    const confirmOrder = new ConfirmOrderModel();
    confirmOrder.billNo = localStorage.getItem('bill_no');
    confirmOrder.uid = parseInt(uid, 0);
    confirmOrder.state = 0;
    this.userService.confirmOrder(confirmOrder).subscribe(
      res => {
        this.successConfirmOrder(res);
      },
      err => {
        this.errorConfirmOrder(err);
      }
    );
  }

  approveOrder() {
    /*const userM = new UserModel();
    userM.uid = parseInt(localStorage.getItem('user_id'), 0);
    const statusUpdateObject = {
      uid : userM,
      billNo : localStorage.getItem('bill_no'),
      statusId : 1
    };
    // this.websocketService.sendNotification(statusUpdateObject);*/
  }

  successConfirmOrder(response) {
    this.stopLoader();
    if (response) {
      this.disableCheckout = false;
    }
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_CONFIRM_ORDERS);
  }

  errorConfirmOrder(err) {
    this.stopLoader();
    this.disableCheckout = false;
    this.toasterNotification.showError(APIResponse.ERROR_CONFIRM_ORDERS);
  }

  stopWebSocketService() {
    this.websocketService.disconnect();
  }

  redirectToCheckOut() {
    this.router.navigateByUrl('/dashboard/checkout');
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }
}
