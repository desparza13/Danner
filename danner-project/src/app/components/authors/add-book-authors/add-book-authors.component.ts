import { Component } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/shared/services/author.service';
import { Author } from 'src/app/shared/interfaces/author';
import { ConfirmationDialogComponent } from '../../readers/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-book-authors',
  templateUrl: './add-book-authors.component.html',
  styleUrls: ['./add-book-authors.component.scss']
})
export class AddBookAuthorsComponent {
  authorId="";
  author:any;
  book: Book = {
    _id: '',
    title: '',
    date: new Date(),
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMBe97jZk0iaa61yMK-ZOFiHiTAGTHTMSNSg&usqp=CAU',
    genre: '',
    author: '',
    averageRating: 5,
    description: '',
    pages: 0,
    showDescription: false
  };
  bookForm : any;
  currentAuthor: Author = {
    _id: "",
    name: "",
    user: '',
    email: '',
    city: '',
    image: '',
    password: ''
  };
  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
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

  ngOnInit(): void {
    this.author = JSON.parse(localStorage.getItem('loginUser') || '{}');
    console.log(this.author);
    this.authorId = this.author.userId;
    this.getAuthor();
  }

  getAuthor(){
    this.authorService.getOneAuthor(this.authorId).subscribe((response:any)=>{
      this.currentAuthor=response;
    })
  }
  getData(){
    this.book.title = this.bookForm.value.title;
    this.book.date = this.bookForm.value.date;
    this.book.image = this.bookForm.value.image;
    this.book.genre = this.bookForm.value.genre;
    this.book.author = this.currentAuthor.name;
    this.book.averageRating = 5;
    this.book.description = this.bookForm.value.description;
    this.book.pages = this.bookForm.value.pages;
    this.book.showDescription = false;
  }
  onSubmit(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to post this new book?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getData();
        this.bookService.postBook(this.book).subscribe(
          (response:any) => {
            this.snackBar.open('Book uploaded successfully', 'Close', {
              duration: 3000
            });
            this.book = response;
          },
          (error) =>{
            console.log(error);
            this.snackBar.open('There was an error uploading your book. Please try again later.', 'Close', {
              duration: 3000
            });
          }
        )
      }
    });
  }
  
}