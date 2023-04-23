import { Component } from '@angular/core';
import { Review } from 'src/app/shared/interfaces/review';
import { ReviewService } from 'src/app/shared/services/review.service';

@Component({
  selector: 'app-friends-reviews-readers',
  templateUrl: './friends-reviews-readers.component.html',
  styleUrls: ['./friends-reviews-readers.component.scss']
})
export class FriendsReviewsReadersComponent {
  reader: any;
  readerId: string = '';
  isLoading = true;

  reviews: Array<Review> = [];
  filterReviews: Array<Review> = [];
  constructor(private reviewService: ReviewService) {

  }
  ngOnInit() {
    this.reader = JSON.parse(localStorage.getItem('loginUser') || '{}');
    console.log(this.reader);
    this.readerId = this.reader.userId;
    this.getReviews();

  }
  getReviews() {
    this.reviewService.getReviews().subscribe((response: any) => {
      this.reviews=response;
      this.getFilterReviews();
    });
  }

  getFilterReviews(){
    this.filterReviews = this.reviews.filter((review)=>{
      return review.userId._id != this.readerId;
    })
    this.isLoading=false;
    console.log(this.filterReviews);
  }
}
