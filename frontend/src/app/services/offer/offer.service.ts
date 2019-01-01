import { Observable, Subject } from 'rxjs';
import { Consts } from '../../consts/consts';
import { Offer } from '../../models/offer';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';


@Injectable()
export class OfferService {

  offer: Subject<Offer | null>;


  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  createOffer(offer: Offer): Observable<Offer> {
    return this.http.post<Offer>(Consts.Api.ROOT + Consts.Offer.CREATE_URL, offer, AuthService.authorizationHeaders);
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
