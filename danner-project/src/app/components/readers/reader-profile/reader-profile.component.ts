import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reader-profile',
  templateUrl: './reader-profile.component.html',
  styleUrls: ['./reader-profile.component.scss']
})
export class ReaderProfileComponent {
  readerId="643d9026c9e38d96582f4528";
  isLoading = true;
  isError = false;
  isEditModeEnabled = false;
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
  profileForm: any;

  constructor(
    private readerService: ReaderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { 
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      city: ['', Validators.required],
      readingChallenge: [1, Validators.min(1)]
    });
  }

  ngOnInit(): void {
    this.getCurrentReader();
  }
  getCurrentReader(){
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.profile=response;
      console.log("Reader",this.profile);
      this.isLoading = false;
      this.profileForm.patchValue({
        name: this.profile.name,
        email: this.profile.email,
        password: this.profile.password,
        city: this.profile.city,
        readingChallenge: this.profile.readingChallenge
      });
    },
    (error)=>{
      console.log(error);
      this.isLoading = false;
      this.isError = true;
    });
  }
  enableEditMode() {
    this.isEditModeEnabled = true;
  }

  cancelEdit() {
    this.isEditModeEnabled = false;
    this.profileForm.reset({
      name: this.profile.name,
      email: this.profile.email,
      password: this.profile.password,
      city: this.profile.city,
      readingChallenge: this.profile.readingChallenge
    });
  }

  confirmEdit(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        message: 'Are you sure you want to update your profile?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedProfile: Reader = {
          ...this.profile,
          ...this.profileForm.value
        };
        updatedProfile._id = this.profile._id;
        updatedProfile.__v = this.profile.__v;

        this.readerService.updateReader(updatedProfile, this.profile._id).subscribe(
          (response: any) => {
            this.isEditModeEnabled = false;
            this.snackBar.open('Profile updated successfully', 'Close', {
              duration: 3000
            });
            this.profile = response;
          },
          (error) => {
            console.log(error);
            this.snackBar.open('There was an error updating your profile. Please try again later.', 'Close', {
              duration: 3000
            });
          }
        );
      }
    });
  }
}





