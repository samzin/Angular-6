import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdminService} from '../../admin.service';
import {TaborderModel} from '../../../shared/models/taborder.model';
import {CIFConstants} from '../../../shared/Constants';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css']
})
export class UserOrderDetailsComponent implements OnInit {

  billNo: string;
  tabOrderList: Array<TaborderModel> = new Array<TaborderModel>();
  CIFConstants = CIFConstants;

  constructor(private route: ActivatedRoute, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.billNo = params['billNo'];
      if (this.billNo) {
        this.getTabOrdersByBillNo(this.billNo);
      }
    });
  }

  getTabOrdersByBillNo(billNo) {
    this.adminService.getTabOrdersByBillNo(billNo).subscribe(
      response => {
        console.log('response : ' + JSON.stringify(response));
        this.tabOrderList = response;
      },
      error => {
        console.error('error : ' + JSON.stringify(error));
      }
    );
  }

  goToDashboard() {
    this.router.navigateByUrl('/admin/dashboard');
  }

}
