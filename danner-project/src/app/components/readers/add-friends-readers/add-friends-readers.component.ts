import { Component, ViewChild } from '@angular/core';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FriendshipRequestService } from 'src/app/shared/services/friendship-request.service';
import { response } from 'express';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-add-friends-readers',
  templateUrl: './add-friends-readers.component.html',
  styleUrls: ['./add-friends-readers.component.scss']
})
export class AddFriendsReadersComponent {
  readerId="";
  reader: any;
  currentReader: any = {
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
  friends: any[] = [];
  readers: any[] = [];
  filteredReaders: any[] = [];
  requests: any[] = [];
  searchValue = '';
  displayedColumns: string[] = ['image','name', 'user', 'email', 'city', 'actions'];
  dataSource = new MatTableDataSource<Reader>([]);
  function = "add";

  constructor(
    private readerService: ReaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private requestService:FriendshipRequestService,
    private authService: AuthService
    ) { 

    }

  ngOnInit(){
    this.readerId = this.authService.getLoginUser();
    this.getCurrentReader();
    this.getReaders();
    this.getRequests();
  }
  getCurrentReader(){
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.currentReader=response;
      console.log("Reader",this.currentReader)
      this.friends = this.currentReader.friends;
    });
  }
  getReaders(){
    this.readerService.getReaders().subscribe((response:any)=>{
      this.readers=response;
      console.log("Readers",this.readers)
      this.filteredReaders = this.readers;
      this.dataSource.data = this.filteredReaders;
    });  
  }
  getRequests(){
    console.log("BUSCAR REQUESTS")
    this.requestService.getRequests().subscribe((response:any)=>{
      console.log("RESPONSE",response)
      this.requests = response;
    })
  }
  applyFilter(): void {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }
  clearSearch(): void {
    this.searchValue = '';
    this.applyFilter();
  }

  chooseAction(reader: Reader, friendId:string){
    if (this.currentReader.friends.some((friend: any) => friend._id === reader._id)) {
      return "remove";
    }
    return this.checkPending(reader, friendId);
  }
  checkPending(reader: Reader, friendId:string){
    // console.log("requests sent",this.requests)
    let requestsSent = this.requests.filter((request:any) => this.currentReader._id == request.idSender);
    // console.log("requests filter1",requestsSent)
    requestsSent = this.requests.filter((request:any) => friendId == request.idReceiver);
    // console.log("requests filter2",requestsSent)
    if(requestsSent.length>0){
      return "pending"
    }
    return "add"
  }
  action(reader: Reader, friendId:string){
    if (this.currentReader.friends.some((friend: any) => friend._id === reader._id)) {
      this.removeFriend(reader, friendId);
    }else{
      this.addFriend(reader, friendId);
    }
  }
  addFriend(reader: Reader, friendId:string){
    let updatedReader = this.currentReader;
    updatedReader.friends.push(friendId);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Do you want to send the friendship request?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        let request = {
          idSender: this.currentReader._id,
          idReceiver: friendId,
          status: false
        }
        this.requestService.postRequest(request).subscribe((response:any)=>{
          console.log(response)
          this.snackBar.open('Friend request sent', 'Close', {
            duration: 3000
          });
        })
      }
    });
    
  }
  removeFriend(reader: Reader, friendId:string) {
    let updatedReader = this.currentReader
    updatedReader.friends = updatedReader.friends.filter((friend:any) => friend._id !== friendId);
    let friendProfile
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to delete the friend? This action can not be undone'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.readerService.getOneReader(friendId).subscribe((response:any)=>{
          friendProfile=response;
          console.log(friendProfile)
          friendProfile.friends = friendProfile.friends.filter((friend:any) => friend._id !== this.currentReader._id);
          this.readerService.updateReader(friendProfile, friendProfile._id).subscribe(
            (response: any) => {
              console.log(response);
            },
            (error) => {
              console.log(error);
              this.snackBar.open('There was an error removing the friend. Please try again later.', 'Close', {
                duration: 3000
              });
            }
          );
        });
        this.readerService.updateReader(updatedReader, this.currentReader._id).subscribe(
          (response: any) => {
            this.snackBar.open('Friend removed successfully', 'Close', {
              duration: 3000
            });
            console.log("update response",response)
            this.getCurrentReader()
          },
          (error) => {
            console.log(error);
            this.snackBar.open('There was an error removing the friend. Please try again later.', 'Close', {
              duration: 3000
            });
          }
        );
      }
    });
  }
}

