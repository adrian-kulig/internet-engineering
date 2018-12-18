import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OfferComponent } from './offer/offer.component';


import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth/auth.service';
import {OfferService} from './services/offer/offer.service';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AccountBalanceService} from './services/account/account-balance.service';


@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
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
    OfferService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
