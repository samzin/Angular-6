import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../admin.service';
import {TaborderModel} from '../../../shared/models/taborder.model';
import {CIFConstants} from '../../../shared/Constants';
import {WebSocketService} from '../../../common-services/WebSocket.service';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css']
})
export class UserOrderDetailsComponent implements OnInit {

  billNo: string;
  uid: number;
  tabOrderList: Array<TaborderModel> = new Array<TaborderModel>();
  orderStatusList = [];
  CIFConstants = CIFConstants;

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService,
              private websocketService: WebSocketService) { }

  ngOnInit() {
    this.getOrderStatusList();
    this.route.params.subscribe(params => {
      this.billNo = params['billNo'];
      this.uid = params['billNo'];
      if (this.billNo) {
        this.getTabOrdersByBillNo(this.billNo);
        this.websocketService.connect(this.uid);
      }
    });
  }

  getOrderStatusList() {
    this.adminService.getOrderStatusList().subscribe(
      response => {
        this.orderStatusList = response;
      },
      error => {
        console.error('error : ' + JSON.stringify(error));
      }
    );
  }

  getTabOrdersByBillNo(billNo) {
    this.adminService.getTabOrdersByBillNo(billNo).subscribe(
      response => {
        this.tabOrderList = response;
      },
      error => {
        console.error('error : ' + JSON.stringify(error));
      }
    );
  }

  goToDashboard() {
    this.router.navigateByUrl('/admin/dashboard');
  }

  updateOrderStatus(order) {
    console.log('Updated Order : ' + JSON.stringify(order));
    this.websocketService.sendNotification(order);
  }

}
