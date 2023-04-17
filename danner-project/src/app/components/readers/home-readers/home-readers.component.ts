import {Component} from '@angular/core';
import { BookService } from 'src/app/shared/services/book.service';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Book } from 'src/app/shared/interfaces/book';
import { Reader } from 'src/app/shared/interfaces/reader';
import { RatingsFilterComponent } from './ratings-filter/ratings-filter.component';
import { GenreFilterComponent } from './genre-filter/genre-filter.component';
@Component({
  selector: 'app-home-readers',
  templateUrl: './home-readers.component.html',
  styleUrls: ['./home-readers.component.scss']
})
export class HomeReadersComponent {
  //Variables
  readerId="643d6261ee6cb5cda8ed6589";
  allBooks: Array<Book>=[];
  currentBooks: any;
  tbrBooks: any;
  finishedBooks: any;
  opened = false;
  currentReader: Reader = {
    name: "",
    user: '',
    email: '',
    city: '',
    image: '',
    password: '',
    read: [],
    toBeRead: [],
    reading: [],
    friends: []
  };

  constructor(private bookService:BookService, private readerService:ReaderService) {
    this.getAllBooks();
    this.getCurrentReader();
    console.log(this.allBooks);

  }

  //Functions
  //Get integer part of averageRating, in order to calculate how many stars to display in html
  getStars(averageRating: number): string[] {
    const integer = Math.floor(averageRating);
    const stars =[];
    for(let i = 0; i < 3; i++){
      stars.push('★');
    }
    return stars;
  }
  //Get current reader
  getCurrentReader(){
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.currentReader=response;
      console.log("Reader",this.currentReader)
      this.getCurrentlyReadingBooks();
      this.getTbrBooks();
      this.getFinishedBooks();
    })
  }
  //Get books
  getCurrentlyReadingBooks(){
    this.currentBooks = this.currentReader.reading;
    console.log("Reading",this.currentBooks);
  }
  getTbrBooks(){
    this.tbrBooks = this.currentReader.toBeRead;
    console.log("To be read",this.tbrBooks);
  }
  getFinishedBooks(){
    this.finishedBooks = this.currentReader.read;
    console.log("Finished",this.finishedBooks);
  }
  //Get all books from database
  getAllBooks(){
    this.bookService.getBooks().subscribe((response:any)=>{
      console.log("Allbooks",response);
      this.allBooks=response;
    })
  }
}
