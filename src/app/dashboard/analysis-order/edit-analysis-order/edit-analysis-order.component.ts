import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TaborderModel} from '../../../shared/models/taborder.model';
import {HttpService} from '../../../common-services/http.service';
import {UserService} from '../../../shared/user.service';
declare let $: any;

@Component({
  selector: 'app-edit-analysis-order',
  templateUrl: 'edit-analysis-order.component.html',
  styleUrls: []
})

export class EditAnalysisOrderComponent {
  @Input() selectedOrderModel: any;
  @Output() refreshEvent = new EventEmitter<any>();

  constructor(private userService: UserService) {}

  updateOrder(analysisOrder) {
    console.log('updateOrder : ' + JSON.stringify(analysisOrder));
    this.userService.updateTabOrder(analysisOrder).subscribe( res => {
      this.updateOrderSuccess(res);
      },
      err => {
        this.updateOrderError(err);
      });
  }

  updateOrderSuccess(response: any) {
    $('#EditModal').modal('hide');
    this.refreshEvent.emit();
    console.log('Order updated successfully.');
  }

  updateOrderError(error: any) {
    console.log('Order failed to update.');
  }
}
