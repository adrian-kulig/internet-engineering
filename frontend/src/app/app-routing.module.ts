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
import { CommentCreateComponent } from "./comment/comment-create/comment-create.component";
import { CommentEditComponent } from "./comment/comment-edit/comment-edit.component";
import { CommentOfferComponent } from "./comment/comment-offer/comment-offer.component";


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
   * KOMENTARZE
   */
  {
    path: 'comments/create',
    component: CommentCreateComponent,
  },
  {
    path: 'comments/edit/:id',
    component: CommentEditComponent,
  },
  {
    path: 'comments/offer/:id',
    component: CommentOfferComponent,
  },

  /**
   * USERS
   */
  {
    path: 'users',
    component: UserComponent
  },

  /**
   * REGISTRATION
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
