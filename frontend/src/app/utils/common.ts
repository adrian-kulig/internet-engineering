import {Injectable} from "@angular/core";
import {Consts} from '../consts/consts';
import {Offer} from '../models/offer';
import {OfferService} from "../services/offer/offer.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../services/auth/auth.service";
import {HttpClientModule} from "@angular/common/http";


@Injectable()
export class CommonHelper {
  constructor(private offerService: OfferService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private http: HttpClientModule) {
  }


  public redirect(route, type = 'success', message = null) {
    this.router.navigate([route]).then(() => {
      if (message) {
        if (type == 'error') {
          this.toastr.error(message);
        } else {
          this.toastr.success(message);
        }
      }
    })
  }

}
