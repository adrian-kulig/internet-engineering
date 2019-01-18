import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import {ToastrService} from "ngx-toastr";
import {OfferHelperService} from "../../utils/offer-helper.service";
import {subscribeToResult} from "rxjs/util/subscribeToResult";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-user-offers',
  templateUrl: './offer-user.component.html',
  styleUrls: ['./offer-user.component.css']
})

export class OfferUserComponent implements OnInit{
  loggedUser = AuthService.getLoggedInUser();
  offerList: Offer[];
  id: string;
  @Input() public offerID;

  constructor(private offerService: OfferService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private offerServiceHelper: OfferHelperService,

  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });


    this.offerService.getUserOffers(this.id).subscribe(
      data => this.offerList = data,
    );
  }

  onDeleteOffer(offerID) {
    this.offerServiceHelper.onDeleteOffer(offerID);
    this.ngOnInit();
  }



}
