import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CreateOperatorComponent } from './create-operator/create-operator.component';
import {RouterModule, Routes} from '@angular/router';
import { UserOrderDetailsComponent } from './admin-dashboard/user-order-details/user-order-details.component';
import { OperatorListComponent } from './operator-list/operator-list.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
const adminRoutes: Routes = [
  {
    path: 'admlogin',
    redirectTo: '/admlogin'
  },
  {
    path : 'admlogin',
    component : AdminLoginComponent
  },
  { path: 'admin', component: AdminComponent,
    children : [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'operators', component: OperatorListComponent },
      { path: 'user-order-details/:billNo/:uid', component: UserOrderDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(adminRoutes),
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    AdminLoginComponent,
    CreateOperatorComponent,
    UserOrderDetailsComponent,
    OperatorListComponent,
    AdminHeaderComponent
  ]
})
export class AdminModule { }
