import { Component, OnInit } from '@angular/core';
import { Offer } from '../../models/offer';
import { OfferService } from '../../services/offer/offer.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment/comment.service';
import { AuthService } from '../../services/auth/auth.service';
import { Comments } from '../../models/comments';
import { CommentHelperService } from '../../utils/comment-helper.service';

@Component({
  selector: 'app-comment-offer',
  templateUrl: './comment-offer.component.html',
  styleUrls: ['./comment-offer.component.scss']
})
export class CommentOfferComponent implements OnInit {

  comments: Comments[];

  id: string = null;
  offer: Offer = null;


  constructor(private offerService: OfferService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private commentHelper: CommentHelperService) {

        this.route.params.subscribe(params => {
          this.id = params.id;
        });
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id; // --> Name must match wanted parameter
    });
    this.getAllCommentsAction();

  }

  getAllCommentsAction() {
    this.commentService.getOfferComments(this.id).subscribe(
      data => this.comments = data
    );
  }

   onDeleteComment(commentID) {
    this.commentHelper.onDeleteComment(commentID);
    this.ngOnInit();
    this.reload();
  }

  reload() {
    window.location.reload();
    this.commentHelper.redirect("/offers/" + this.id)
  }
}
