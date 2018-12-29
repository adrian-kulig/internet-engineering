import {AppComponent} from './app.component';
import {OfferService} from './services/offer/offer.service';
import {AccountBalanceService} from './services/account/account-balance.service';
import {AuthService} from './services/auth/auth.service';
import {UserService} from "./services/user/user.service";
import {OfferComponent} from './offer/offer.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AuthService,
    AccountBalanceService,
    OfferService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
