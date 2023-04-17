import { Component } from '@angular/core';
import { Reader } from 'src/app/shared/interfaces/reader';
import { Book } from 'src/app/shared/interfaces/book';
import { ReaderService } from 'src/app/shared/services/reader.service';

@Component({
  selector: 'app-reading-challenge-widget',
  templateUrl: './reading-challenge-widget.component.html',
  styleUrls: ['./reading-challenge-widget.component.scss']
})
export class ReadingChallengeWidgetComponent {
  readerId="643d9026c9e38d96582f4528";
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
  finishedBooks: any;
  readingChallengeProgress: string = '0';
  
  constructor(private readerService:ReaderService){
    this.getCurrentReader();
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
  getCurrentReader(){
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.currentReader=response;
      console.log("Reader",this.currentReader)
      this.getFinishedBooks();
      this.getProgress();
    })
  }
  getFinishedBooks() {
    const currentYear = new Date().getFullYear();
    this.finishedBooks = this.currentReader.read.filter((book: any) => {
      const finishedYear = new Date(book.finishedDate).getFullYear();
      return finishedYear === currentYear;
    });
    console.log("Finished this year",this.finishedBooks);
  }
  getProgress(){
    let progress = (this.finishedBooks.length * 100) / this.currentReader.readingChallenge;
    this.readingChallengeProgress = (progress.toFixed(2));
  }
  
}
