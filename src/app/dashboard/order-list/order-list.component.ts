import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Constants, CIFConstants, LocalStorageLabels, APIResponse} from '../../shared/Constants';
import {TaborderModel} from '../../shared/models/taborder.model';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';
import {Router} from '@angular/router';
import {ConfirmOrderModel} from '../../shared/models/confirm-order.model';

@Component({
  selector : 'app-order-listing',
  templateUrl : 'order-list.component.html',
  styleUrls : ['order-list.component.css']
})

export class OrderListComponent implements OnInit {

  orderList = [];
  editOrderLabel = 'Edit';
  createOrderLabal = 'Create';
  orderModel = new TaborderModel();
  index = 1;
  disableCheckout = true;
  CIFConstants = CIFConstants;

  constructor(private userService: UserService, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllOrders();
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
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_GETTING_ORDERS);
  }

  onErrorGettingAllOrders(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_ORDERS);
  }

  editSelectedOrder(order) {
    this.orderModel = new TaborderModel();
    this.orderModel = order;
    /*this.orderModel.billNo = order.orderid;
    this.orderModel.aid.aid = this.index;
    this.orderModel.subid.subid = this.index;
    this.orderModel.extra_Hrs = order.extrahrs;
    this.orderModel.hrs_Rate = order.hrs_rate;
    this.orderModel.rate = order.rate;
    this.orderModel.sample_Code = order.samplecode;
    this.orderModel.cgst = order.cgst;
    this.orderModel.sgstp = order.sgst;*/
    /*this.index = this.index + 1;*/
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
