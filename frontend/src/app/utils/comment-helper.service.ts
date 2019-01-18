import { Injectable } from '@angular/core';
import { CommentService } from '../services/comment/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class CommentHelperService {

  constructor(private commentService: CommentService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private http: HttpClientModule) {
  }

  public onDeleteComment(commentID) {
      this.commentService.deleteComment(commentID).subscribe((resp: any) => {
          this.toastr.success('Komentarz został usunięty');
        },
        (errorResp) => {
          this.toastr.error('Nie udało się usunąc komentarza');
        })
  }

   public redirect(route, type = 'success', message = null) {
    this.router.navigate([route]).then(() => {
      if (message) {
        if (type == 'error') {
          this.toastr.error(message);
        } else {
          this.toastr.success(message);
        }
      }
    })
  }
}
