import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';
import {LoginModel} from '../../shared/models/login.model';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';
import {APIResponse} from '../../shared/Constants';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public login = new LoginModel();
  serverErrorMessages: string;

  constructor(private userService: UserService, private router: Router, private toasterNotification: ToasterNotificationService) {
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/userprofile');
    }
  }

  onSubmit(loginModel: LoginModel) {
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
    this.router.navigateByUrl('/dashboard');
    this.userService.setToken(response['token']);
    // this.router.navigateByUrl('/userprofile');
  }

  onLoginError(err) {
    console.log('Error while login :', JSON.stringify(err));
    this.toasterNotification.showError(APIResponse.ERROR_LOGIN);
    this.router.navigateByUrl('/dashboard');
    this.serverErrorMessages = err.error.message;
  }

}
