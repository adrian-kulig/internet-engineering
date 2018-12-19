import {Component} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {AccountBalanceService} from './services/account/account-balance.service';
import {OfferService} from './services/offer/offer.service';
import {UserService} from "./services/user/user.service";
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // email = 'max@gmail.com';
  // password = '1234';
  // user_email = '';
  // user_name ='';
  // user_password = '';
  // loggedIn;
  user: User;
  accountBalance;
  offers;
  userList;


  constructor(private authService: AuthService,
              private balanceService: AccountBalanceService,
              private userService: UserService,
              private offerService: OfferService) {
    this.authService.loggedIn.subscribe(loggedIn => {
      this.user.loggedIn = loggedIn;
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
    this.authService.doLogin(this.user.email, this.user.password);
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
    this.authService.registerAction(this.user.name, this.user.email, this.user.password);
  }

}
