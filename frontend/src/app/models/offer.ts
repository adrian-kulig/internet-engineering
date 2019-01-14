import { Timestamp } from "rxjs";
import { User } from './user';

export class Offer {
  name: String;
  location: String;
  description: String;
  user: User;
  timestamp: Date;

  constructor() {
    this.name = ""
    this.location = ""
    this.description = ""
    this.timestamp = new Date();
  }
}
