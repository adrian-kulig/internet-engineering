import {Observable, Subject} from 'rxjs';
import { Consts } from '../../consts/consts';
import { Offer } from '../../models/offer';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserService {
  userList: Subject<Offer | null>;

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastr: ToastrService) {
    this.userList = new Subject();
    this.authService.loggedIn.subscribe(() => {
      this.userList.next(null);
    });
  }



  getUserList() {
    const req = this.http.get(environment.apiUrl + '/users', {
      withCredentials: true,
      headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMTlmMTMyYTAxNmZjYTQwMWI3ZjhhOCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU0NTIwNDAxOX0.m1in77WPHb76GHnMcgKUw-GxEhaZx2qSVFXP-srkKio'}
    });
    req.subscribe((offer: Offer) => {
      this.userList.next(offer);
    }, errorResp => {
      if (errorResp.status === 403) {
        // TODO: redirect to login
      }
      this.toastr.error(errorResp.error && errorResp.error.errorMessage ?
        errorResp.error.errorMessage :  'Oops, something went wrong.');
    });
  }
}
