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
import { environment } from 'src/environments/environment';
import { response } from 'express';
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
  fileName = '';
  file:any;
  id = '';
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
        pages: [1, [Validators.required, Validators.min(1)]]
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
      this.bookForm.patchValue({
        title: this.book.title,
        genre: this.book.genre,
        date: this.book.date,
        description: this.book.description,
        pages: this.book.pages,
        image: this.book.image
      })
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
    this.isEditing = true;
  }
  confirmEdit(){
    this.isEditing = false;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to update your book?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedBook: Book = {
          ...this.book,
          ...this.bookForm.value
        }
        updatedBook._id = this.book._id;
        this.id = updatedBook._id;
        updatedBook.author = this.book.author;
        updatedBook.averageRating = this.book.averageRating;
        updatedBook.showDescription = this.book.showDescription;
        if(this.file){
          this.fileName = this.file.name;
          const ext = this.fileName.split('.').pop();
          const formData = new FormData();
          formData.append("file", this.file);
          this.bookService.uploadPhoto(formData, this.id).subscribe((response:any)=>{
            updatedBook.image = environment.apiUrl+"image/"+this.id +"."+ext;
            this.bookService.updateBook(updatedBook, this.book._id).subscribe((response:any)=>{
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
          })
        }else{
          this.bookService.updateBook(updatedBook, this.book._id).subscribe((response:any)=>{
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
      }
    })
  }
  cancelEdit() {
    this.isEditing = false;
    this.bookForm.reset({
      title: this.book.title,
      genre: this.book.genre,
      date: this.book.date,
      description: this.book.description,
      pages: this.book.pages,
      image: this.book.image
    });
  }
  
  getFilterReviews(){
    this.filterReviews = this.filterReviews.filter((review)=>{
      return review.bookId._id == this.book._id
    })
    this.isLoading=false;
  }
  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    this.fileName = file.name;
    this.file = file;
  }
}
