import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CreateOperatorComponent } from './create-operator/create-operator.component';
import {RouterModule, Routes} from '@angular/router';
import { UserOrderDetailsComponent } from './admin-dashboard/user-order-details/user-order-details.component';
const adminRoutes: Routes = [
  {
    path: 'admin',
    redirectTo: 'admin/login'
  },
  { path: 'admin', component: AdminComponent,
    children : [
      { path: 'login', component: AdminLoginComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'user-order-details/:billNo', component: UserOrderDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forRoot(adminRoutes),
  ],
  declarations: [AdminComponent, AdminDashboardComponent, AdminLoginComponent, CreateOperatorComponent, UserOrderDetailsComponent]
})
export class AdminModule { }
