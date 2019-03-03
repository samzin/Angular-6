import {Component, OnInit} from '@angular/core';
import {UserService} from '../../shared/user.service';
import {Constants, LocalStorage} from '../../shared/Constants';

@Component({
  selector : 'app-order-listing',
  templateUrl : 'order-list.component.html',
  styleUrls : ['order-list.component.css']
})

export class OrderListComponent implements OnInit {

  orderList = [];
  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    // let analysisId = localStorage.getItem(LocalStorage.ANALYSIS_ID);
    const analysisId = 1;
    this.userService.getAllUserOrders(analysisId).subscribe(
      res => {
        this.onSuccessGettingAllOrders(res);
      },
      err => {
        this.onErrorGettingAllOrders(err);
      }
    );
  }

  onSuccessGettingAllOrders(response) {
    console.log('onSuccessGettingAllOrders : ', JSON.stringify(response));
    this.orderList = Constants.ORDER_LIST;
  }

  onErrorGettingAllOrders(err) {
    console.log('onSuccessGettingAllOrders : ', JSON.stringify(err));
    this.orderList = Constants.ORDER_LIST;
  }
}
