import { Component, OnInit } from '@angular/core';
import { OfferService } from '../../services/offer/offer.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Consts } from '../../consts/consts';
import { CommentService } from '../../services/comment/comment.service';
import { Comments } from '../../models/comments';
import { Offer } from '../../models/offer';
import {OfferHelperService} from "../../utils/offer-helper.service";


@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit {

  offer: Offer = null;
  comment: Comments = null;
  id: string;

  public newComment: Comments = new Comments();

  constructor(private offerService: OfferService,
              private commentService: CommentService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (!AuthService.SessionStorageManager.getValue('user')) {
      this.router.navigate(['/']).then(() => {
        this.toastr.error('Musisz być zalogowany.');
      })
    }

    this.route.params.subscribe(params => {
      this.id = params.id; // --> Name must match wanted parameter
    });

    this.offerService.getOfferById(this.id).subscribe(
      data => {
        this.newComment.offer = data;
      }
    );
  }


  createOfferAction(comment: Comments) {

      this.commentService.createComment(comment).subscribe((resp: any) => {
          location.reload();
          // this.router.navigate([Consts.Offer.URL+'/'+ this.id]).then(() => {
          //   this.toastr.success('Komentarz został dodany ');
          // })
        },
        (errorResp) => {
          this.toastr.error(errorResp.error.errorMessage ? errorResp.error.errorMessage : 'Coś poszło nie tak.')
        })
  }


  onSubmit() {
    this.createOfferAction(this.newComment);
  }

}
