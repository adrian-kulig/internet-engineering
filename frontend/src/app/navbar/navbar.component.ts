import { Component, OnInit } from '@angular/core';
import { Consts } from '../consts/consts';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  consts = Consts;

  constructor() { }

  ngOnInit() {
  }

}
