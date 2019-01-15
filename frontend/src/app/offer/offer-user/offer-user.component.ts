import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-offers',
  templateUrl: './offer-user.component.html',
  styleUrls: ['./offer-user.component.css']
})

export class OfferUserComponent implements OnInit {

  offerList: Offer[];
  id : string;

  constructor(private offerService: OfferService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id; // --> Name must match wanted parameter
    });


    this.offerService.getUserOffers(this.id).subscribe(
      data => this.offerList = data,
    );
  }


}
