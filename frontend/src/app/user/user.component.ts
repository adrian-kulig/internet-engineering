import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {User} from "../models/user";
import { OfferService } from '../services/offer/offer.service';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  userList: User[];

  ngOnInit() {
    // this.userService.getUserList();
    this.userService.getUsersList().subscribe(
      data => this.userList = data
    );
  }
}
