import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {

  loggedIn: Subject<boolean>;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.loggedIn = new Subject();
    this.getLogin();
  }

  doLogin(email: string, password: string) {
    this.http.post(environment.apiUrl + '/login', {
      email: email,
      password: password
    }, {
      withCredentials: true
    }).subscribe((resp: any) => {
      this.loggedIn.next(true);
      //TODO pobrać token i zapisac go do sesji
      this.toastr.success(resp && resp.user && resp.user.name ? `Welcome ${resp.user.name}` : 'Logged in!');
    }, (errorResp) => {
      this.loggedIn.next(false);
      errorResp.error ? this.toastr.error(errorResp.error.errorMessage) : this.toastr.error('An unknown error has occured.');
    });
  }

  getLogin() {
    this.http.get(environment.apiUrl + '/login', {
      withCredentials: true // <=========== important!
    }).subscribe((resp: any) => {
      this.loggedIn.next(resp.loggedIn);
    }, (errorResp) => {
      this.toastr.error('Oops, something went wrong getting the logged in status')
    })
  }

  logout() {
    this.http.post(environment.apiUrl + '/logout', {}, {
      withCredentials: true
    }).subscribe(() => {
      this.loggedIn.next(false);
    });
  }

  registerAction(name: string, email: string, password: string) {
    this.http.post(environment.apiUrl + '/users', {
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
      errorResp.error ? this.toastr.error(errorResp.error.errorMessage,'Wystąpiły błędy',{ timeOut: 4000, progressBar: true, enableHtml:true}) : this.toastr.error('An unknown error has occured.');
    });
  }

}