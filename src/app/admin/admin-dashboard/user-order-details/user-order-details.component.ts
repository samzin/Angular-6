import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../admin.service';
import {TaborderModel} from '../../../shared/models/taborder.model';
import {CIFConstants} from '../../../shared/Constants';
import {WebSocketService} from '../../../common-services/WebSocket.service';
import {CommonService} from '../../../common-services/common.service';
import {ToasterNotificationService} from '../../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../../common-services/app-loader.service';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css']
})
export class UserOrderDetailsComponent implements OnInit {

  billNo: string;
  aid: number;
  tabOrderList: Array<TaborderModel> = new Array<TaborderModel>();
  orderStatusList = [];
  subscription: any;
  CIFConstants = CIFConstants;

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService,
              private websocketService: WebSocketService, private commonService: CommonService,
              private appLoader: AppLoaderService, private toasterNotificationService: ToasterNotificationService) { }

  ngOnInit() {
    this.getOrderStatusList();
    this.route.params.subscribe(params => {
      this.billNo = params['billNo'];
      this.aid = params['aid'];
      if (this.billNo) {
        this.getTabOrdersByBillNo(this.billNo);
        this.websocketService.connectToOperator(this.aid);
      }
    });
  }

  getOrderStatusList() {
    this.startLoader();
    this.adminService.getOrderStatusList().subscribe(
      response => {
        this.stopLoader();
        this.orderStatusList = response;
      },
      error => {
        this.stopLoader();
        this.toasterNotificationService.showError(error);
      }
    );
  }

  getTabOrdersByBillNo(billNo) {
    this.startLoader();
    this.adminService.getTabOrdersByBillNo(billNo).subscribe(
      response => {
        this.stopLoader();
        this.tabOrderList = response;
      },
      error => {
        this.stopLoader();
        this.toasterNotificationService.showError(error);
      }
    );
  }

  goToDashboard() {
    this.router.navigateByUrl('/admin/dashboard');
  }

  updateOrderStatus(order) {
    this.websocketService.sendNotificationToUser(order);
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }
}
