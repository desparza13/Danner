import {Component, Input} from '@angular/core';
import { BookService } from 'src/app/shared/services/book.service';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Book } from 'src/app/shared/interfaces/book';
import { Reader } from 'src/app/shared/interfaces/reader';
import { RatingsFilterComponent } from './ratings-filter/ratings-filter.component';
import { GenreFilterComponent } from './genre-filter/genre-filter.component';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-home-readers',
  templateUrl: './home-readers.component.html',
  styleUrls: ['./home-readers.component.scss']
})
export class HomeReadersComponent {
  //Variables
  readerId="643d9026c9e38d96582f4528";
  allBooks: Array<Book>=[];
  ratingFilters: Array<Number>=[1,2,3,4,5];
  genresFilters: Array<string>=[];
  filteredAllBooks: Array<Book>=[];
  filteredCurrentBooks: any;
  filteredTbrBooks: any;
  filteredFinishedBooks: any;
  currentBooks: any;
  tbrBooks: any;
  finishedBooks: any;
  opened = false;
  searchControl = new FormControl();
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
    friends: [],
    readingChallenge: 0
  };
  ngOnInit(){
    this.getAllBooks();
    this.getCurrentReader();
    this.filteredAllBooks = this.allBooks;
    this.filteredCurrentBooks = this.currentBooks;
    this.filteredTbrBooks = this.tbrBooks;
    this.filteredFinishedBooks = this.finishedBooks;
    this.searchControl.valueChanges.subscribe(() => {
      this.filterBooks();
    });
  }
  constructor(private bookService:BookService, private readerService:ReaderService) {
  }

  //Functions
  //Get integer part of averageRating, in order to calculate how many stars to display in html
  getStars(averageRating: number): string[] {
    const integer = Math.floor(averageRating);
    const stars =[];
    for(let i = 0; i < integer; i++){
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
    this.filteredCurrentBooks = this.currentBooks;
  }
  getTbrBooks(){
    this.tbrBooks = this.currentReader.toBeRead;
    this.filteredTbrBooks = this.tbrBooks;
  }
  getFinishedBooks(){
    this.finishedBooks = this.currentReader.read;
    this.filteredFinishedBooks = this.finishedBooks;
  }
  //Get all books from database
  getAllBooks(){
    this.bookService.getBooks().subscribe((response:any)=>{
      this.allBooks=response;
      this.filteredAllBooks = this.allBooks;
    })
  }

  //Filtering
  //Get selected rating values
  getRatingFilters(ratings: any[] | undefined){
    this.ratingFilters=[];
    console.log("getting Ratings");
    console.log(ratings)
    if(ratings!=undefined && ratings.length>0){
      for(let i=0; i<5; i++){
        if(ratings[i]!=undefined && ratings[i].checked==true){
          this.ratingFilters.push(i+1);
        }
      }
      if(this.ratingFilters.length==0){
        this.ratingFilters=[1,2,3,4,5]
      }     
    }else{
      this.ratingFilters=[1,2,3,4,5]
    }
    return this.ratingFilters;
  }
  getGenresFilters(genres: any[] | undefined){
    this.genresFilters=[];
    if(genres!=undefined && genres.length>0){
      for(let i=0; i<genres.length; i++){
          this.genresFilters.push(genres[i].toLowerCase());
      }
      if(this.genresFilters.length==0){
        for(let i=0; i<this.allBooks.length; i++){
          this.genresFilters.push(this.allBooks[i].genre.toLowerCase());
        }      
      }     
    }else{
      for(let i=0; i<this.allBooks.length; i++){
        this.genresFilters.push(this.allBooks[i].genre.toLowerCase());
      }
    }
  }
  filterBySearchValues(){
    if(this.searchControl.value!=null && this.searchControl.value!=''){
      const search = this.searchControl.value.toLowerCase();
      this.filteredAllBooks = this.filteredAllBooks.filter((book:any) =>
        book.title.toLowerCase().includes(search)
      );
      this.filteredCurrentBooks = this.filteredCurrentBooks.filter((book:any) =>
        book.bookId.title.toLowerCase().includes(search)
      );
      this.filteredTbrBooks = this.filteredTbrBooks.filter((book:any) =>
        book.title.toLowerCase().includes(search)
      );
      this.filteredFinishedBooks = this.filteredFinishedBooks.filter((book:any) =>
        book.bookId.title.toLowerCase().includes(search)
      );
    }else{
      this.filteredAllBooks = this.allBooks;
      this.filteredCurrentBooks = this.currentBooks;
      this.filteredTbrBooks = this.tbrBooks;
      this.filteredFinishedBooks = this.finishedBooks;
      this.filterByRating(this.ratingFilters);
    }
  }
  filterByRating(ratings: any[] | undefined){
    this.ratingFilters = this.getRatingFilters(ratings);
    console.log(this.ratingFilters)
    this.filteredAllBooks = this.filteredAllBooks.filter(book =>
      this.ratingFilters.includes(Math.floor(book.averageRating))
    );
    this.filteredCurrentBooks = this.filteredCurrentBooks.filter((book:any) =>
      this.ratingFilters.includes(Math.floor(book.bookId.averageRating))
    );
    this.filteredTbrBooks = this.filteredTbrBooks.filter((book:any) =>
      this.ratingFilters.includes(Math.floor(book.averageRating))
    );
    this.filteredFinishedBooks = this.filteredFinishedBooks.filter((book:any) =>
        this.ratingFilters.includes(Math.floor(book.bookId.averageRating))
    );
  }
  filterByGenres(){
    this.filteredAllBooks = this.filteredAllBooks.filter(book =>
      this.genresFilters.includes(book.genre.toLowerCase())
    );
    this.filteredCurrentBooks = this.filteredCurrentBooks.filter((book:any) =>
      this.genresFilters.includes(book.bookId.genre.toLowerCase())
    );
    this.filteredTbrBooks = this.filteredTbrBooks.filter((book:any) =>
      this.genresFilters.includes(book.genre.toLowerCase())
    );
    this.filteredFinishedBooks = this.filteredFinishedBooks.filter((book:any) =>
      this.genresFilters.includes(book.bookId.genre.toLowerCase())
    );
  }
  filterBooksWithGenres(genres?:any){
    console.log("Genres",genres);
    this.getGenresFilters(genres);
    this.filterBySearchValues();
    this.filterByRating(this.ratingFilters);
    this.filterByGenres();
  }
  filterBooks(ratings?: any[]){
    console.log("All books before filter",this.filteredAllBooks)
    this.filterBySearchValues();
    console.log("Search value",this.searchControl.value)
    console.log("All books after Search",this.filteredAllBooks)
    
    this.filterByRating(ratings);
    console.log("Ratings",this.ratingFilters)
    console.log("All books after rating", this.filteredAllBooks)
    this.filterByGenres();
    console.log("Genres",this.genresFilters)
    console.log("All books after genres", this.filteredAllBooks)

  }

}
