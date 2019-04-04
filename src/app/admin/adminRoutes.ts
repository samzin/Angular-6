import {Routes} from '@angular/router';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminComponent} from './admin.component';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {OperatorListComponent} from './operator-list/operator-list.component';
import {UserOrderDetailsComponent} from './admin-dashboard/user-order-details/user-order-details.component';

export const adminRoutes: Routes = [
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
