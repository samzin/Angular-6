import { Injectable } from '@angular/core';
import { HttpService } from '../common-services/http.service';
import {LoginModel} from '../shared/models/login.model';
import {Observable} from 'rxjs';
import {API} from '../shared/Constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpService: HttpService) {
  }

  getUserOrdersByAnalayisisId(aid: any) {
    return this.httpService.post('/admin/orderManagement/activeUser', aid);
  }

  adminLogin(adminLoginModel: LoginModel) {
    return this.httpService.post('/admin/auth/login', adminLoginModel);
  }

  getTabOrdersByBillNo(billNo): Observable<any> {
    const URL = API.USER_TAB_ORDER_LIST.replace('$bill$', billNo);
    return this.httpService.get(URL);
  }

}
