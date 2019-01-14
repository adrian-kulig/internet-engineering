import { Offer } from './offer';

export class User {
  email: string;
  password: string;
  name: string;
  lastName: string;
  loggedIn: boolean;
  offer: Offer[];
}
