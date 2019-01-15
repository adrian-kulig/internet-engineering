import {Component, OnInit, Input} from '@angular/core';
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
  // offer: Offer = null;

  // constructor(private offerService: OfferService) {
  // }

  ngOnInit() {
  //   this.offerService.getOfferById('5c0a1e43778d5d094a81a8ef').subscribe(
  //     data => this.offer = data,
  //   );
  }


}
