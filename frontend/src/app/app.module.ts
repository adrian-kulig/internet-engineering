import {AppComponent} from './app.component';
import {OfferService} from './services/offer/offer.service';
import {AuthService} from './services/auth/auth.service';
import {UserService} from "./services/user/user.service";
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {NotfoundComponent} from './notfound/notfound.component';
import {UserComponent} from './user/user.component';
import {CustomButtonComponent} from './custom-components/custom-button/custom-button.component';
import {OfferItemComponent} from "./offer/offer-item/offer-item.component";
import {OfferCreateComponent} from "./offer/offer-create/offer-create.component";
import {OfferListComponent} from "./offer/offer-list/offer-list.component";
import {OfferUserComponent} from "./offer/offer-user/offer-user.component";
import {OfferEditComponent} from "./offer/offer-edit/offer-edit.component";
import {TruncatePipe} from "./helpers/truncate-pipe";
import {OfferHelperService} from "./utils/offer-helper.service";
import {CommentService} from './services/comment/comment.service';
import {CommentOfferComponent} from './comment/comment-offer/comment-offer.component';
import {CommentEditComponent} from './comment/comment-edit/comment-edit.component';
import {CommentCreateComponent} from './comment/comment-create/comment-create.component';
import {CommentHelperService} from './utils/comment-helper.service';
import {TimeAgoPipe} from "time-ago-pipe";
import {CommonHelper} from "./utils/common";


//TODO naprawić to chujostwo, zeby nie wyrzucało błedów
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {Consts} from "./consts/consts";
import {ChatComponent} from './chat/chat.component';
import {ChatService} from "./services/chat/chat.service";

const config: SocketIoConfig = {url: Consts.Server.HOST, options: {}};


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NotfoundComponent,
    UserComponent,
    OfferListComponent,
    OfferItemComponent,
    OfferCreateComponent,
    OfferUserComponent,
    OfferEditComponent,
    CustomButtonComponent,
    RegisterComponent,
    TruncatePipe,
    CommentCreateComponent,
    CommentOfferComponent,
    CommentEditComponent,
    TimeAgoPipe,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    SocketIoModule.forRoot(config)

  ],
  providers: [
    AuthService,
    OfferService,
    UserService,
    ChatService,
    OfferHelperService,
    CommentService,
    CommentHelperService,
    CommonHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
