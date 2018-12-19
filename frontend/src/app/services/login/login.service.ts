import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../../consts/consts';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    return this.http.get(Consts.Api.ROOT + "/login");
  }
}
