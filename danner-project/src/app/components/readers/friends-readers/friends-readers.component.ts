import { Component, ViewChild } from '@angular/core';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-friends-readers',
  templateUrl: './friends-readers.component.html',
  styleUrls: ['./friends-readers.component.scss']
})
export class FriendsReadersComponent {
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
  filteredFriends: any[] = [];
  searchValue = '';
  displayedColumns: string[] = ['image','name', 'user', 'email', 'city', 'actions'];
  dataSource = new MatTableDataSource<Reader>([]);

  constructor(
    private readerService: ReaderService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService
    ) { 

    }

  ngOnInit(){
    this.readerId = this.authService.getLoginUser();

    this.getCurrentReader();

  }
  getCurrentReader(){
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.currentReader=response;
      console.log("Reader",this.currentReader)
      this.friends = this.currentReader.friends;
      console.log(this.friends)
      this.filteredFriends = this.friends;
      this.dataSource.data = this.friends;
    });
  }
  applyFilter(): void {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }
  clearSearch(): void {
    this.searchValue = '';
    this.applyFilter();
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
