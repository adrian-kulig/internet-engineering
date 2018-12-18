import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import { Consts } from '../../consts/consts';
import { Offer } from '../../models/offer';
import { map } from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";


export class OfferService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.getOffers();
  }

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
