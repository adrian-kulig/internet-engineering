import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../consts/consts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get(Consts.Api.ROOT + "/login");
  }

}
