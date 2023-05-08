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
import { ConfirmationDialogComponent } from '../../readers/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  bookForm: FormGroup;
  bookId = ''
  isLoading: boolean = true;
  isEditing: boolean = false;
  reviews: Array<Review> = [];
  filterReviews: Array<Review> = []
  constructor(
    private bookService: BookService,
    private reviewService: ReviewService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router:Router
    ){
      this.bookForm = this.formBuilder.group({
        title: ['', Validators.required],
        genre: ['', Validators.required],
        date: ['', Validators.required],
        description: ['', Validators.required],
        pages: [1, [Validators.required, Validators.min(1)]],
        image: ['', Validators.required]
      });
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
  editBook() {
    console.log("Edit", this.isEditing)
    this.isEditing = true;
  }
  confirmEdit(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to update your book?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.updateBook(this.book, this.book._id).subscribe((response:any)=>{
          this.isEditing = false;
          this.snackBar.open('Book updated successfully', 'Close', {
            duration: 3000,
          });
          this.book = response;
        },
        (error) => {
          console.log(error);
          this.snackBar.open('There was an error updating your book. Please try again later.', 'Close', {
            duration: 3000
          });
        })
      }
    })
  }
  cancelEdit() {
    this.isEditing = false;
  }
  
  getFilterReviews(){
    this.filterReviews = this.filterReviews.filter((review)=>{
      return review.bookId._id == this.book._id
    })
    this.isLoading=false;
  }

}
