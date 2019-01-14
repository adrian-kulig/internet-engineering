import {AppComponent} from './app.component';
import {OfferService} from './services/offer/offer.service';
import {AuthService} from './services/auth/auth.service';
import {UserService} from "./services/user/user.service";
import {OfferComponent} from './offer/offer.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {NotfoundComponent} from './notfound/notfound.component';
import {UserComponent} from './user/user.component';
import { CustomButtonComponent } from './custom-components/custom-button/custom-button.component';


@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NotfoundComponent,
    UserComponent,
    CustomButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    OfferService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
