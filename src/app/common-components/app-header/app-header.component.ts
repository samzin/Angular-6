import {Component} from '@angular/core';
import {CIFConstants} from '../../shared/Constants';
import {Router} from '@angular/router';

@Component({
  selector : 'app-header',
  templateUrl : 'app-header.component.html',
  styleUrls : ['app-header.component.css']
})

export class AppHeaderComponent {

  appName = CIFConstants.APP_NAME;

  constructor(private router: Router) {
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

}
