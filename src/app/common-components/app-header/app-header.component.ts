import {Component, OnInit} from '@angular/core';
import {CIFConstants} from '../../shared/Constants';
import {Router} from '@angular/router';
import {WebSocketService} from '../../common-services/WebSocket.service';
declare let $: any;

@Component({
  selector : 'app-header',
  templateUrl : 'app-header.component.html',
  styleUrls : ['app-header.component.css']
})

export class AppHeaderComponent implements OnInit {

  appName = CIFConstants.APP_NAME;

  constructor(private router: Router, private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.webSocketService.listenFromServer();
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  hideMenu() {
    if ($('#demo').hasClass('in')) {
      $('#demo').removeClass('in');
    }
  }

}
