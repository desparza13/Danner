import {Component, Input} from '@angular/core';
import { BookService } from 'src/app/shared/services/book.service';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Book } from 'src/app/shared/interfaces/book';
import { Reader } from 'src/app/shared/interfaces/reader';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-home-readers',
  templateUrl: './home-readers.component.html',
  styleUrls: ['./home-readers.component.scss']
})
export class HomeReadersComponent {

  //Variables
  //Id proof of concept until login and register is implemented
  readerId:string='';
  reader: any;
  //Storing books
    //Originals
  allBooks: Array<Book>=[];
  currentBooks: any;
  tbrBooks: any;
  finishedBooks: any;
    //Filtered
  filteredAllBooks: Array<Book>=[];
  filteredCurrentBooks: any;
  filteredTbrBooks: any;
  filteredFinishedBooks: any;
  //Chosen filters
  searchControl = new FormControl();
  ratingFilters: Array<Number>=[1,2,3,4,5];
  ratingFiltersObject: any;
  genresFilters: Array<string>=[];
  opened = false;
  currentReader: Reader = {
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

  ngOnInit(){
    this.readerId = this.authService.getLoginUser();

    //Get initial data from the database
    this.getCurrentReader();
    //Initialize filtered books as original books
    this.filteredAllBooks = this.allBooks;
    this.filteredCurrentBooks = this.currentBooks;
    this.filteredTbrBooks = this.tbrBooks;
    this.filteredFinishedBooks = this.finishedBooks;
    //Whenever the search bar texts changes filterBooks, this way while the user types he/she can see the books with that filter criteria (like netflix)
    this.searchControl.valueChanges.subscribe(() => {
      this.filterBooks();
    });
  }
  constructor(private bookService:BookService, private readerService:ReaderService, private authService: AuthService) {
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
  //Get current reader and their list of books (finished, currently reading, to be read and finished)
  getCurrentReader(){
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.currentReader=response;
      this.getCurrentlyReadingBooks();
      this.getTbrBooks();
      this.getFinishedBooks();
      this.getAllBooks();
    })
  }
  //Get books functions
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
    let allBooksWithPossibleDuplicates = []
    for (let i=0; i<this.currentBooks.length; i++){
      let book = {
        _id: this.currentBooks[i].bookId._id,
        author : this.currentBooks[i].bookId.author,
        averageRating : this.currentBooks[i].bookId.averageRating,
        date : this.currentBooks[i].bookId.date,
        description : this.currentBooks[i].bookId.description,
        genre : this.currentBooks[i].bookId.genre,
        image : this.currentBooks[i].bookId.image,
        pages : this.currentBooks[i].bookId.pages,
        showDescription : this.currentBooks[i].bookId.showDescription,
        title : this.currentBooks[i].bookId.title
      }
      let ids = allBooksWithPossibleDuplicates.map((book:any) => book._id);
      if (!(ids.includes(book._id))){
        allBooksWithPossibleDuplicates.push(book);
      }
    }
    for (let i=0; i<this.finishedBooks.length; i++){
      let book = {
        _id: this.finishedBooks[i].bookId._id,
        author : this.finishedBooks[i].bookId.author,
        averageRating : this.finishedBooks[i].bookId.averageRating,
        date : this.finishedBooks[i].bookId.date,
        description : this.finishedBooks[i].bookId.description,
        genre : this.finishedBooks[i].bookId.genre,
        image : this.finishedBooks[i].bookId.image,
        pages : this.finishedBooks[i].bookId.pages,
        showDescription : this.finishedBooks[i].bookId.showDescription,
        title : this.finishedBooks[i].bookId.title
      }
      let ids = allBooksWithPossibleDuplicates.map((book:any) => book._id);
      if (!(ids.includes(book._id))){
        allBooksWithPossibleDuplicates.push(book);
      }
    }
    for (let i=0; i<this.tbrBooks.length; i++){
      let book = {
        _id: this.tbrBooks[i]._id,
        author : this.tbrBooks[i].author,
        averageRating : this.tbrBooks[i].averageRating,
        date : this.tbrBooks[i].date,
        description : this.tbrBooks[i].description,
        genre : this.tbrBooks[i].genre,
        image : this.tbrBooks[i].image,
        pages : this.tbrBooks[i].pages,
        showDescription : this.tbrBooks[i].showDescription,
        title : this.tbrBooks[i].title
      }
      let ids = allBooksWithPossibleDuplicates.map((book:any) => book._id);
      if (!(ids.includes(book._id))){
        allBooksWithPossibleDuplicates.push(book);
      }
    }
    this.allBooks = allBooksWithPossibleDuplicates;
    this.filteredAllBooks = this.allBooks
    console.log("ALL",this.allBooks)
}
  //Filtering
  //Get selected rating values
  getRatingFilters(ratings: any[] | undefined){
    this.ratingFiltersObject = ratings;
    this.ratingFilters=[];
    //If a valid event is triggered (check/uncheck boxes)
    if(ratings!=undefined && ratings.length>0){
      for(let i=0; i<5; i++){
        //Check which ratings were chosen by the reader and save them 
        if(ratings[i].checked==true){
          this.ratingFilters.push(i+1);
        }
      }
      //If no checkboxes are marked, show all ratings
      if(this.ratingFilters.length==0){
        this.ratingFilters=[1,2,3,4,5]
      }     
    }else{ //Not a valid event, show all ratings
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
    }
  }
  filterByRating(ratings: any[] | undefined){
    this.ratingFilters = this.getRatingFilters(ratings);
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
  filterByGenres(genres?:any){
    this.getGenresFilters(genres);
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
  filterBooks(ratings?: any[], genres?:any){
    this.filterBySearchValues();
    let ratingToUse:any;
    if(ratings!=undefined){
      ratingToUse=ratings
    }else{
      ratingToUse=this.ratingFiltersObject
    }
    this.filterByRating(ratingToUse);
    let genreToUse:any;
    if(genres!=undefined){
      genreToUse=genres
    }else{
      genreToUse=this.genresFilters
    }
    this.filterByGenres(genreToUse);
  }

  selectBook(book: Book){
    console.log(book);
    this.bookService.setBook(book);
  }

}
