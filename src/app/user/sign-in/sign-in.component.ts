import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../shared/user.service';
import {LoginModel} from '../../shared/models/login.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  public login = new LoginModel();
  serverErrorMessages: string;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/userprofile');
    }
  }

  onSubmit(loginModel: LoginModel) {
    this.userService.login(loginModel).subscribe(
      res => {
        this.onLoginSuccess();
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/userprofile');
      },
      err => {
        this.onLoginSuccess();
        this.onLoginError();
        this.serverErrorMessages = err.error.message;
      }
    );
  }

  onLoginSuccess() {
    this.router.navigateByUrl('/dashboard');
  }

  onLoginError() {
    console.log('Error while login');
  }

}
