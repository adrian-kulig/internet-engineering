import { Timestamp } from "rxjs";
import { User } from './user';
import {AuthService} from "../services/auth/auth.service";


export class Offer {
  id: String
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
    this.user = AuthService.SessionStorageManager.getValue('user');
  }
}
