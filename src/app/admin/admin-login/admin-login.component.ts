import { Component, OnInit } from '@angular/core';
import {LoginModel} from '../../shared/models/login.model';
import {AdminService} from '../admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminLogin = new LoginModel();
  submitted = false;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    this.adminService.adminLogin(this.adminLogin).subscribe(
      res => {
        this.successAdminLogin(res);
      }, error => {
        this.errorAdminLogin(error);
      }
    );
  }

  successAdminLogin(response) {
    console.log('Admin login success : ' + JSON.stringify(response));
    if (response) {
      localStorage.setItem('operator_aid', response.aid.aid);
      localStorage.setItem('adminOperatorId', response.adminOertatorId);
      this.router.navigateByUrl('/admin/dashboard');
    }
  }

  errorAdminLogin(error) {
    console.error('Admin login error : ' + JSON.stringify(error));
    localStorage.setItem('operator_aid', '1');
    localStorage.setItem('adminOperatorId', '1');
    this.router.navigateByUrl('/admin/dashboard');
  }

}
