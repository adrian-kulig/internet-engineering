import { Component, OnInit } from '@angular/core';
import { Consts } from '../consts/consts';
import { AuthService } from '../services/auth/auth.service';
import { Subject, Observable } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  consts = Consts;
  loggedUser: any;
  id: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.loggedUser = (AuthService.SessionStorageManager.getValue('user')) ? AuthService.SessionStorageManager.getValue('user') : null;
    console.log(this.loggedUser);

  }

}
