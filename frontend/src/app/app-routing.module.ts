import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {NotfoundComponent} from './notfound/notfound.component';
import {HomeComponent} from './home/home.component';
import {OfferComponent} from './offer/offer.component';
import {UserComponent} from "./user/user.component";

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
