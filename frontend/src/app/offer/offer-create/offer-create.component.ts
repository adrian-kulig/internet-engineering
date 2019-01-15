import {Component, OnInit, Input} from '@angular/core';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import { User } from '../../models/user';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.css']
})

export class OfferCreateComponent implements OnInit {

  offer: Offer = null;
  public newOffer: Offer = new Offer();

  constructor(private offerService: OfferService, private toastr: ToastrService) {
  }

  ngOnInit() {}

  createOfferAction(offer: Offer) {
    this.offerService.createOffer(offer).subscribe((resp: any) => {
        this.toastr.success('Oferta została zapisana poprawnie');
      },
      (errorResp) => {
        console.log(errorResp);
        this.toastr.error(errorResp.error.errorMessage ? errorResp.error.errorMessage : 'Coś poszło nie tak.')
      })

  }


  onSubmit() {
    this.createOfferAction(this.newOffer);
  }

}
