import { Component } from '@angular/core';
import { Review } from 'src/app/shared/interfaces/review';
import { ReviewService } from 'src/app/shared/services/review.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-friends-reviews-readers',
  templateUrl: './friends-reviews-readers.component.html',
  styleUrls: ['./friends-reviews-readers.component.scss']
})
export class FriendsReviewsReadersComponent {
  reader: any;
  readerId: string = '';
  profile: Reader = {
    _id: "",
    name: "",
    user: '',
    email: '',
    city: '',
    image: '',
    password: '',
    read: [],
    toBeRead: [],
    reading: [],
    friends: [],
    readingChallenge: 0
  };
  isLoading = true;
  friends: Array<String> = [];
  reviews: Array<Review> = [];
  filterReviews: Array<Review> = [];
  constructor(
    private reviewService: ReviewService,
    private readerService: ReaderService,
    private snackBar: MatSnackBar,
    private authService: AuthService
    ) {

  }
  ngOnInit() {
    this.readerId = this.authService.getLoginUser();

    this.getData();
  }
  getData(){
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.profile = response;
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
  likeIcon(review:Review){
    let likes = review.likes.map((element:any) => element.userId._id);
    if(likes.includes(this.readerId)){
      return "favorite"
    }
    return "favorite_border"
  }
  likeReview(review:Review){
    let likes = review.likes.map((element:any) => element.userId);
    if(likes.includes(this.readerId)){
      review.likes = review.likes.filter((element:any) => element.userId !== this.readerId);
    }else{
      review.likes.push({userId:this.readerId, date: Date.now()});
    }
    this.reviewService.updateReview(review, review._id).subscribe(
      (response: any) => {
        review = response;
      },
      (error)=>{
        console.log(error);
        this.snackBar.open('There was an error. Please try again later.', 'Close', {
          duration: 3000
        });
      }
    )
  }
}
