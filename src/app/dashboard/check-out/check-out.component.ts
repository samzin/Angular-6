import {Component} from '@angular/core';
import {APIResponse, Constants} from '../../shared/Constants';
import {UserService} from '../../shared/user.service';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';
import {PaymentModel} from '../../shared/models/payment.model';

@Component({
  selector : 'app-check-out',
  templateUrl : 'check-out.component.html',
  styleUrls : ['check-out.component.css']
})

export class CheckOutComponent {

  amountByWallet = 0;
  amountPaid = 0;
  chequeNumber = 0;
  bankName = '';
  chequeDate = new Date();
  isError = false;
  paymentModel = new PaymentModel();
  paymentTypes = Constants.PAYMENT_TYPES;
  paymentByChequeLabel = Constants.PAYMENT_TYPE_BY_CHEQUE;
  paymentByDDLabel = Constants.PAYMENT_TYPE_BY_DD;
  paymentByChalan = Constants.PAYMENT_TYPE_CHALLAN;
  paymentByBudgetHead = Constants.PAYMENT_TYPE_BUDGET_HEAD;
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

  onSubmitPayment(paymentModel) {
    // paymentModel.paymentType = this.selectedPaymentType;
    const userId = localStorage.getItem('user_id');
    this.userService.payOrder(userId, paymentModel).subscribe(res => {
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
