import { Component, OnInit, ViewChild } from '@angular/core';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { FriendshipRequestService } from 'src/app/shared/services/friendship-request.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-friends-readers',
  templateUrl: './add-friends-readers.component.html',
  styleUrls: ['./add-friends-readers.component.scss']
})
export class AddFriendsReadersComponent {
  readerId = "";
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
  displayedColumns: string[] = ['image', 'name', 'user', 'email', 'city', 'actions'];
  dataSource = new MatTableDataSource<Reader>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions = [5, 10, 25, 50];
  pageSize = 5;
  socket: any;

  constructor(
    private readerService: ReaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private requestService: FriendshipRequestService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.readerId = this.authService.getLoginUser();
    this.socket = io(environment.apiUrl)

    this.getData();
    this.getRequests();
  }
  getData() {
    this.readerService.getOneReader(this.readerId).subscribe((response: any) => {
      this.currentReader = response;
      this.friends = this.currentReader.friends;
      this.getReaders();
    });
  }
  getReaders() {
    this.readerService.getReaders().subscribe((response: any) => {
      this.readers = response;
      console.log("All readers", this.readers);
      this.filteredReaders = this.readers.filter((reader: Reader) => reader._id != this.currentReader._id);
      console.log("Filtered readers", this.filteredReaders);
      this.dataSource.data = this.filteredReaders;
      this.dataSource.paginator = this.paginator;
    });
  }
  getRequests() {
    this.requestService.getRequests().subscribe((response: any) => {
      this.requests = response;
    })
  }
  applyFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onPageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
  }
  clearSearch(): void {
    this.searchValue = '';
    this.applyFilter();
  }

  chooseAction(reader: Reader, friendId: string) {
    if (this.currentReader.friends.some((friend: any) => friend._id === reader._id)) {
      return "remove";
    }
    return this.checkPending(friendId);
  }
  checkPending(friendId: string) {
    // console.log("requests sent",this.requests)
    let requestsSent = this.requests.filter((request: any) => this.currentReader._id == request.idSender._id);
    // console.log("requests filter1",requestsSent)
    requestsSent = requestsSent.filter((request: any) => friendId == request.idReceiver._id);
    // console.log("requests filter2",requestsSent)
    if (requestsSent.length > 0) {
      return "undo"
    }else if(this.requests.some((request: any) => {
      return request.idReceiver._id === this.readerId && request.idSender._id === friendId
    })){
      return "pending"
    }
    return "add"
  }
  action(reader: Reader, friendId: string) {
    let request:any = this.requests.filter((request: any) => {
      return request.idReceiver._id === friendId && request.idSender._id === this.readerId
    })
    if (request.length != 0) {
      this.undoRequest(friendId,request[0]._id);
    }else if (this.currentReader.friends.some((friend: any) => friend._id === reader._id)) {
      this.removeFriend(friendId);
    } else if(this.requests.some((request: any) => {
      return request.idReceiver._id === this.readerId && request.idSender._id === friendId
    })){
      console.log('pendiente');
    }
    else {
      this.addFriend(friendId);
    }
  }
  undoRequest(friendId:string,requestId: string) {
    console.log(requestId);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Do you want to undo the friendship request?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.socket.emit('joinReader', { idReader: friendId }); //Añadir al lector al grupo del amigo

        this.requestService.deleteRequest(requestId).subscribe((response: any) => {
          this.socket.emit('deleteRequest', response); //Mandar la solcitud de amistad

          console.log(response)
          this.getRequests();
          this.snackBar.open('Friend request undo', 'Close', {
            duration: 3000
          });
        });

        this.socket.emit('leaveReader', { idReader: friendId });

      }
    });
  }

  addFriend(friendId: string) {
    let updatedReader = this.currentReader;
    updatedReader.friends.push(friendId);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Do you want to send the friendship request?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.socket.emit('joinReader', { idReader: friendId }); //Añadir al lector al grupo del amigo
        let request = {
          idSender: this.currentReader._id,
          idReceiver: friendId,
          status: false
        }
        this.requestService.postRequest(request).subscribe((response: any) => {
          console.log(response)
          this.socket.emit('sendRequest', response); //Mandar la solcitud de amistad
          this.getRequests();

          this.snackBar.open('Friend request sent', 'Close', {
            duration: 3000
          });
        });

        this.socket.emit('leaveReader', { idReader: friendId });

      }
    });

  }
  removeFriend(friendId: string) {
    let updatedReader = this.currentReader
    console.log(updatedReader);
    let friendProfile
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to delete the friend? This action can not be undone'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.readerService.getOneReader(friendId).subscribe((response: any) => {
          friendProfile = response;
          console.log(friendProfile)
          friendProfile.friends = friendProfile.friends.filter((friend: any) => friend._id !== this.currentReader._id);
          this.readerService.updateReader(friendProfile, friendProfile._id).subscribe(
            (response: any) => {
              console.log(response);
              this.getRequests();

            },
            (error) => {
              console.log(error);
              this.snackBar.open('There was an error removing the friend. Please try again later.', 'Close', {
                duration: 3000
              });
            }
          );
        });
        updatedReader.friends = updatedReader.friends.filter((friend: any) => friend._id !== friendId);

        this.readerService.updateReader(updatedReader, this.currentReader._id).subscribe(
          (response: any) => {
            this.snackBar.open('Friend removed successfully', 'Close', {
              duration: 3000
            });
            console.log("update response", response)
            this.getData()
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

