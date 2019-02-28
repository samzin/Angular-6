import { Injectable } from '@angular/core';
import { User } from './user.model';
import {HttpService} from '../common-services/http.service';
import {API, Constants} from './Constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpService) {
  }

  postUser(user: User) {
    return this.httpService.post('/register', user);
  }

  createUserTabOrder(analysisId, body): Observable<any> {
    const URL = API.USER_TAB_ORDER.replace('$analysisId$', analysisId);
    return this.httpService.post(URL, body);
  }

  login(authCredentials) {
    return this.httpService.post('/authenticate', authCredentials);
  }

  getUserProfile() {
    return this.httpService.get('/userProfile');
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
