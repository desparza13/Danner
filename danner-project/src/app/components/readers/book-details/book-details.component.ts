import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';
import { Review } from 'src/app/shared/interfaces/review';
import { ReviewService } from 'src/app/shared/services/review.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit{
  book: Book = {
    _id: '',
    title: '',
    date: new Date(),
    image: '',
    genre: '',
    author: '',
    averageRating: 0,
    description: '',
    pages: 0,
    showDescription: false
  }
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
  rating: any;

  constructor(
    private bookService: BookService,
    private reviewService: ReviewService,
    private readerService: ReaderService,
    private snackBar: MatSnackBar,){

  }
  ngOnInit(){
    this.book = this.bookService.getBook()
    console.log(this.book);
    this.reader = JSON.parse(localStorage.getItem('loginUser') || '{}');
    console.log(this.reader);
    this.readerId = this.reader.userId;
    this.getData();
  }
  getData() {
    this.reviewService.getReviews().subscribe((response: any) => {
      this.filterReviews=response;
      this.getFilterReviews();
    });
  }
  getFilterReviews(){
    this.filterReviews = this.filterReviews.filter((review)=>{
      return review.bookId._id == this.book._id
    })
    this.isLoading=false;
    console.log(this.filterReviews);
  }
  likeIcon(review:Review){
    let likes = review.likes.map((reader:Reader) => reader._id);
    if(likes.includes(this.readerId)){
      return "favorite"
    }
    return "favorite_border"
  }
  likeReview(review:Review){
    let likes = review.likes.map((reader:Reader) => reader._id);
    if(likes.includes(this.readerId)){
      review.likes = review.likes.filter((reader:any) => reader._id !== this.readerId);
    }else{
      review.likes.push(this.profile);
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
