import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { BookService } from 'src/app/shared/services/book.service';
import { Book } from 'src/app/shared/interfaces/book';

@Component({
  selector: 'app-home-readers',
  templateUrl: './home-readers.component.html',
  styleUrls: ['./home-readers.component.scss']
})
export class HomeReadersComponent {
  books: Array<Book>=[];
  getStars(averageRating: number) {
    return Array(Math.floor(averageRating)).fill(0).map((x,i)=>i);
  }

  //Menu toggle
  opened = false;
  //Ratings checkboxes
  panelOpenState = false;
  ratings = [
    { name: '1 star', checked: false, index:0 },
    { name: '2 stars', checked: false, index:1 },
    { name: '3 stars', checked: false, index:2 },
    { name: '4 stars', checked: false, index:3 },
    { name: '5 stars', checked: false, index:4 }
  ];
  //Genre chips
  separatorKeysCodes: number[] = [ENTER, COMMA];
  genreCtrl = new FormControl('');
  filteredGenres: Observable<string[]>;
  genres: string[] = [];
  allGenres: string[] = ['fiction',
                          'romance', 
                          'non-fiction', 
                          'classics',
                          'historical-fiction',
                          'audiobook',
                          'adult',
                          'historical',
                          'novel',
                          'adventure',
                          'literature',
                          'humor',
                          'psichology',
                          'memoir',
                          'chick-lit',
                          'historical-romance',
                          'dystopia'];

  @ViewChild('genreInput')
  genreInput!: ElementRef<HTMLInputElement>;
  readingChallengeProgress: number = 80;
  constructor(private bookService:BookService) {
    this.getAllBooks();
    this.filteredGenres = this.genreCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => (genre ? this._filter(genre) : this.allGenres.slice())),
    );
    console.log(this.books);
    //Reading challenge 
    window.onload = function() {
    const book1 = document.getElementById('book1') as HTMLElement;
    const book2 = document.querySelector('#book2') as HTMLDivElement;
    const book3 = document.querySelector('#book3') as HTMLDivElement;
    const book4 = document.querySelector('#book4') as HTMLDivElement;
    const book5 = document.querySelector('#book5') as HTMLDivElement;
    const book6 = document.querySelector('#book6') as HTMLDivElement;
    const book7 = document.querySelector('#book7') as HTMLDivElement;
    const book8 = document.querySelector('#book8') as HTMLDivElement;
    book1.style.backgroundImage = 'url(https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722941l/6148028._SY75_.jpg)'; 
    book2.style.backgroundImage = 'url(https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1618293107l/55404546._SY75_.jpg)';
    book3.style.backgroundImage = 'url(https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722918l/7260188._SY75_.jpg)';
    book4.style.backgroundImage = 'url(https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052._SX50_.jpg)';
    book5.style.backgroundImage = 'url(https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1612716464l/56981769._SY75_.jpg)';
    book6.style.backgroundImage = 'url(https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1533562564l/41057388._SY75_.jpg)';
    book7.style.backgroundImage = 'url(https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1660804580l/33160963._SX98_.jpg)';
    book8.style.backgroundImage = 'url(https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1602570691l/53138095._SY160_.jpg)';
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    // Add genre
    if (value) {
      this.genres.push(value);
    }
    // Clear the input value
    event.chipInput!.clear();
    this.genreCtrl.setValue(null);
  }

  remove(genre: string): void {
    const index = this.genres.indexOf(genre);
    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.genres.push(event.option.viewValue);
    this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }
  getAllBooks(){
    this.bookService.getBooks().subscribe((response:any)=>{
      console.log(response);
      this.books=response;
    })
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(genre => genre.toLowerCase().includes(filterValue));
  }

}
