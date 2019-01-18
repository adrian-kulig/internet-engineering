import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user/user.service";
import {User} from "../models/user";
import { OfferService } from '../services/offer/offer.service';
import { Offer } from '../models/offer';
import { AuthService } from '../services/auth/auth.service';
import { OfferHelperService } from '../utils/offer-helper.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private offerServiceHelper: OfferHelperService) {
  }

  userList: User[];

  ngOnInit() {

    if (!AuthService.getLoggedInUser()) {
      this.offerServiceHelper.redirect('/', 'error', 'Musisz być zalogowany');
    }

    // this.userService.getUserList();
    this.userService.getUsersList().subscribe(
      data => this.userList = data
    );
  }
}
