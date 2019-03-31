import { Component, OnInit } from '@angular/core';
import {AdminService} from '../admin.service';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.css']
})
export class OperatorListComponent implements OnInit {

  operatorsList = [];

  constructor(private adminService: AdminService, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService) { }

  ngOnInit() {
    this.getAllOperators();
  }

  getAllOperators() {
    this.startLoader();
    this.adminService.getAllOperators().subscribe(
      res => {
        this.successGetAllOperatorList(res);
      },
      error => {
        this.errorGetAllOperatorList(error);
      }
    );
  }

  successGetAllOperatorList(list) {
    this.operatorsList = list;
    this.stopLoader();
  }

  errorGetAllOperatorList(error) {
    this.stopLoader();
    this.toasterNotification.showError('Error getting all operators list');
  }

  refreshOperatorsList(event) {
    this.getAllOperators();
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }

}
