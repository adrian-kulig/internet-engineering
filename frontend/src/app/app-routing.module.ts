import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { OfferComponent } from './offer/offer.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'oauth',
    component: UserComponent
  },
  {
    path: 'offers',
    component: OfferComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents = [UserComponent, OfferComponent]
