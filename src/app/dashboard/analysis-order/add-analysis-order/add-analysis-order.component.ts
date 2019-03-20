import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../../../shared/user.service';
declare let $: any;

@Component({
  selector: 'app-add-analysis-order',
  templateUrl: 'add-analysis-order.component.html',
  styleUrls: []
})

export class AddAnalysisOrderComponent {

  @Input() formType: string;
  @Output() refreshEvent = new EventEmitter<any>();
  constructor(private userService: UserService) {}

  createOrder(analysisOrder) {
    console.log('create Order : ' + JSON.stringify(analysisOrder));
    this.userService.createUserTabOrder(analysisOrder.aid.aid, analysisOrder).subscribe( res => {
        this.createOrderSuccess(res);
      },
      err => {
        this.createOrderError(err);
      });
  }

  createOrderSuccess(response: any) {
    $('#CreateModal').modal('hide');
    this.refreshEvent.emit();
    console.log('Order updated successfully.');
  }

  createOrderError(error: any) {
    console.log('Order failed to update.');
  }
}
