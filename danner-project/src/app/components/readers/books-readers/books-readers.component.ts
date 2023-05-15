import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BookService } from 'src/app/shared/services/book.service';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Book } from 'src/app/shared/interfaces/book';
import { Reader } from 'src/app/shared/interfaces/reader';
import { FormControl } from '@angular/forms';
import { SearchValueService } from 'src/app/shared/services/search-value.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-readers',
  templateUrl: './books-readers.component.html',
  styleUrls: ['./books-readers.component.scss']
})
export class BooksReadersComponent implements OnInit {

  //Variables
  //Storing books
  //Originals
  allBooks: Array<Book> = [];
  //Filtered
  filteredAllBooks: Array<Book> = [];
  //Chosen filters
  searchControl = new FormControl();
  ratingFilters: Array<Number> = [1, 2, 3, 4, 5];
  ratingFiltersObject: any;
  genresFilters: Array<string> = [];
  opened = false;
  search: string = '';
  copyOfSearch: string = '';
  subscription: Subscription = new Subscription;
  searchValue = '';
  flag = false;

  constructor(private bookService: BookService, private readerService: ReaderService,
    private _searchValueService: SearchValueService, private router:Router) {
  }
  ngOnInit() {
    
    this.subscription = this._searchValueService.getSearchValue().subscribe((searchValue) => {
      this.copyOfSearch = this.search;
      this.search = searchValue;
      this.flag = true;
      //Get initial data from the database
      this.getAllBooks();
    })

    //Initialize filtered books as original books
    this.filteredAllBooks = this.allBooks;
    //Whenever the search bar texts changes filterBooks, this way while the user types he/she can see the books with that filter criteria (like netflix)
    this.searchControl.valueChanges.subscribe(() => {
      this.filterBooks();
    });
  }


  //Functions
  //Get integer part of averageRating, in order to calculate how many stars to display in html
  getStars(averageRating: number): string[] {
    const integer = Math.floor(averageRating);
    const stars = [];
    for (let i = 0; i < integer; i++) {
      stars.push('★');
    }
    return stars;
  }

  //Get all books from database
  getAllBooks() {
    this.bookService.getBooks().subscribe((response: any) => {
      this.allBooks = response;
      this.filteredAllBooks = this.allBooks;
      if (this.flag) {
        this.filterBooks();
      }
    })
  }

  //Filtering
  //Get selected rating values
  getRatingFilters(ratings: any[] | undefined) {
    this.ratingFiltersObject = ratings;
    this.ratingFilters = [];
    //If a valid event is triggered (check/uncheck boxes)
    if (ratings != undefined && ratings.length > 0) {
      for (let i = 0; i < 5; i++) {
        //Check which ratings were chosen by the reader and save them 
        if (ratings[i].checked == true) {
          this.ratingFilters.push(i + 1);
        }
      }
      //If no checkboxes are marked, show all ratings
      if (this.ratingFilters.length == 0) {
        this.ratingFilters = [1, 2, 3, 4, 5]
      }
    } else { //Not a valid event, show all ratings
      this.ratingFilters = [1, 2, 3, 4, 5]
    }
    return this.ratingFilters;
  }
  getGenresFilters(genres: any[] | undefined) {
    this.genresFilters = [];
    if (genres != undefined && genres.length > 0) {
      for (let i = 0; i < genres.length; i++) {
        this.genresFilters.push(genres[i].toLowerCase());
      }
      if (this.genresFilters.length == 0) {
        for (let i = 0; i < this.allBooks.length; i++) {
          this.genresFilters.push(this.allBooks[i].genre.toLowerCase());
        }
      }
    } else {
      for (let i = 0; i < this.allBooks.length; i++) {
        this.genresFilters.push(this.allBooks[i].genre.toLowerCase());
      }
    }
  }
  filterBySearchValues() {
    if (this.flag) {
      this.searchValue = this.search;
      this.flag = !this.flag;

    } else {
      this.searchValue = this.searchControl.value
    }
    if (this.searchValue != null && this.searchValue != '') {
      const search = this.searchValue.toLowerCase();
      this.filteredAllBooks = this.allBooks.filter((book: any) =>
        book.title.toLowerCase().includes(search)
      );
    } else {
      this.filteredAllBooks = this.allBooks;
    }
  }
  filterByRating(ratings: any[] | undefined) {
    this.ratingFilters = this.getRatingFilters(ratings);
    this.filteredAllBooks = this.filteredAllBooks.filter(book =>
      this.ratingFilters.includes(Math.floor(book.averageRating))
    );
  }
  filterByGenres(genres?: any) {
    this.getGenresFilters(genres);
    this.filteredAllBooks = this.filteredAllBooks.filter(book =>
      this.genresFilters.includes(book.genre.toLowerCase())
    );
  }
  filterBooks(ratings?: any[], genres?: any) {
    this.filterBySearchValues();
    let ratingToUse: any;
    if (ratings != undefined) {
      ratingToUse = ratings
    } else {
      ratingToUse = this.ratingFiltersObject
    }
    this.filterByRating(ratingToUse);
    let genreToUse: any;
    if (genres != undefined) {
      genreToUse = genres
    } else {
      genreToUse = this.genresFilters
    }
    this.filterByGenres(genreToUse);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  selectBook(id: string){
    this.router.navigate([`/readers/${id}`])
  }
}
