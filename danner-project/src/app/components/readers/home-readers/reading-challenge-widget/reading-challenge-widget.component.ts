import { Component } from '@angular/core';

@Component({
  selector: 'app-reading-challenge-widget',
  templateUrl: './reading-challenge-widget.component.html',
  styleUrls: ['./reading-challenge-widget.component.scss']
})
export class ReadingChallengeWidgetComponent {
  readingChallengeProgress: number = 50;
  constructor(){
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
}
