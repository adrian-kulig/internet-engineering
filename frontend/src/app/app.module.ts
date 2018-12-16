import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OfferComponent } from './offer/offer.component';
import { UserComponent } from './user/user.component';
import { AppRoutingModule } from './app-routing.module';
import { OfferService } from './services/offer/offer.service';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    UserComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    OfferService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
