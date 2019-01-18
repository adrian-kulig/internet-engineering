import { Component, OnInit } from '@angular/core';
import { Comments } from '../../models/comments';
import { CommentService } from '../../services/comment/comment.service';
import { CommentHelperService } from '../../utils/comment-helper.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {

  comment: Comments = null;
  id: string;

  constructor(private commentService: CommentService,
              private commentServiceHelper: CommentHelperService,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }


  ngOnInit() {

    if (!AuthService.SessionStorageManager.getValue('user')) {
      this.toastr.error('musisz byc zalogowany');
      // this.offerServiceHelper.redirect('/','error','Musisz być zalogowany');
      return false;
    }
    this.commentService.getCommentById(this.id).subscribe(
      data => {
        if (data.user && data.user.id == AuthService.getLoggedInUser().id) {
          console.log(data);
          this.comment = data
        } else {
          this.toastr.error('Nie mozesz edytowac tego komentarza');
          // this.offerServiceHelper.redirect('/offers', 'error', 'Nie możesz edytować tej oferty.');
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  editCommentAction(comment: Comments) {
    this.commentService.editComment(this.id, comment).subscribe( data => {
        this.toastr.success("Komentarz został zapisany poprawnie");
    },
    (errorResp) => {
        this.toastr.error(errorResp.error.errorMessage ? errorResp.error.errorMessage : 'Coś poszło nie tak.')
    });
  }

  onSubmit(){
    this.editCommentAction(this.comment);
  }
}
