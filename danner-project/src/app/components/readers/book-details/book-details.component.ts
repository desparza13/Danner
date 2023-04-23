import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';
import { Review } from 'src/app/shared/interfaces/review';
import { ReviewService } from 'src/app/shared/services/review.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  current: Array<String> = [];
  tbr: Array<String> = [];
  finished: Array<String> = [];
  reviews: Array<Review> = [];
  filterReviews: Array<Review> = [];
  rating: any;

  constructor(
    private bookService: BookService,
    private reviewService: ReviewService,
    private readerService: ReaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
    ){

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
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.profile = response;
      this.friends = response.friends.map((friend:Reader) => friend._id);
      this.current = response.reading.map((book:any) => book.bookId._id);
      this.finished = response.read.map((book:any) => book.bookId._id);
      this.tbr = response.toBeRead.map((book:any) => book._id);
      this.reviewService.getReviews().subscribe((response: any) => {
        this.filterReviews=response;
        this.getFilterReviews();
      });
    },
    (error)=>{
      this.isLoading = false;
    })
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
  currentBtn(){
    if(this.current.includes(this.book._id)){
      return "Delete from currently reading"
    }
    return "Mark as currently reading"
  }
  finishedBtn(){
    if(this.finished.includes(this.book._id)){
      return "Delete from finished list"
    }
    return "Mark as finished"
  }
  tbrBtn(){
    if(this.tbr.includes(this.book._id)){
      return "Delete from to be read list"
    }
    return "Add to to be read list"
  }
  modifyCurrentList(){
    if(this.current.includes(this.book._id)){
      this.profile.reading = this.profile.reading.filter((book:any) => book.bookId._id !== this.book._id);
    }else{
      let readingBook = {
        "bookId": this.book._id,
        "progress": 0
      }
      this.profile.reading.push(readingBook);
    }
    this.readerService.updateReader(this.profile, this.readerId).subscribe(
      (response: any) => {
        this.snackBar.open('Currently reading list edited successfully', 'Close', {
          duration: 3000
        });
        console.log("update response",response)
        this.getData()
      },
      (error) => {
        console.log(error);
        this.snackBar.open('There was an error editing the currently reading list. Please try again later.', 'Close', {
          duration: 3000
        });
      }
    );
  }
  modifyFinishedList(){
    if(this.finished.includes(this.book._id)){
      this.profile.read = this.profile.read.filter((book:any) => book.bookId._id !== this.book._id);
    }else{
      let finishedBook = {
        "bookId": this.book._id,
        "progress": 0
      }
      this.profile.read.push(finishedBook);
    }
    this.readerService.updateReader(this.profile, this.readerId).subscribe(
      (response: any) => {
        this.snackBar.open('Finished reading list edited successfully', 'Close', {
          duration: 3000
        });
        this.getData()
      },
      (error) => {
        console.log(error);
        this.snackBar.open('There was an error editing the finished reading list. Please try again later.', 'Close', {
          duration: 3000
        });
      }
    );
  }
  modifyTbrList(){
    console.log("Tbr",this.tbr)
    if(this.tbr.includes(this.book._id)){
      this.profile.toBeRead = this.profile.toBeRead.filter((book:any) => book._id !== this.book._id);
    }else{
      this.profile.toBeRead.push(this.book._id);
    }
    this.readerService.updateReader(this.profile, this.readerId).subscribe(
      (response: any) => {
        this.snackBar.open('To be read list edited successfully', 'Close', {
          duration: 3000
        });
        this.getData()
      },
      (error) => {
        console.log(error);
        this.snackBar.open('There was an error editing the to be read reading list. Please try again later.', 'Close', {
          duration: 3000
        });
      }
    );
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
