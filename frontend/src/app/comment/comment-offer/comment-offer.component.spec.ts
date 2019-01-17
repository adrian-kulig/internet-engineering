import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentOfferComponent } from './comment-offer.component';

describe('CommentOfferComponent', () => {
  let component: CommentOfferComponent;
  let fixture: ComponentFixture<CommentOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
