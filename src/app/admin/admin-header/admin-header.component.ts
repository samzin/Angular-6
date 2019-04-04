import { Component } from '@angular/core';
import {Router} from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})

export class AdminHeaderComponent {

  appName = 'CIF Admin Panel';
  constructor(private router: Router) { }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/admlogin');
  }

  hideMenu() {
    if ($('#demo').hasClass('in')) {
      $('#demo').removeClass('in');
    }
  }
}
