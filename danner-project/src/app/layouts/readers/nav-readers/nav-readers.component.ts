import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { FriendshipRequest } from 'src/app/shared/interfaces/friendship-request';
import { FriendshipRequestService } from 'src/app/shared/services/friendship-request.service';
import { Review } from 'src/app/shared/interfaces/review';
import { ReviewService } from 'src/app/shared/services/review.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { SearchValueService } from 'src/app/shared/services/search-value.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

interface Notification {
  likes: [],
  book: string
}

@Component({
  selector: 'app-nav-readers',
  templateUrl: './nav-readers.component.html',
  styleUrls: ['./nav-readers.component.scss']
})

export class NavReadersComponent implements OnInit{
  books:boolean = false;
  search: string = '';
  currentUser: any;
  userId = ''
  reader: Reader = {
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

  friendName: string = '';
  requests: Array<FriendshipRequest> = [];
  reviews: Array<Review> = [];
  notifications: Array<Notification> = [];
  filterReviews: Array<Review> = [];
  filterRequests: Array<FriendshipRequest> = [];
  lengthRequests:number =0;
  lengthNotifications: number = 0;
  subscription: Subscription = new Subscription;
  searchValue = '';
  ngOnInit() {
    this.userId = this.authService.getLoginUser();

    this.getReviews();
    this.getRequests();
    this.getCurrentReader();
    this.subscription = this._searchValueService.getSearchValue().subscribe((searchValue)=>{
      this.searchValue = searchValue;
    })
    console.log('nav '+ this.searchValue);
  }

  sendSearch(){
    this.books=true;
    console.log(this.search);
    this._searchValueService.setSearchValue(this.search);
    console.log('redirigir');

  }
  constructor(private friendshipRequestService: FriendshipRequestService,
    private reviewService: ReviewService,
    private readerService: ReaderService, private _snackBar: MatSnackBar, private _searchValueService: SearchValueService,
    private router: Router, private authService: AuthService) {
  }

  //Get the current reader
  getCurrentReader() {
    this.readerService.getOneReader(this.userId).subscribe((response: any) => {
      this.reader = response;
    }), (error: HttpErrorResponse) => {
      // Handle error
      
    }
  }

  //Get the requests
  getRequests() {
    this.friendshipRequestService.getRequests().subscribe((response: any) => {
      this.requests = response;
    })

    //Filter the requests by active reader
    this.getFilterRequests();
  }

  //Get active reader reviews
  getReviews() {
    this.reviewService.getReviews().subscribe((response: any) => {
      this.reviews = response;
      
    })

    //Filter the reviews by active reader
    this.getFilterReviews();
  }

  //Filter the reviews by active reader
  getFilterReviews() {
    console.log('filtrar');
    const filter = this.reviews.filter((review) => {

      return review.userId._id === this.reader._id;
    });
    this.filterReviews = filter;
    console.log(this.filterReviews);
    this.filterReviews.forEach((review)=>{
      this.lengthNotifications+= review.likes.length;

    })
    console.log(this.lengthNotifications);
    console.log(this.filterReviews)
  }

  //Filter the requests by active reader
  getFilterRequests() {
    console.log('filtrar request');
    const filter = this.requests.filter((request) => {
      console.log(request.status)
      return request.idReceiver._id === this.reader._id && request.status == false;
    });
    console.log(filter)
    this.filterRequests = filter;
    this.lengthRequests= this.filterRequests.length;
    console.log(this.lengthRequests);
  }

  //Function that is activated when the notification button is clicked.
  iconWrapNotifications() {
    this.getReviews();
  }

  //Function that is activated when the FriendshipRequest button is clicked.
  iconWrapRequests() {
    this.getRequests();

  }

  updateRequest( idRequest: string){
    this.friendshipRequestService.updateRequest({ status: true }, idRequest).subscribe(response => {
      console.log(response);
      this.getRequests();
    })
  }

  deleteRequest(idRequest: string){
    this.friendshipRequestService.deleteRequest(idRequest).subscribe((response:any)=>{
      console.log(response);
      this.getRequests();
    })
  }
  confirmFriendRequest(idRequest: string, idReader: string, name: string) {
    var friend: Reader = {
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
    this.reader.friends.push(idReader);
    console.log(this.reader);
    //update the current reader friends
    this.readerService.updateReader(this.reader, this.reader._id).subscribe()

    this.readerService.getOneReader(idReader).subscribe((response:any)=>{
        friend = response;
        friend.friends.push(this.reader._id);
        this.readerService.updateReader(friend, idReader).subscribe()
        this.updateRequest(idRequest);
        this.openConfirmSnackBar(name,'Aceptar');
    })
    
  }

  signOut() {
    this.authService.deleteToken();
    this.authService.deleteLoginUser();
    this.router.navigate(['']);
  }

  deleteFriendRequest(idRequest: string, name: string) {
    this.deleteRequest(idRequest)
    this.openDeleteSnackBar(name, 'Aceptar');
  }

  openConfirmSnackBar(message: string, action: string) {
    this._snackBar.open('Se acepto la solicitud de ' + message, action);
    
  }

  openDeleteSnackBar(message: string, action: string) {
    this._snackBar.open('Se rechazo la solicitud de ' + message, action);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
