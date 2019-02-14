import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable, of, Subject, Subscription } from 'rxjs';
import {Message} from "../../models/message";
import {HttpClient} from "@angular/common/http";
import * as io from 'socket.io-client';

import {Consts} from "../../consts/consts";
import {AuthService} from "../auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = Consts.Server.HOST;
  private socket;
  private user;
  constructor() {
    this.socket = io(this.url);
    this.user = AuthService.getLoggedInUser();
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message, this.user);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('new-message', (message) => {
        observer.next(message, this.user);
      });
    });
  }
}
