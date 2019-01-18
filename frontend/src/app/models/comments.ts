import { Offer } from './offer';
import { OfferService } from '../services/offer/offer.service';
import { User } from './user';
import { AuthService } from '../services/auth/auth.service';

export class Comments {
  id: String;
  content: String;
  offer: Offer;
  user: User;
  timestamp: Date;
  createdAt: Date;

  constructor() {
    this.content = "";
    this.timestamp = new Date();
    this.offer = null;
    this.user = AuthService.SessionStorageManager.getValue('user');
  }
}
