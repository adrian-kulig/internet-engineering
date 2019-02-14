import {Component, Injectable, OnInit} from '@angular/core';
import {ChatService} from "../services/chat/chat.service";
import {HttpClient} from "@angular/common/http";
import {Consts} from "../consts/consts";


@Injectable()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public newMessage = '';
  message: string;
  messages: string[] = [];


  constructor(private chatService: ChatService, private http: HttpClient) {
  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }


  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
