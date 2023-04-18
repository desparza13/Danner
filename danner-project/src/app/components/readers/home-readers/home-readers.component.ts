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
    this.searchControl.valueChanges.subscribe(() => {
      this.filterBooksSearchBar();
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
    console.log("Reading",this.currentBooks);
    this.filteredCurrentBooks = this.currentBooks;
  }
  getTbrBooks(){
    this.tbrBooks = this.currentReader.toBeRead;
    console.log("To be read",this.tbrBooks);
    this.filteredTbrBooks = this.tbrBooks;
  }
  getFinishedBooks(){
    this.finishedBooks = this.currentReader.read;
    console.log("Finished",this.finishedBooks);
    this.filteredFinishedBooks = this.finishedBooks;
  }
  //Get all books from database
  getAllBooks(){
    this.bookService.getBooks().subscribe((response:any)=>{
      console.log("Allbooks",response);
      this.allBooks=response;
      this.filteredAllBooks = this.allBooks;
    })
  }
  filterBooksSearchBar() {
    if(this.searchControl.value!=null){
      const search = this.searchControl.value.toLowerCase();
      this.filteredAllBooks = this.allBooks.filter(book =>
        book.title.toLowerCase().includes(search)
      );
      this.filteredCurrentBooks = this.currentBooks.filter((book:any) =>
        book.bookId.title.toLowerCase().includes(search)
      );
      this.filteredTbrBooks = this.tbrBooks.filter((book:any) =>
        book.title.toLowerCase().includes(search)
      );
      this.filteredFinishedBooks = this.finishedBooks.filter((book:any) =>
        book.bookId.title.toLowerCase().includes(search)
      );
    }else{
      this.filteredAllBooks = this.allBooks;
      this.filteredCurrentBooks = this.currentBooks;
      this.filteredTbrBooks = this.tbrBooks;
      this.filteredFinishedBooks = this.finishedBooks;
    }
  }
  filterBooksRatings(ratings: any[]) {
    // Aquí se procesan los ratings recibidos (Hacer un arreglo con ratings validos)
    let ratingFilters:Array<Number> = []
    for(let i=0; i<5; i++){
      if(ratings[i].checked==true){
        ratingFilters.push(i+1);
      }
    }
    if(ratingFilters.length==0){
      for(let i=1; i<=5; i++){
        ratingFilters.push(i);
      }
    }
    console.log(ratingFilters)
    //Restaurar filtrado por barra de busqueda
    this.filterBooksSearchBar();
    // Actualizar los libros filtrados según los nuevos ratings
    this.filteredAllBooks = this.filteredAllBooks.filter(book =>
      ratingFilters.includes(Math.floor(book.averageRating))
    );
    this.filteredCurrentBooks = this.filteredCurrentBooks.filter((book:any) =>
      ratingFilters.includes(Math.floor(book.bookId.averageRating))
    );
    this.filteredTbrBooks = this.filteredTbrBooks.filter((book:any) =>
      ratingFilters.includes(Math.floor(book.averageRating))
    );
    this.filteredFinishedBooks = this.filteredFinishedBooks.filter((book:any) =>
      ratingFilters.includes(Math.floor(book.bookId.averageRating))
    );
  }
}
