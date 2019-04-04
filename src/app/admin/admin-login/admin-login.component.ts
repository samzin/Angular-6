import { Component } from '@angular/core';
import {LoginModel} from '../../shared/models/login.model';
import {AdminService} from '../admin.service';
import {Router} from '@angular/router';
import {AppLoaderService} from '../../common-services/app-loader.service';
import {ToasterNotificationService} from '../../common-services/toaster-notification.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent {

  adminLogin = new LoginModel();
  submitted = false;
  serverErrorMessages: string;

  constructor(private adminService: AdminService, private router: Router,
              private appLoader: AppLoaderService,
              private toasterNotification: ToasterNotificationService) { }

  onSubmit() {
    this.startLoader();
    this.submitted = true;
    this.adminService.adminLogin(this.adminLogin).subscribe(
      res => {
        this.successAdminLogin(res);
      }, error => {
        this.errorAdminLogin(error.error);
      }
    );
  }

  successAdminLogin(response) {
    if (response.message) {
      this.toasterNotification.showError(response.message);
    } else {
      this.stopLoader();
      localStorage.setItem('operator_aid', response.aid.aid);
      localStorage.setItem('adminOperatorId', response.adminOertatorId);
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  errorAdminLogin(error) {
    this.stopLoader();
    this.serverErrorMessages = error.message;
  }

  startLoader() {
    this.appLoader.start();
  }

  stopLoader() {
    this.appLoader.stop();
  }

}
