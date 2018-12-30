import {Component, OnInit} from '@angular/core';
import {OfferService} from '../services/offer/offer.service';
import {Offer} from '../models/offer';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})

export class OfferComponent implements OnInit {

  constructor(private offerService: OfferService) {
  }

  public newOffer: Offer = new Offer();
  offerList: Offer[];
  test : string;

  ngOnInit() {
    this.offerService.getOffersA().subscribe(
      data => this.offerList = data
    );
  }


}
