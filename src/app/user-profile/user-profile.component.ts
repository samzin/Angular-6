import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import {UserModel} from '../shared/models/user.model';
import {APIResponse, Constants, LocalStorage} from '../shared/Constants';
import {ToasterNotificationService} from '../common-services/toaster-notification.service';
import {AppLoaderService} from '../common-services/app-loader.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails: UserModel = new UserModel();
  reenterPassword: String;
  userTypeCampus = Constants.USER_TYPE_CAMPUS;
  userTypeCollege = Constants.USER_TYPE_COLLEGE;
  userTypeGovernment = Constants.USER_TYPE_GOVERNAMENT;
  userTypeIndustry = Constants.USER_TYPE_INDUSTRY;
  userTypeUniversity = Constants.USER_TYPE_UNIVERSITY;

  constructor(private userService: UserService, private router: Router, private toasterNotification: ToasterNotificationService,
              private appLoader: AppLoaderService) { }

  ngOnInit() {
    this.getUserProfileDetails();
  }

  getUserProfileDetails() {
    this.startLoader();
    const uid = localStorage.getItem('user_id');
    this.userService.getUserProfile(uid).subscribe(
      res => {
        this.successGettingUserDetails(res);
      },
      err => {
        this.errorGettingUserDetails(err);
      }
    );
  }

  successGettingUserDetails(response) {
    this.userDetails = response;
    this.stopLoader();
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_GETTING_PROFILE_DETAILS);
    // this.userDetails = Constants.USER_PROFILE;
  }

  errorGettingUserDetails(err) {
    this.stopLoader();
    console.log('Error getting user profile : ' + JSON.stringify(err));
    this.toasterNotification.showError(APIResponse.ERROR_GETTING_PROFILE_DETAILS);
    // this.userDetails = Constants.USER_PROFILE;
  }

  checkIfUserOfIndustry() {
    if (this.userDetails && this.userDetails.userType && this.userDetails.userType.userTypeName) {
      if (this.userDetails.userType.userTypeName !== this.userTypeIndustry) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  checkPassword() {
    console.log('comparing password');
  }

  updateUserProfileDetails(userDetails) {
    console.log('userDetails : ' + JSON.stringify(userDetails));
    this.startLoader();
    const userId = localStorage.getItem('user_id');
    const profileDetails = this.userDetails;
    this.userService.updateUserDetails(userId, profileDetails).subscribe(
      res => {
        this.successUpdateUserProfileDetails(res);
      },
      err => {
        this.errorUpdateUserProfileDetails(err);
      }
    );
  }

  successUpdateUserProfileDetails(response) {
    // this.userDetails = response;
    this.stopLoader();
    this.toasterNotification.showSuccess(APIResponse.SUCCESS_UPDATE_PROFILE_DETAILS);
  }

  errorUpdateUserProfileDetails(err) {
    this.stopLoader();
    this.toasterNotification.showError(APIResponse.ERROR_UPDATE_PROFILE_DETAILS);
  }

  startLoader() {
    console.log('Start loader');
    this.appLoader.start();
  }

  stopLoader() {
    console.log('Stop loader');
    this.appLoader.stop();
  }

}
