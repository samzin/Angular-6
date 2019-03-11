import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {APIResponse, Constants} from '../../shared/Constants';
import {Router} from '@angular/router';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';

@Component({
  selector : 'app-order-history',
  templateUrl : 'order-history.component.html',
  styleUrls : ['order-history.component.css']
})

export class OrderHistoryComponent implements OnInit {

  public orderHistoryList = [];

  constructor(public userService: UserService, private router: Router,
              private toasterNotification: ToasterNotificationService, private appLoader: AppLoaderService) {

  }

  ngOnInit() {
    this.getOrderHistory();
  }

  getOrderHistory() {
    const analysisId = localStorage.getItem('analysis_id');
    this.userService.getUserOrdersHistory(analysisId)
      .subscribe(
        response => {
          this.successGettingOrderHistory(response);
        }, error => {
          this.errorGettingOrderHistory(error);
        });
  }

  successGettingOrderHistory(response) {
    // this.orderHistoryList = response;
    this.orderHistoryList = Constants.ORDERS_HISTORY;
    this.stopLoader();
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_GETTING_PROFILE_DETAILS);
  }

  errorGettingOrderHistory(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_PROFILE_DETAILS);
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }

}
