import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import {NotfoundComponent} from './notfound/notfound.component';
import {HomeComponent} from './home/home.component';
import {UserComponent} from "./user/user.component";
import {OfferItemComponent} from "./offer/offer-item/offer-item.component";
import {OfferCreateComponent} from "./offer/offer-create/offer-create.component";
import {OfferListComponent} from "./offer/offer-list/offer-list.component";
import {OfferUserComponent} from "./offer/offer-user/offer-user.component";
import {OfferEditComponent} from "./offer/offer-edit/offer-edit.component";
import {RegisterComponent} from "./register/register.component";


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
    path: 'offers/edit/:id',
    component: OfferEditComponent,
  },
  {
    path: 'offers/user/:id',
    component: OfferUserComponent,
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

  /**
   * REJESTRACJA
   */
  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: '**',
    component: NotfoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
