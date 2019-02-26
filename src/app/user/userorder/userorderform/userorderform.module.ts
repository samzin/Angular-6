import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

import { UserorderformRoutingModule } from './userorderform-routing.module';
import { UserorderformComponent } from './userorderform.component';
//MaMatrial design
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [UserorderformComponent, UserorderformComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,

    UserorderformRoutingModule
  ]
})
export class UserorderformModule {

}
