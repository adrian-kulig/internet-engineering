import {Component} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {AccountBalanceService} from './services/account/account-balance.service';
import {OfferService} from './services/offer/offer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  email = 'max@gmail.com';
  password = '1234';
  loggedIn;
  accountBalance;
  offers;


  constructor(private authService: AuthService,
              private balanceService: AccountBalanceService,
              private offerService: OfferService) {
    this.authService.loggedIn.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.balanceService.accountBalance.subscribe(balance => {
      this.accountBalance = balance;
    });
    this.offerService.offer.subscribe(offers =>{
      this.offers = offers;
    })
  }

  doLogin() {
    this.authService.doLogin(this.email, this.password);
  }

  doLogout() {
    this.authService.logout();
  }

  getBalance() {
    this.balanceService.getAccountBalance();
  }

  getOffers(){
   this.offerService.getOffers();
  }

}
