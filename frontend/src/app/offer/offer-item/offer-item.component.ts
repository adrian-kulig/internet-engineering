import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import { User } from '../../models/user';

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})

export class OfferItemComponent implements OnInit {

  // user: string = sessionStorage.getItem('user');
  offer: Offer = null;
  id : string;

  constructor(private offerService: OfferService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id; // --> Name must match wanted parameter
    });


    this.offerService.getOfferById(this.id).subscribe(
      data => this.offer = data,
    );
  }


}
