import {Component, OnInit, Input} from '@angular/core';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import {User} from '../../models/user';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Consts} from "../../consts/consts";

@Component({
  selector: 'app-offer-edit',
  templateUrl: './offer-edit.component.html',
  styleUrls: ['./offer-edit.component.css']
})

export class OfferEditComponent implements OnInit {

  id: string = null;
  offer: Offer = null;


  constructor(private offerService: OfferService, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }

  ngOnInit() {
    if (!AuthService.SessionStorageManager.getValue('user')) {
      this.throwError('Musisz być zalogowany');
      return false;
    }
    this.offerService.getOfferById(this.id).subscribe(
      data => {

        if (data.user && data.user.id == AuthService.SessionStorageManager.getValue('user').id) {
          this.offer = data
        } else {
          this.throwError('Nie możesz edytować tej oferty.');
        }
      }
    );

  }


  editOfferAction(offer: Offer) {
    this.offerService.editOffer(this.id, offer).subscribe((resp: any) => {
        // this.router.navigate([Consts.Offer.URL + '/user/' + AuthService.SessionStorageManager.getValue('user').id]).then(() => {
          this.toastr.success('Oferta została zapisana poprawnie');
        // })
      },
      (errorResp) => {
        this.toastr.error(errorResp.error.errorMessage ? errorResp.error.errorMessage : 'Coś poszło nie tak.')
      })
  }

  throwError(meesage) {
    this.router.navigate(['/offers']).then(() => {
      this.toastr.error(meesage);
    });
    return false;
  }


  onSubmit() {
    this.editOfferAction(this.offer);
  }

}
