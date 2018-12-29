import {Component} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {OfferService} from './services/offer/offer.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user: User = new User();
  offers;


  constructor(private authService: AuthService,
              private offerService: OfferService) {
  }

  getOffers(){
   this.offerService.getOffers();
  }

  registerAction(){
    this.authService.registerAction(this.user.name, this.user.email, this.user.password);
  }

}
