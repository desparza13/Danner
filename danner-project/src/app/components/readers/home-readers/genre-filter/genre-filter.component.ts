import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-genre-filter',
  templateUrl: './genre-filter.component.html',
  styleUrls: ['./genre-filter.component.scss']
})
export class GenreFilterComponent {
  constructor() {
    this.filteredGenres = this.genreCtrl.valueChanges.pipe(
      startWith(null),
      map((genre: string | null) => (genre ? this._filter(genre) : this.allGenres.slice())),
    );
  }
  //Genre chips' variables
  separatorKeysCodes: number[] = [ENTER, COMMA];
  genreCtrl = new FormControl('');
  filteredGenres: Observable<string[]>;
  genres: string[] = [];
  allGenres: string[] = ['fiction',
                          'romance', 
                          'non-fiction', 
                          'classics',
                          'historical-fiction',
                          'biography',
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

  //Functions to manage the genre chips
  //Add and create new chip
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

  //Delete a chip
  remove(genre: string): void { 
    const index = this.genres.indexOf(genre);
    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  //Create a chip when autocomplete value gets selected
  selected(event: MatAutocompleteSelectedEvent): void { 
    this.genres.push(event.option.viewValue);
    this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }

  //Autocomplete filter function
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allGenres.filter(genre => genre.toLowerCase().includes(filterValue));
  }
}
