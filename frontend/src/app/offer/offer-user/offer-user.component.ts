import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {OfferService} from '../../services/offer/offer.service';
import {Offer} from '../../models/offer';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-offers',
  templateUrl: './offer-user.component.html',
  styleUrls: ['./offer-user.component.css']
})

export class OfferUserComponent implements OnInit {

  offerList: Offer[];
  id: string;
  @Input() public offerID;

  constructor(private offerService: OfferService, private route: ActivatedRoute, private toastr: ToastrService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });


    this.offerService.getUserOffers(this.id).subscribe(
      data => this.offerList = data,
    );
  }

  onDeleteOffer(offerID) {
    if (confirm("Czy na pewno chcesz usunąć ofertę?")) {
      this.offerService.deleteOffer(offerID).subscribe((resp: any) => {
          this.toastr.success('Oferta została usunięta');
          this.ngOnInit();
        },
        (errorResp) => {
          this.toastr.error('Nie udało się usunąc oferty');
        })
    }
  }

}
