import {Component, OnInit, Input} from '@angular/core';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import {User} from '../../models/user';
import * as $ from 'jquery';
import {Consts} from "../../consts/consts";

@Component({
  selector: 'app-offer',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})


export class OfferListComponent implements OnInit {
  consts = Consts;
  offerList: Offer[];

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {
    this.offerService.getOffersList().subscribe(
      data => this.offerList = data,
    );

    this.onFilteredTable();
  }


  onFilteredTable() {
    $("#myInput").on("keyup", function () {
      let value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  }


}
