import { Component, OnInit } from '@angular/core';
import { Comments } from '../../models/comments';
import { CommentService } from '../../services/comment/comment.service';
import { CommentHelperService } from '../../utils/comment-helper.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {

  comment: Comments;

  constructor(private commentService: CommentService,
              private commentServiceHelper: CommentHelperService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
    }

  ngOnInit() {
    this.commentService.getCommentById
  }

  editCommentAction(commentId, comment: Comments) {
    this.commentService.editComment(commentId, comment).subscribe( data => {
        this.toastr.success("Komentarz został zapisany poprawnie");
    },
    (errorResp) => {
        this.toastr.error(errorResp.error.errorMessage ? errorResp.error.errorMessage : 'Coś poszło nie tak.')
    });
  }
}
