import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {NotfoundComponent} from './notfound/notfound.component';
import {HomeComponent} from './home/home.component';
import {OfferComponent} from './offer/offer.component';
import {UserComponent} from "./user/user.component";
import {OfferItemComponent} from "./offer/offer-item/offer-item.component";
import {OfferCreateComponent} from "./offer/offer-create/offer-create.component";


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
    component: OfferComponent,
  },
  {
    path: 'offers/create',
    component: OfferCreateComponent,
  },

  // {
  //   path: 'offer-edit/:id',
  //   component: OfferComponent,
  // },

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
