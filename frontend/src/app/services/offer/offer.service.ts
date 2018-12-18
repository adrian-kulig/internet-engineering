import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { Consts } from '../../consts/consts';
import { Offer } from '../../models/offer';
import { map } from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs/Subject';
import {ToastrService} from 'ngx-toastr';



// interface Offer {
//   Offer: object
// }
@Injectable()
export class OfferService {

  offer: Subject<Offer | null>;

  getOffers() {
    const req = this.http.get(environment.apiUrl + '/offers', {
      withCredentials: true
    });
    req.subscribe((offer: Offer) => {
      this.offer.next(offer);
    }, errorResp => {
      if (errorResp.status === 403) {
        // TODO: redirect to login
      }
      this.toastr.error(errorResp.error && errorResp.error.errorMessage ?
        errorResp.error.errorMessage :  'Oops, something went wrong.');
    });
  }

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastr: ToastrService) {
    this.offer = new Subject();
    this.authService.loggedIn.subscribe(() => {
      this.offer.next(null);
    });
  }

  createOffer(offer: Offer): Observable<any> {
    return this.http.post(Consts.Api.ROOT + Consts.Offer.OFFERS, offer);
  }

  getOffersA(): Observable<Offer[]> {
    return this.http.get<Offer[]>(Consts.Api.ROOT + Consts.Offer.OFFERS);
  }

  getOfferById(id: string): Observable<any> {
    return this.http.get(Consts.Offer.OFFERS + "/" + id);
  }

  editOffer(offer: Offer) {
    return this.http.put(Consts.Offer.OFFERS, offer);
  }

  deleteOffer(id: string): any {
    return this.http.delete(Consts.Offer + "/" + id);
  }

}
