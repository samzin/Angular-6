import {Component} from '@angular/core';
import {APIResponse, Constants} from '../../shared/Constants';
import {UserService} from '../../shared/user.service';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';

@Component({
  selector : 'app-check-out',
  templateUrl : 'check-out.component.html',
  styleUrls : ['check-out.component.css']
})

export class CheckOutComponent {

  amountByWallet = 0;
  isError = false;
  paymentTypes = Constants.PAYMENT_TYPES;
  paymentByChequeLabel = Constants.PAYMENT_TYPE_BY_CHEQUE;
  paymentByDDLabel = Constants.PAYMENT_TYPE_BY_DD;
  paymentByCashLabel = Constants.PAYMENT_TYPE_CASH;
  selectedPaymentType = '';

  constructor(public userService: UserService, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService) {

  }

  onSubmit(amountByWallet) {
    if (amountByWallet > 0) {
      console.log('amountByWallet : ' + amountByWallet);
      this.payByWallet(amountByWallet);
    } else {
      this.isError = true;
    }
  }

  payByWallet(amountByWallet) {
    this.startLoader();
    const body = {
      amount : amountByWallet
    };
    this.userService.getAllSubAnalysisList(body).subscribe(res => {
        this.successPayByWallet(res);
      }, err => {
        this.errorPayByWallet();
      }
    );
  }

  successPayByWallet(response) {
    this.stopLoader();
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_PAY_BY_WALLET);
  }

  errorPayByWallet() {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_PAY_BY_WALLET);
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }
}
