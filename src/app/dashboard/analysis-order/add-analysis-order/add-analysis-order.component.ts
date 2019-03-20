import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../../../shared/user.service';
import {ToasterNotificationService} from '../../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../../common-services/app-loader.service';
import {APIResponse} from '../../../shared/Constants';
declare let $: any;

@Component({
  selector: 'app-add-analysis-order',
  templateUrl: 'add-analysis-order.component.html',
  styleUrls: []
})

export class AddAnalysisOrderComponent {

  @Input() formType: string;
  @Output() refreshEvent = new EventEmitter<any>();
  constructor(private userService: UserService, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService) {}

  createOrder(analysisOrder) {
    this.startLoader();
    this.userService.createUserTabOrder(analysisOrder.aid.aid, analysisOrder).subscribe( res => {
        this.createOrderSuccess(res);
      },
      err => {
        this.createOrderError(err);
      });
  }

  createOrderSuccess(response: any) {
    if (response) {
      this.stopLoader();
      this.toasterNotification.showSuccess(APIResponse.SUCCESS_CREATING_ORDER);
      $('#CreateModal').modal('hide');
      this.refreshEvent.emit();
    } else  {
      this.createOrderError(response);
    }
  }

  createOrderError(error: any) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_CREATING_ORDER);
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }
}
