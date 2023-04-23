import { Component } from '@angular/core';
import { Review } from 'src/app/shared/interfaces/review';
import { ReviewService } from 'src/app/shared/services/review.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';

@Component({
  selector: 'app-friends-reviews-readers',
  templateUrl: './friends-reviews-readers.component.html',
  styleUrls: ['./friends-reviews-readers.component.scss']
})
export class FriendsReviewsReadersComponent {
  reader: any;
  readerId: string = '';
  isLoading = true;
  friends: Array<String> = [];
  reviews: Array<Review> = [];
  filterReviews: Array<Review> = [];
  constructor(
    private reviewService: ReviewService,
    private readerService: ReaderService) {

  }
  ngOnInit() {
    this.reader = JSON.parse(localStorage.getItem('loginUser') || '{}');
    console.log(this.reader);
    this.readerId = this.reader.userId;
    this.getData();
  }
  getData(){
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.friends = response.friends.map((friend:Reader) => friend._id);
      this.getReviews()
    },
    (error)=>{
      this.isLoading = false;
    });
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
    this.filterReviews = this.filterReviews.filter((review)=>{
      return this.friends.includes(review.userId._id)
    })
    this.isLoading=false;
    console.log(this.filterReviews);
  }
}
