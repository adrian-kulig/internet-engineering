import {Observable, Subject} from 'rxjs';
import { Consts } from '../../consts/consts';
import { Offer } from '../../models/offer';
import {AuthService} from '../auth/auth.service';

import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';



@Injectable()
export class OfferService {

  offer: Subject<Offer | null>;

  getOffers() {
    const req = this.http.get(Consts.Api.ROOT + Consts.Offer.URL, {
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
      this.getOffers();
    });
  }

  createOffer(offer: Offer): Observable<any> {
    return this.http.post(Consts.Api.ROOT + Consts.Offer.URL, offer);
  }

  getOffersList(): Observable<Offer[]> {
    return this.http.get<Offer[]>(Consts.Api.ROOT + Consts.Offer.URL, AuthService.authorizationHeaders);
  }

  getOfferById(id: string): Observable<any> {
    return this.http.get(Consts.Offer.URL + "/" + id);
  }

  editOffer(offer: Offer) {
    return this.http.put(Consts.Offer.URL, offer);
  }

  deleteOffer(id: string): any {
    return this.http.delete(Consts.Offer + "/" + id);
  }

}
