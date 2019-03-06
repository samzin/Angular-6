// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserorderComponent } from './user/userorder/userorder.component';
import { UserorderformComponent } from './user/userorder/userorderform/userorderform.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

//Material section
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatListModule } from '@angular/material';
import { ToastrModule } from 'ng6-toastr-notifications';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OrderFormComponent} from './dashboard/order-form/order-form.component';
import {OrderListComponent} from './dashboard/order-list/order-list.component';
import {AppHeaderComponent} from './common-components/app-header/app-header.component';
import {OrderHistoryComponent} from './dashboard/order-history/order-history.component';
import {NewOrdersComponent} from './dashboard/new-orders/new-orders.component';
import {WalletComponent} from './dashboard/wallet/wallet.component';
import {ToasterNotificationService} from './common-services/toaster-notification.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    UserorderComponent,
    UserorderformComponent,
    DashboardComponent,
    OrderFormComponent,
    OrderListComponent,
    AppHeaderComponent,
    OrderHistoryComponent,
    NewOrdersComponent,
    WalletComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
    AuthGuard,
    UserService,
    ToasterNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
