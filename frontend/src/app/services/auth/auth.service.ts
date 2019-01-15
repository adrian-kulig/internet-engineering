import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Subject} from 'rxjs/Subject';
import {Consts} from "../../consts/consts";

@Injectable()
export class AuthService {

  loggedIn: Subject<boolean>;

  static SessionStorageManager: any = {
    setValue: function (key, value) {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    removeKey: function (key) {
      window.sessionStorage.removeItem(key);
    },
    getValue: function (key) {
      try {
        return JSON.parse(window.sessionStorage.getItem(key));
      } catch (e) {
      }
    }
  };

  public static authorizationHeaders = {
    withCredentials: true,
    headers: {
      Authorization: 'Bearer ' + AuthService.SessionStorageManager.getValue('token')
    }
  };


  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.loggedIn = new Subject();
    //TODO DAMIAN/ADRIAN
    //podczas testow, przy automatycznym renderowaniu frontendu, zmienna LoggedIn usuwa sie i z constructora jest false, a w sesji w przegladarce zostaje user i token
    // trzeba zrobic, aby loggedIn było ustawiane na podstawie sesji ? nie wiem jak bezpieczniej jest.  Lub usuwanie sesji w contructorze, tylko nie wiem czy tak powinno sie robic
    // if(AuthService.SessionStorageManager.getValue('user')){
    // }

    this.getLogin();
  }

  doLogin(email: string, password: string, redirectUrl: string = '') {
    this.http.post(Consts.Api.ROOT + '/login', {
      email: email,
      password: password
    }, {
      withCredentials: true
    }).subscribe((resp: any) => {
      this.loggedIn.next(true);
      // zapisujemy token i usera do sesji na froncie
      AuthService.SessionStorageManager.setValue('token', resp.token);
      AuthService.SessionStorageManager.setValue('user', resp.user);
      window.location.href = redirectUrl;

      this.toastr.success(resp && resp.user && resp.user.name ? `Welcome ${resp.user.name}` : 'Logged in!');
    }, (errorResp) => {
      this.loggedIn.next(false);
      errorResp.error ? this.toastr.error(errorResp.error.errorMessage) : this.toastr.error('An unknown error has occured.');
    });
  }

  getLogin() {
    this.http.get(Consts.Api.ROOT + Consts.Oauth.LOGIN, {
      withCredentials: true // <=========== important!
    }).subscribe((resp: any) => {
      this.loggedIn.next(resp.loggedIn);
    }, (errorResp) => {
      AuthService.removeUserSession();
      this.toastr.error(errorResp.error.errorMessage ? errorResp.error.errorMessage : 'Coś poszło nie tak.')
    })
  }

  logout() {
    this.http.post(Consts.Api.ROOT + Consts.Oauth.LOGOUT, {}, {
      withCredentials: true
    }).subscribe(() => {
      AuthService.removeUserSession();
      this.toastr.success('Wylogowałeś się.')
      window.location.href = '';
      this.loggedIn.next(false);
    });
  }

  registerAction(name: string, email: string, password: string) {
    this.http.post(Consts.Api.ROOT + '/users', {
      name: name,
      email: email,
      password: password,
      role: ["user"]
    }, {
      withCredentials: true
    }).subscribe((resp: any) => {
      this.loggedIn.next(true);
      console.log(resp);
      //TODO pobrać token i zapisac go do sesji
      // this.toastr.success(resp && resp.user && resp.user.name ? `Welcome ${resp.user.name}` : 'Logged in!');
    }, (errorResp) => {
      this.loggedIn.next(false);
      errorResp.error ? this.toastr.error(errorResp.error.errorMessage, 'Wystąpiły błędy', {
        timeOut: 4000,
        progressBar: true,
        enableHtml: true
      }) : this.toastr.error('An unknown error has occured.');
    });
  }

  public static removeUserSession(){
    AuthService.SessionStorageManager.removeKey('token');
    AuthService.SessionStorageManager.removeKey('user');
  }

  public isUserLoggedIn() {
    return this.loggedIn;
  }
}
