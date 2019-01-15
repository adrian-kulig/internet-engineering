import { Offer } from './offer';

export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  loggedIn: boolean;
  offer: Offer[];
}
