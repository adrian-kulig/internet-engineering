import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {

  @Input() isLoggedIn: boolean;

  constructor() { }

  ngOnInit() {
  }

}
