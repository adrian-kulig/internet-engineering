import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import {User} from '../../models/user';
import {Consts} from "../../consts/consts";
import {ToastrService} from "ngx-toastr";
import {OfferHelperService} from "../../utils/offer-helper.service";

@Component({
  selector: 'app-offer-item',
  templateUrl: './offer-item.component.html',
  styleUrls: ['./offer-item.component.css']
})

export class OfferItemComponent implements OnInit {

  offer: Offer = null;
  Consts = Consts;
  id: string;

  constructor(private offerService: OfferService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private offerServiceHelper: OfferHelperService,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id; // --> Name must match wanted parameter
    });


    this.offerService.getOfferById(this.id).subscribe(
      data => {
        this.offer = data
      },error => {
        this.offerServiceHelper.redirect('/');
      }
    );
  }

  onDeleteOffer(offerID) {
    this.offerServiceHelper.onDeleteOffer(offerID);
    this.ngOnInit();
  }

}
