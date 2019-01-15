import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {NotfoundComponent} from './notfound/notfound.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from "./user/user.component";
import {OfferItemComponent} from "./offer/offer-item/offer-item.component";
import {OfferCreateComponent} from "./offer/offer-create/offer-create.component";
import {OfferListComponent} from "./offer/offer-list/offer-list.component";


const routes: Route[] = [
  {
    path: '',
    component: HomeComponent
  },

  /**
   * OFERTY
   */
  {
    path: 'offers',
    component: OfferListComponent,
  },
  {
    path: 'offers/create',
    component: OfferCreateComponent,
  },
  {
    path: 'offers/:id',
    component: OfferItemComponent,
  },

  /**
   * UŻYTKOWNICY
   */
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
