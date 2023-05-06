import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';
import { Review } from 'src/app/shared/interfaces/review';
import { ReviewService } from 'src/app/shared/services/review.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authors-book-details',
  templateUrl: './authors-book-details.component.html',
  styleUrls: ['./authors-book-details.component.scss']
})
export class AuthorsBookDetailsComponent {
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
  bookId = ''
  isLoading = true;
  reviews: Array<Review> = [];
  filterReviews: Array<Review> = []
  constructor(
    private bookService: BookService,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router:Router
    ){
  }
  ngOnInit(){
    const  url = this.router.url.split('/');
    this.bookId = url[2];
    this.getBook()
    this.getData();
  }
  getBook(){
    this.bookService.getOneBook(this.bookId).subscribe((response:any)=>{
      this.book = response;
    })
  }
  getData(){
    this.reviewService.getReviews().subscribe((response: any) => {
      this.filterReviews=response;
      this.getFilterReviews();
    },
    (error)=>{
      this.isLoading = false;
    });
  }
  getFilterReviews(){
    this.filterReviews = this.filterReviews.filter((review)=>{
      return review.bookId._id == this.book._id
    })
    this.isLoading=false;
  }

}
