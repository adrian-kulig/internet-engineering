import {Component} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {AccountBalanceService} from './services/account/account-balance.service';
import {OfferService} from './services/offer/offer.service';
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  email = 'max@gmail.com';
  password = '1234';
  user_email = '';
  user_name ='';
  user_password = '';
  loggedIn;
  accountBalance;
  offers;
  userList;


  constructor(private authService: AuthService,
              private balanceService: AccountBalanceService,
              private userService: UserService,
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
    this.userService.userList.subscribe(users =>{
      this.userList = users;
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

  getUsers(){
    this.userService.getUserList();
  }

  registerAction(){
    this.authService.registerAction(this.user_name, this.user_email, this.user_password);
  }

}
