import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Constants, CIFConstants, LocalStorage, APIResponse} from '../../shared/Constants';
import {TaborderModel} from '../../shared/models/taborder.model';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';
import {Router} from '@angular/router';

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
  CIFConstants = CIFConstants;

  constructor(private userService: UserService, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.startLoader();
    // let analysisId = localStorage.getItem(LocalStorage.ANALYSIS_ID);
    const analysisId = 1;
    this.userService.getAllUserOrders(analysisId).subscribe(
      res => {
        this.onSuccessGettingAllOrders(res);
      },
      err => {
        this.onErrorGettingAllOrders(err);
      }
    );
  }

  onSuccessGettingAllOrders(response) {
    this.stopLoader();
    console.log('onSuccessGettingAllOrders : ', JSON.stringify(response));
    this.orderList = Constants.ORDER_LIST;
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_GETTING_ORDERS);
  }

  onErrorGettingAllOrders(err) {
    this.stopLoader();
    console.log('onSuccessGettingAllOrders : ', JSON.stringify(err));
    this.orderList = Constants.ORDER_LIST;
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_ORDERS);
  }

  editSelectedOrder(order) {
    console.log('editSelectedOrder : ' + JSON.stringify(order));
    this.orderModel = new TaborderModel();
    this.orderModel.billNo = order.orderid;
    this.orderModel.aid = this.index;
    this.orderModel.solvent_id = this.index;
    this.orderModel.subid = this.index;
    this.orderModel.extra_Hrs = order.extrahrs;
    this.orderModel.hrs_Rate = order.hrs_rate;
    this.orderModel.rate = order.rate;
    this.orderModel.sample_Code = order.samplecode;
    this.orderModel.cgst = order.cgst;
    this.orderModel.sgstp = order.sgst;
    /*this.index = this.index + 1;*/
  }

  deleteSelectedOrder(order) {
    console.log('deleteSelectedOrder : ' + JSON.stringify(order));
    order.billNo = 'TY21BH';
    order.index = 1;
    this.startLoader();
    this.userService.deleteOrderByBillNumber(order.billNo, order.index).subscribe(
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
    console.log('successDeleteSelectedOrder : ' + JSON.stringify(response));
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_DELETING_ORDERS);
  }

  errorDeleteSelectedOrder(err) {
    this.stopLoader();
    console.log('errorDeleteSelectedOrder : ' + JSON.stringify(err));
    this.toasterNotification.showError(APIResponse.ERROR_DELETING_ORDERS);
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
