import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from 'src/app/models/user';
import {Consts} from 'src/app/consts/consts';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  createUser(user: User): Observable<any> {
    return this.http.post(Consts.Api.ROOT + Consts.User.USERS, user);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(Consts.Api.ROOT + Consts.User.USERS + "/" + id);
  }

  updateUser(user: User) {
    return this.http.put(Consts.Api.ROOT + Consts.User.USERS, user);
  }

  loginAction() {
    return this.http.get<string>(Consts.Api.ROOT + Consts.Oauth.OAUTH);
  }

  detailAction(){
    return this.http.get<User>(Consts.Api.ROOT + Consts.Oauth.OAUTH + "/details");

  }


}
