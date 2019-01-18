import {Component, OnInit, Input} from '@angular/core';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import {User} from '../../models/user';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Consts} from "../../consts/consts";
import {OfferHelperService} from "../../utils/offer-helper.service";
import {CommonHelper} from "../../utils/common";

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})

export class OfferEditComponent implements OnInit {

  consts = Consts;
  id: string = null;
  offer: Offer = null;


  constructor(private offerService: OfferService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private offerServiceHelper: OfferHelperService,
              private commonHelper: CommonHelper,
  ) {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    if (!AuthService.SessionStorageManager.getValue('user')) {
      this.offerServiceHelper.redirect('/','error','Musisz być zalogowany');
      return false;
    }
    this.offerService.getOfferById(this.id).subscribe(
      data => {

        if (data.user && data.user.id == AuthService.getLoggedInUser().id) {
          this.offer = data
        } else {
          this.offerServiceHelper.redirect('/offers', 'error', 'Nie możesz edytować tej oferty.');
        }
      }
    );

  }


  editOfferAction(offer: Offer) {
    this.offerService.editOffer(this.id, offer).subscribe((resp: any) => {
      this.commonHelper.redirect(Consts.Offer.URL + '/' + offer.id, 'success','Oferta została zapisana poprawnie');
      },
      (errorResp) => {
        this.toastr.error(errorResp.error.errorMessage ? errorResp.error.errorMessage : 'Coś poszło nie tak.')
      })
  }


  onSubmit() {
    this.editOfferAction(this.offer);
  }

}
