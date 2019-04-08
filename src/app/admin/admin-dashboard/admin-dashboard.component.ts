import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {WebSocketService} from '../../common-services/WebSocket.service';
import {Router} from '@angular/router';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  userList = [];

  constructor(private adminService: AdminService, private websocketService: WebSocketService,
              private router: Router, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService) { }

  ngOnInit() {
    this.getUserOrdersForOperator();
  }

  getUserOrdersForOperator() {
    this.startLoader();
    const operator_aid = parseInt(localStorage.getItem('operator_aid'), 0);
    const aid = {
      aid : operator_aid
    };
    this.adminService.getUserOrdersByAnalayisisId(aid).subscribe(
      res => {
        this.onGetUsersListSuccess(res);
      },
      err => {
        this.onGetUsersListError(err);
      }
    );
  }

  onGetUsersListSuccess(response) {
    this.stopLoader();
    this.userList = response;
  }

  onGetUsersListError(err) {
    this.stopLoader();
    this.toasterNotification.showError(err);
  }

  navigateToOrderDetails(billNo: string, aid: number) {
    this.router.navigateByUrl('/admin/user-order-details/' + billNo + '/' + aid);
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }
}
