import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

import { FriendshipRequest } from 'src/app/shared/interfaces/friendship-request';
import { FriendshipRequestService } from 'src/app/shared/services/friendship-request.service';
import { Review } from 'src/app/shared/interfaces/review';
import { ReviewService } from 'src/app/shared/services/review.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';

interface Notification {
  likes: [],
  book: string
}

@Component({
  selector: 'app-nav-readers',
  templateUrl: './nav-readers.component.html',
  styleUrls: ['./nav-readers.component.scss']
})


export class NavReadersComponent {
  search: string = '';
  userId = '643ebe548e5f84dad3b0c99c'
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
  };

  friendName: string = '';
  requests: Array<FriendshipRequest> = [];
  reviews: Array<Review> = [];
  notifications: Array<Notification> = [];
  filterReviews: Array<Review> = [];
  filterRequests: Array<FriendshipRequest> = [];

  hiddenNotifications = true;
  hiddenProfile = true;
  hiddenRequests = true;

  ngOnInit() {
    this.getReviews();
    this.getRequests();
    this.getCurrentReader();
  }

  fil(){
    console.log('hiciste click',this.search);

  }
  constructor(private friendshipRequestService: FriendshipRequestService,
    private reviewService: ReviewService,
    private readerService: ReaderService, private _snackBar: MatSnackBar) {
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
      this.filterReviews = this.reviews;
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
    console.log(this.filterReviews)
  }

  //Filter the requests by active reader
  getFilterRequests() {
    console.log('filtrar request');
    const filter = this.requests.filter((request) => {
      console.log(request.status)
      return request.idReceiver._id === this.reader._id && request.status == true;
    });
    console.log(filter)
    this.filterRequests = filter;
  }

  //Function that is activated when the profile button is clicked.
  iconWrapProfile() {
    this.hiddenNotifications = true;
    this.hiddenRequests = true;
  }
  //Function that is activated when the notification button is clicked.
  iconWrapNotifications() {
    //open the FriendshipRequest window and hide the other windows.
    this.hiddenNotifications = !this.hiddenNotifications;
    this.hiddenProfile = true;
    this.hiddenRequests = true;
    //If the window is active, the reviews are consulted again.
    if (!this.hiddenNotifications) {
      this.getReviews();
    }
  }

  //Function that is activated when the FriendshipRequest button is clicked.
  iconWrapRequests() {
    //open the FriendshipRequest window and hide the other windows.
    this.hiddenRequests = !this.hiddenRequests;
    this.hiddenProfile = true;
    this.hiddenNotifications = true;
    //If the window is active, the FriendshipRequest are consulted again.
    if (!this.hiddenRequests) {
      this.getRequests();
    }
  }

  updateRequest(name: string, idRequest: string){
    this.friendshipRequestService.updateRequest({ status: false }, idRequest).subscribe(response => {
      console.log(response);
    })
  }

  confirmFriendRequest(idRequest: string, idReader: string, name: string) {
    this.reader.friends.push(idReader);
    console.log(this.reader);
    this.readerService.updateReader(this.reader, this.reader._id)
    
    this.updateRequest(name,idRequest);
    
    this.hiddenRequests=!this.hiddenRequests;
    this.openConfirmSnackBar(name, 'Aceptar');
    this.getRequests();
  }

  deleteFriendRequest(idRequest: string, name: string) {
    this.updateRequest(name,idRequest);

    this.hiddenRequests=!this.hiddenRequests;
    this.openDeleteSnackBar(name, 'Aceptar');
    this.getRequests();
  }

  openConfirmSnackBar(message: string, action: string) {
    this._snackBar.open('Se acepto la solicitud de ' + message, action);
    
  }

  openDeleteSnackBar(message: string, action: string) {
    this._snackBar.open('Se rechazo la solicitud de ' + message, action);
  }

}
