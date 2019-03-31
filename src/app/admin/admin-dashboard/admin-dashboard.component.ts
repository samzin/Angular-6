import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {WebSocketService} from '../../common-services/WebSocket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  userList = [];

  constructor(private adminService: AdminService, private websocketService: WebSocketService,
              private router: Router) { }

  ngOnInit() {
    this.getUserOrdersForOperator();
  }

  getUserOrdersForOperator() {
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
    console.log('Success List ' + JSON.stringify(response));
    this.userList = response;
    this.createWebSocketService(response);
  }

  createWebSocketService(userList) {
    for (const user of userList) {
      this.websocketService.connect(user.ordid);
    }
  }

  onGetUsersListError(err) {
    console.error('err getting list ' + JSON.stringify(err));
  }

  approveOrder(userOrder: any) {
    this.websocketService.sendNotification(userOrder);
  }

  navigateToOrderDetails(billNo: string) {
    this.router.navigateByUrl('/admin/user-order-details/' + billNo);
  }
}
