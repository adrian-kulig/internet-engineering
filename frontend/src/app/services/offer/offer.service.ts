import {Observable, Subject} from 'rxjs';
import {Consts} from '../../consts/consts';
import {Offer} from '../../models/offer';
import {AuthService} from '../auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class OfferService {

  offer: Subject<Offer | null>;

  constructor(private http: HttpClient) {
  }

  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(Consts.Api.ROOT + Consts.Offer.CREATE_URL, offer, AuthService.authorizationHeaders);
  }

  getOffersList(): Observable<Offer[]> {
    return this.http.get<Offer[]>(Consts.Api.ROOT + Consts.Offer.URL, AuthService.authorizationHeaders);
  }

  getOfferById(id: string): Observable<Offer> {
    return this.http.get<Offer>(Consts.Api.ROOT + Consts.Offer.URL + "/" + id);
  }

  getUserOffers(id): Observable<Offer[]> {
    return this.http.get<Offer[]>(Consts.Api.ROOT + Consts.Offer.USER_OFFER_LIST + '/' + id, AuthService.authorizationHeaders);
  }

  editOffer(id: string, offer: Offer): Observable<Offer> {
    return this.http.put<Offer>(Consts.Api.ROOT + Consts.Offer.EDIT_URL + '/' + id, offer, AuthService.authorizationHeaders);
  }

  deleteOffer(id: string): Observable<Offer> {
    return this.http.delete<Offer>(Consts.Api.ROOT + Consts.Offer.URL + '/' + id, AuthService.authorizationHeaders);
  }

}
