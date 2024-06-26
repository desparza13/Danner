import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/shared/interfaces/book';
import { BookService } from 'src/app/shared/services/book.service';
import { Review } from 'src/app/shared/interfaces/review';
import { ReviewService } from 'src/app/shared/services/review.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book: Book = {
    _id: '',
    title: '',
    date: new Date(),
    image: '',
    genre: '',
    author: '',
    averageRating: 0,
    description: '',
    pages: 0,
    showDescription: false
  }
  reader: any;
  readerId: string = '';
  profile: Reader = {
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
  isLoading = true;
  friends: Array<String> = [];
  current: Array<String> = [];
  tbr: Array<String> = [];
  finished: Array<String> = [];
  reviews: Array<Review> = [];
  filterReviews: Array<Review> = [];
  rating = new FormControl('', [Validators.required]);
  review = new FormControl('');
  bookId = '';
  socket: any;

  constructor(
    private bookService: BookService,
    private reviewService: ReviewService,
    private readerService: ReaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {

  }
  ngOnInit() {
    const url = this.router.url.split('/');
    this.bookId = url[2];
    this.socket = io(environment.apiUrl)

    //Detectar nuevas reviews
    this.socket.on('newReview', (data: any) => {
      this.reviewService.getOneReview(data._id).subscribe((response: any) => {
        this.filterReviews.push(response);
        this.isLoading = false;
      }, (error) => {
        console.log(error);
        this.snackBar.open('There was an error. Please try again later.', 'Close', {
          duration: 3000
        });
      })
    })

    //Unir al lector al grupo del libro indicado
    this.socket.emit('joinBookDetails',{idBook:this.bookId});

    this.getBook()
    this.readerId = this.authService.getLoginUser();
    this.getData();
  }

  ngOnDestroy(){
    //Desconectar el socket y sacar al lector del grupo del libro
    this.socket.emit('leaveBookDetails',{idBook:this.bookId});
  }
  getBook() {
    this.bookService.getOneBook(this.bookId).subscribe((response: any) => {
      this.book = response;
    })
  }
  getData() {
    this.readerService.getOneReader(this.readerId).subscribe((response: any) => {
      this.profile = response;
      this.friends = response.friends.map((friend: Reader) => friend._id);
      this.current = response.reading.map((book: any) => book.bookId._id);

      this.finished = response.read.map((book: any) => book.bookId._id);
      this.tbr = response.toBeRead.map((book: any) => book._id);
      this.reviewService.getReviews().subscribe((response: any) => {
        this.filterReviews = response;
        this.getFilterReviews();
      });
    },
      (error) => {
        this.isLoading = false;
      })
  }
  getFilterReviews() {
    this.filterReviews = this.filterReviews.filter((review) => {
      return review.bookId._id == this.book._id
    })
    this.isLoading = false;
  }

  likeIcon(review: Review) {
    let likes = review.likes.map((element: any) => {
      if(element.userId.hasOwnProperty('_id')){
        return element.userId._id;
      }
      else{
        return element.userId;
      }
    });
    if (likes.includes(this.readerId)) {
      return "favorite"
    }
    return "favorite_border"
  }
  currentBtn() {
    if (this.current.includes(this.book._id)) {
      return "Delete from currently reading"
    }
    return "Mark as currently reading"
  }
  finishedBtn() {
    if (this.finished.includes(this.book._id)) {
      return "Delete from finished list"
    }
    return "Mark as finished"
  }
  tbrBtn() {
    if (this.tbr.includes(this.book._id)) {
      return "Delete from to be read list"
    }
    return "Add to to be read list"
  }
  modifyCurrentList() {
    if (this.current.includes(this.book._id)) {
      this.profile.reading = this.profile.reading.filter((book: any) => book.bookId._id !== this.book._id);
    } else {
      let readingBook = {
        "bookId": this.book._id,
        "progress": 0
      }
      this.profile.reading.push(readingBook);
    }
    this.readerService.updateReader(this.profile, this.readerId).subscribe(
      (response: any) => {
        this.snackBar.open('Currently reading list edited successfully', 'Close', {
          duration: 3000
        });
        this.getData()
      },
      (error) => {
        console.log(error);
        this.snackBar.open('There was an error editing the currently reading list. Please try again later.', 'Close', {
          duration: 3000
        });
      }
    );
  }
  modifyFinishedList() {
    if (this.finished.includes(this.book._id)) {
      this.profile.read = this.profile.read.filter((book: any) => book.bookId._id !== this.book._id);
    } else {
      let finishedBook = {
        "bookId": this.book._id,
        "finishedDate": Date.now
      }
      this.profile.read.push(finishedBook);
    }
    this.readerService.updateReader(this.profile, this.readerId).subscribe(
      (response: any) => {
        this.snackBar.open('Finished reading list edited successfully', 'Close', {
          duration: 3000
        });
        this.getData()
      },
      (error) => {
        console.log(error);
        this.snackBar.open('There was an error editing the finished reading list. Please try again later.', 'Close', {
          duration: 3000
        });
      }
    );
  }
  modifyTbrList() {
    if (this.tbr.includes(this.book._id)) {
      this.profile.toBeRead = this.profile.toBeRead.filter((book: any) => book._id !== this.book._id);
    } else {
      this.profile.toBeRead.push(this.book._id);
    }
    this.readerService.updateReader(this.profile, this.readerId).subscribe(
      (response: any) => {
        this.snackBar.open('To be read list edited successfully', 'Close', {
          duration: 3000
        });
        this.getData()
      },
      (error) => {
        console.log(error);
        this.snackBar.open('There was an error editing the to be read reading list. Please try again later.', 'Close', {
          duration: 3000
        });
      }
    );
  }
  likeReview(review: Review) {
    let likes = review.likes.map((element: any) => {
      if(element.userId.hasOwnProperty('_id')){
        return element.userId._id;
      }
      else{
        return element.userId;
      }
    });
    if (likes.includes(this.readerId)) {

      review.likes = review.likes.filter((element: any) =>{
        if(element.userId.hasOwnProperty('_id')){
          return element.userId._id !== this.readerId;
        }
        else{
          return element.userId !== this.readerId;
        }});
    } else {
      this.socket.emit('joinReader',{idReader:review.userId._id}); //Añadir al lector al grupo del amigo
      review.likes.push({userId:this.readerId, date: new Date().getTime()});
    }
    this.reviewService.updateReview(review, review._id).subscribe(
      (response: any) => {
        this.socket.emit('sendNotification', response); //Mandar la solcitud de amistad
        review = response;
        this.socket.emit('leaveReader',{idReader:response.userId});

      },
      (error) => {
        console.log(error);
        this.snackBar.open('There was an error. Please try again later.', 'Close', {
          duration: 3000
        });
      }
    )
  }

  submitReview() {
    const review = {
      bookId: this.book._id,
      userId: this.profile._id,
      rating: this.rating.value,
      description: this.review.value || '',
      likes: []
    }

    this.reviewService.postReview(review).subscribe((response: any) => {
      this.socket.emit('sendReview', response); //Mandar la review
      this.isLoading = true;
      this.reviewService.getOneReview(response._id).subscribe((response: any) => {
        this.filterReviews.push(response);
        this.isLoading = false;
      }, (error) => {
        console.log(error);
        this.snackBar.open('There was an error. Please try again later.', 'Close', {
          duration: 3000
        });
      })

    },
      (error) => {
        console.log(error);
        this.snackBar.open('There was an error. Please try again later.', 'Close', {
          duration: 3000
        });
      })
  }
}
