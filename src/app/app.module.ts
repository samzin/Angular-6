// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TagInputModule } from 'ngx-chips';
import {DashboardComponent} from './dashboard/dashboard.component';
import {OrderListComponent} from './dashboard/order-list/order-list.component';
import {AppHeaderComponent} from './common-components/app-header/app-header.component';
import {OrderHistoryComponent} from './dashboard/order-history/order-history.component';
import {WalletComponent} from './dashboard/wallet/wallet.component';
import {ToasterNotificationService} from './common-services/toaster-notification.service';
import {CheckOutComponent} from './dashboard/check-out/check-out.component';
import {AnalysisOrderFormComponent} from './dashboard/analysis-order/analysis-order-form/analysis-order-form.component';
import {AddAnalysisOrderComponent} from './dashboard/analysis-order/add-analysis-order/add-analysis-order.component';
import {EditAnalysisOrderComponent} from './dashboard/analysis-order/edit-analysis-order/edit-analysis-order.component';
import {WebSocketService} from './common-services/WebSocket.service';

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
    OrderListComponent,
    AppHeaderComponent,
    OrderHistoryComponent,
    WalletComponent,
    CheckOutComponent,
    AnalysisOrderFormComponent,
    AddAnalysisOrderComponent,
    EditAnalysisOrderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    TagInputModule,
    ReactiveFormsModule,
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
    ToasterNotificationService,
    WebSocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
