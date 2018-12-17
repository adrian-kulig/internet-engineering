import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {OfferService} from "../services/offer/offer.service";
import {User} from "../models/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private UserService: any;


  constructor(private userService: UserService) {
  }

  loginUrl: string;
  user : User;

  ngOnInit() {
    this.userService.loginAction()
      .subscribe(data => {
        this.loginUrl = data[0].url;
      })


    this.userService.detailAction()
      .subscribe(data => {
        this.user = data.user
      })

  }

}
