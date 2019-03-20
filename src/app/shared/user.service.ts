import { Injectable } from '@angular/core';
import { User } from './user.model';
import {HttpService} from '../common-services/http.service';
import {API, Constants} from './Constants';
import {Observable} from 'rxjs';
import {RegistrationModel} from './models/registartion.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) {
  }

  postUser(user: RegistrationModel) {
    return this.httpService.post('/authentication/register', user);
  }

  getAllAnalysisList(): Observable<any> {
    const URL = API.ANALYSIS_LIST;
    return this.httpService.get(URL);
  }

  getAllSubAnalysisList(body): Observable<any> {
    const URL = API.SUB_ANALYSIS_LIST.replace('$analysisId$', body.aid);
    return this.httpService.post(URL, body);
  }

  getAllSolventByAnalysisId(analysisId): Observable<any> {
    const URL = API.SOLVENT_LIST.replace('$analysisId$', analysisId);
    return this.httpService.get(URL);
  }

  getRateBySubanalysisId(body): Observable<any> {
    const URL = API.RATE;
    return this.httpService.post(URL, body);
  }

  createUserTabOrder(analysisId, body): Observable<any> {
    const URL = API.USER_TAB_ORDER.replace('$analysisId$', analysisId);
    return this.httpService.post(URL, body);
  }

  updateTabOrder(body): Observable<any> {
    const URL = API.UPDATE_USER_TAB_ORDER;
    return this.httpService.put(URL, body);
  }

  getAllUserOrders(billNo): Observable<any> {
    const URL = API.USER_TAB_ORDER_LIST.replace('$bill$', billNo);
    return this.httpService.get(URL);
  }

  getUserOrdersHistory(user_id): Observable<any> {
    const URL = API.USER_ORDER_HISTORY.replace('$uid$', user_id);
    return this.httpService.get(URL);
  }

  deleteOrderByBillNumber(tabOrderId): Observable<any> {
    const URL = API.DELETE_ORDER.replace('$tabOrderId$', tabOrderId);
    return this.httpService.delete(URL);
  }

  confirmOrder(body): Observable<any> {
    const URL = API.CONFIRM_ORDER;
    return this.httpService.put(URL, body);
  }

  login(authCredentials) {
    return this.httpService.post('/authentication/login', authCredentials);
  }

  payByWallet(userId, body): Observable<any> {
    const URL = API.PAY_BY_WALLET.replace('$uid$', userId);
    return this.httpService.post(URL, body);
  }

  payOrder(userId, body): Observable<any> {
    const URL = API.PAY_BY_WALLET.replace('$uid$', userId);
    return this.httpService.post(URL, body);
  }

  getUserProfile(uid) {
    const URL = API.USER_PROFILE_DETAILS.replace('$uid$', uid);
    return this.httpService.get(URL);
  }

  updateUserDetails(uid, body): Observable<any> {
    const URL = API.UPDATE_USER_PROFILE.replace('$uid$', uid);
    return this.httpService.put(URL, body);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayload = this.getUserPayload();
    if (userPayload) {
      return userPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
