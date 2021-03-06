import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Consts} from '../../consts/consts';
import {AuthService} from '../auth/auth.service';
import {Comments} from '../../models/comments';

@Injectable()
export class CommentService {

  constructor(private http: HttpClient) {
  }

  createComment(comment: Comments): Observable<Comments> {
    // return this.http.post<Comments>('http://localhost:3000/api/comments/create', comment, AuthService.authorizationHeaders);
    return this.http.post<Comments>(Consts.Api.ROOT + Consts.Comment.CREATE_URL, comment, AuthService.authorizationHeaders);
  }

  getCommentById(id: string): Observable<Comments> {
    return this.http.get<Comments>(Consts.Api.ROOT + Consts.Comment.URL + "/" + id);
  }

  getOfferComments(id: string): Observable<Comments[]> {
    return this.http.get<Comments[]>(Consts.Api.ROOT + Consts.Comment.OFFER_Comment_LIST + '/' + id);
  }

  editComment(id: string, comment: Comments): Observable<Comments> {
    return this.http.put<Comments>(Consts.Api.ROOT + Consts.Comment.EDIT_URL + '/' + id, comment, AuthService.authorizationHeaders);
  }

  deleteComment(id: string): Observable<Comments> {
    return this.http.delete<Comments>(Consts.Api.ROOT + Consts.Comment.URL + '/' + id, AuthService.authorizationHeaders);
  }

}
