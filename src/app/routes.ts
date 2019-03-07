import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserorderComponent } from './user/userorder/userorder.component';
import { UserorderformComponent } from './user/userorder/userorderform/userorderform.component';
import { AuthGuard } from './auth/auth.guard';
import {DashboardComponent} from './dashboard/dashboard.component';
import {NewOrdersComponent} from './dashboard/new-orders/new-orders.component';
import {OrderHistoryComponent} from './dashboard/order-history/order-history.component';
import {WalletComponent} from './dashboard/wallet/wallet.component';
import {OrderListComponent} from './dashboard/order-list/order-list.component';
import {CheckOutComponent} from './dashboard/check-out/check-out.component';

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]
    },
    {
        path: 'order', component: UserorderComponent
    },
    {
        path: 'orderform', component: UserorderformComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        {path: '', component: OrderListComponent},
        {path: 'new-orders', component: NewOrdersComponent},
        {path: 'order-history', component: OrderHistoryComponent},
        {path: 'wallet', component: WalletComponent},
        {path: 'checkout', component: CheckOutComponent}
      ]
    }
];
