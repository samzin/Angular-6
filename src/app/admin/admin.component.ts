import { Component, OnInit } from '@angular/core';
import {WebSocketService} from '../common-services/WebSocket.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private websocketService: WebSocketService) { }

  ngOnInit() {
    this.websocketService.connect(63);
  }

}
