import {Component, OnInit, Input} from '@angular/core';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import {User} from '../../models/user';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {Consts} from "../../consts/consts";

@Component({
  selector: 'app-offer-create',
  templateUrl: './offer-create.component.html',
  styleUrls: ['./offer-create.component.css']
})

export class OfferCreateComponent implements OnInit {

  offer: Offer = null;

  public newOffer: Offer = new Offer();

  constructor(private offerService: OfferService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    if (!AuthService.SessionStorageManager.getValue('user')) {
      this.router.navigate(['/offers']).then(() => {
        this.toastr.error('Musisz być zalogowany.');
      })
    }
  }


  createOfferAction(offer: Offer) {
    this.offerService.createOffer(offer).subscribe((resp: any) => {
        this.router.navigate([Consts.Offer.URL+'/user/'+AuthService.SessionStorageManager.getValue('user').id]).then(() => {
          this.toastr.success('Oferta została zapisana poprawnie');
        })
      },
      (errorResp) => {
        this.toastr.error(errorResp.error.errorMessage ? errorResp.error.errorMessage : 'Coś poszło nie tak.')
      })

  }


  onSubmit() {
    this.createOfferAction(this.newOffer);
  }

}
