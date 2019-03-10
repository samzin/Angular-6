import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import {UserModel} from '../shared/models/user.model';
import {APIResponse, Constants} from '../shared/Constants';
import {ToasterNotificationService} from '../common-services/toaster-notification.service';
import {AppLoaderService} from '../common-services/app-loader.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails: UserModel = new UserModel();

  constructor(private userService: UserService, private router: Router, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService) { }

  ngOnInit() {
    this.startLoader();
    this.userService.getUserProfile().subscribe(
      res => {
        this.successGettingUserDetails(res);
      },
      err => {
        this.errorGettingUserDetails(err);
      }
    );
  }

  successGettingUserDetails(response) {
    // this.userDetails = response;
    this.stopLoader();
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_GETTING_PROFILE_DETAILS);
    this.userDetails = Constants.USER_PROFILE;
  }

  errorGettingUserDetails(err) {
    this.stopLoader();
    console.log('Error getting user profile : ' + JSON.stringify(err));
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_PROFILE_DETAILS);
    this.userDetails = Constants.USER_PROFILE;
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }

}
