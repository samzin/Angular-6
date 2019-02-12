import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-userorder',
  templateUrl: './userorder.component.html',
  styleUrls: ['./userorder.component.css']
})
@NgModule({
  declarations: [UserorderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class UserorderComponent implements OnInit {

  breakpoint;
  rowHeight:String;
  constructor() { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
    this.rowHeight = (window.innerWidth <= 400) ?  "4:4" : "2:4";
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
    this.rowHeight = (event.target.innerWidth <= 400) ? "4:4" : "2:4";
  }
}


