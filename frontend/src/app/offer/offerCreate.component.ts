import {Component, OnInit} from '@angular/core';
import {OfferService} from '../services/offer/offer.service';
import {Offer} from '../models/offer';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offerCreate.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferCreateComponent implements OnInit {

  offer: Offer = null;

  constructor(private offerService: OfferService) {
  }

  public newOffer: Offer = new Offer();
  offerList: Offer[];

  ngOnInit() {
    this.offerService.getOffersList().subscribe(
      data => this.offerList = data
    );
  }

  createOfferActon(offer: Offer) {
    this.offerService.createOffer(offer).subscribe(
      offer => this.offer = offer
    )
  }


}
