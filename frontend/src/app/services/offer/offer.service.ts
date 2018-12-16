import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consts } from '../../consts/consts';
import { Offer } from '../../models/offer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  createOffer(offer: Offer): Observable<any> {
    return this.http.post(Consts.Api.ROOT + Consts.Offer.OFFERS, offer);
  }

  getOffers(): Observable<Offer[]> {
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
