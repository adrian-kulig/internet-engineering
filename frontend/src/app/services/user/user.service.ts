import {Observable, Subject} from 'rxjs';
import {Consts} from '../../consts/consts';
import {User} from '../../models/user';
import {AuthService} from '../auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class UserService {
  userList: Subject<User | null>;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastr: ToastrService) {
    this.userList = new Subject();
    this.authService.loggedIn.subscribe(() => {
      this.userList.next(null);
    });
  }

  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(Consts.Api.ROOT + Consts.User.URL, AuthService.authorizationHeaders);
  }


}
