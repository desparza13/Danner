import { Component, Input } from '@angular/core';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-reading-challenge',
  templateUrl: './reading-challenge.component.html',
  styleUrls: ['./reading-challenge.component.scss'],
  animations: [
    trigger('carousel', [
      state('start', style({ transform: 'translateX(0%)' })),
      state('end', style({ transform: 'translateX(-100%)' })),
      transition('start <=> end', animate('10s linear'))
    ])
  ]
})
export class ReadingChallengeComponent {
  public carouselState = 'start';
  readerId = "";
  reader: any;
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
  finishedBooks: any;
  finishedBooksCarrousel: any = [];
  size: any;
  readingChallengeProgress: string = '0';
  track: any;

  ngOnInit() {
    this.readerId = this.authService.getLoginUser();

    this.getCurrentReader();
  }
  constructor(private readerService: ReaderService, private authService: AuthService) {
    this.startCarousel();
  }
  getCurrentReader() {
    this.readerService.getOneReader(this.readerId).subscribe((response: any) => {
      this.currentReader = response;
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
    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < this.finishedBooks.length; i++) {
        this.finishedBooksCarrousel.push(this.finishedBooks[i])
      }
    }
  }
  getProgress() {
    let progress = (this.finishedBooks.length * 100) / this.currentReader.readingChallenge;
    this.readingChallengeProgress = (progress.toFixed(2));
  }
  startCarousel(): void {
    setInterval(() => {
      this.finishedBooks.push(this.finishedBooks.shift()!);
    }, 10000);
  }
}
