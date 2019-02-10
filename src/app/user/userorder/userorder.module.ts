import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserorderRoutingModule } from './userorder-routing.module';
import { UserorderComponent } from './userorder.component';
//MaMatrial design
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [UserorderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
   MatIconModule,
    MatSidenavModule,
   MatToolbarModule,
    UserorderRoutingModule
  ]
})
export class UserorderModule { 
  
}
