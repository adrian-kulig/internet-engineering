import { Timestamp } from "rxjs";
import { User } from './user';
import {AuthService} from "../services/auth/auth.service";


export class Message {
  id: String;
  content: String;
  user: User;
  timestamp: Date;
  createdAt: Date;

  constructor() {
    this.content = "";
    this.timestamp = new Date();
    this.user = AuthService.SessionStorageManager.getValue('user');
  }
}
