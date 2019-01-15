import {Component, OnInit, Input} from '@angular/core';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import { User } from '../../models/user';

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.css']
})

export class OfferCreateComponent implements OnInit {

  user: string = sessionStorage.getItem('user');
  offer: Offer = null;
  public newOffer: Offer = new Offer();

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {}

  createOfferAction(offer: Offer) {
    console.log(this.user);
    this.offerService.createOffer(offer).subscribe(
      offer => this.offer = offer
    )
  }

  onSubmit() {
    this.createOfferAction(this.newOffer);
  }

}
