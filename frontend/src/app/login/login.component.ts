import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  user: User = new User();

  constructor(private authService: AuthService,) {
    this.authService.loggedIn.subscribe(loggedIn => {
      this.user.loggedIn = loggedIn;
    });
  }

  doLogin() {
    this.authService.doLogin(this.user.email, this.user.password, window.location.href);
  }

  doLogout() {
    this.authService.logout();
  }

  onSubmit() {
    this.doLogin();
  }
}
