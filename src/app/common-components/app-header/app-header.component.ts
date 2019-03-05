import {Component} from '@angular/core';
import {CIFConstants} from '../../shared/Constants';

@Component({
  selector : 'app-header',
  templateUrl : 'app-header.component.html',
  styleUrls : ['app-header.component.css']
})

export class AppHeaderComponent {

  appName = CIFConstants.APP_NAME;

  constructor() {

  }

}
