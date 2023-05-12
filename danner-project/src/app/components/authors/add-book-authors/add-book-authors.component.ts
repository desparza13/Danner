import { Component } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/shared/services/author.service';
import { Author } from 'src/app/shared/interfaces/author';
import { ConfirmationDialogComponent } from '../../readers/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book-authors',
  templateUrl: './add-book-authors.component.html',
  styleUrls: ['./add-book-authors.component.scss']
})
export class AddBookAuthorsComponent {
  authorId="";
  author:any;
  fileName='';
  file:any;
  id='';
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
    private formBuilder: FormBuilder,
    private router: Router,
    private authService : AuthService
  ){
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      genre: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      pages: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.authorId = this.authService.getLoginUser();
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
          (response1:any) => {
            this.id = response1._id;
            if (this.file){
              this.fileName = this.file.name;
              const ext = this.fileName.split('.').pop();
              const formData = new FormData();
              formData.append("file", this.file);
              this.bookService.uploadPhoto(formData, this.id).subscribe((response:any)=>{
                let updatedBook = {
                  title: response1.title,
                  date: response1.date,
                  image: "../../../../assets/uploads/"+this.id +"."+ext,
                  author: response1.author,
                  averageRating: response1.averageRating,
                  description: response1.description,
                  pages: response1.pages,
                  genre: response1.genre,
                  showDescription: response1.showDescription
                }
                this.bookService.updateBook(updatedBook, this.id).subscribe((response:any)=>{
                  this.snackBar.open('Book uploaded successfully', 'Close', {
                    duration: 3000
                  });
                  this.book = response;
                  this.router.navigate(['/authors']);
                })
              })
            }
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
  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    this.fileName = file.name;
    console.log(file);
    this.file = file;
  }
}
