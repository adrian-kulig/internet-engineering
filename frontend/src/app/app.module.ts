import { AppComponent } from './app.component';
import { OfferService } from './services/offer/offer.service';
import { AccountBalanceService } from './services/account/account-balance.service';
import { AuthService } from './services/auth/auth.service';
import { OfferComponent } from './offer/offer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

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
