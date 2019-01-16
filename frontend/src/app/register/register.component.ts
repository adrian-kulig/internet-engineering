import {Component, OnInit} from '@angular/core';
import {User} from '../models/user';
import {AuthService} from '../services/auth/auth.service';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.authService.loggedIn.subscribe(loggedIn => {

      if (loggedIn) {
        this.router.navigate(['/']).then(() => {
          this.toastr.error('Jesteś zalogowany.');
        })
      }
    });
  }

  ngOnInit() {
  }

  registerAction() {
    this.authService.registerAction(this.user.name, this.user.email, this.user.password);
  }

}
