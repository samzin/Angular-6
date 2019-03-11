import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';
import {LoginModel} from '../../shared/models/login.model';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {AppLoaderService} from '../../common-services/app-loader.service';
import {APIResponse, LocalStorageLabels} from '../../shared/Constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public login = new LoginModel();
  serverErrorMessages: string;

  constructor(private userService: UserService, private router: Router, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService) {
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/userprofile');
    }
  }

  onSubmit(loginModel: LoginModel) {
    this.startLoader();
    this.userService.login(loginModel).subscribe(
      res => {
        this.onLoginSuccess(res);
      },
      err => {
        this.onLoginError(err);
      }
    );
  }

  onLoginSuccess(response) {
    this.stopLoader();
    if (response.message) {
      this.toasterNotification.showError(response.message);
    } else {
      localStorage.setItem('user_id', response.uid);
      localStorage.setItem('bill_no', response.billno);
      localStorage.setItem('user_type_id', response.utid);
      if (response.isUserApproved) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.router.navigateByUrl('/dashboard/profile');
      }
    }
  }

  onLoginError(err) {
    this.stopLoader();
    console.log('Error while login :', JSON.stringify(err));
    this.toasterNotification.showError(APIResponse.ERROR_LOGIN);
    this.serverErrorMessages = err.error.message;
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }
}
