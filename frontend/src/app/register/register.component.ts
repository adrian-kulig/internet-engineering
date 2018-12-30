import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService) {
    this.authService.loggedIn.subscribe(loggedIn => {
      this.user.loggedIn = loggedIn;
    });
  }

  ngOnInit() {
  }

  registerAction(){
    this.authService.registerAction(this.user.name, this.user.email, this.user.password);
  }

}
