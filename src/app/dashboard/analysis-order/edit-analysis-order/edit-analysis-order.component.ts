import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaborderModel} from '../../../shared/models/taborder.model';
import {HttpService} from '../../../common-services/http.service';
import {UserService} from '../../../shared/user.service';
import {ToasterNotificationService} from '../../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../../common-services/app-loader.service';
import {APIResponse} from '../../../shared/Constants';
declare let $: any;

@Component({
  selector: 'app-edit-analysis-order',
  templateUrl: 'edit-analysis-order.component.html',
  styleUrls: []
})

export class EditAnalysisOrderComponent {
  @Input() selectedOrderModel: any;
  @Output() refreshEvent = new EventEmitter<any>();

  constructor(private userService: UserService, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService) {}

  updateOrder(analysisOrder) {
    this.startLoader();
    this.userService.updateTabOrder(analysisOrder).subscribe( res => {
      this.updateOrderSuccess(res);
      },
      err => {
        this.updateOrderError(err);
      });
  }

  updateOrderSuccess(response: any) {
    this.stopLoader();
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_UPDATING_ORDER);
    $('#EditModal').modal('hide');
    this.refreshEvent.emit();
  }

  updateOrderError(error: any) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_UPDATING_ORDER);
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }
}
