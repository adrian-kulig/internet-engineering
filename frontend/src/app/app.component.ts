import {Component} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {OfferService} from './services/offer/offer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  offers;

  constructor(private authService: AuthService,
              private offerService: OfferService) {
  }

  getOffers(){
   this.offerService.getOffers();
  }

}
