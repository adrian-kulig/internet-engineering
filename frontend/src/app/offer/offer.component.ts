import {Component, OnInit, Input} from '@angular/core';
import {OfferService} from '../services/offer/offer.service';
import {Offer} from '../models/offer';
import { User } from '../models/user';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferComponent implements OnInit {

  // user: string = sessionStorage.getItem('user');
  offer: Offer = null;
  public newOffer: Offer = new Offer();
  offerList: Offer[];

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {
    this.offerService.getOffersList().subscribe(
      data => this.offerList = data,
    );
  }

  createOfferAction(offer: Offer) {
    this.offerService.createOffer(offer).subscribe(
      offer => this.offer = offer
    )
  }

  onSubmit() {
    this.createOfferAction(this.newOffer);
  }

  log(x) {
    console.log(x);
  }
}
