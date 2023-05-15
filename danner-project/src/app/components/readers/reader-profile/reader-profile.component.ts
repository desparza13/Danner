import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reader-profile',
  templateUrl: './reader-profile.component.html',
  styleUrls: ['./reader-profile.component.scss']
})
export class ReaderProfileComponent {
  readerId="";
  fileName = '';
  file:any;
  id = '';
  reader: any;
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
  typeUser= '';

  constructor(
    private readerService: ReaderService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { 
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$')]],
      city: ['', Validators.required],
      readingChallenge: [1, Validators.min(1)]
    });
  }

  ngOnInit(): void {
    this.readerId = this.authService.getLoginUser();
    this.typeUser = this.authService.getTypeUser();
    this.getCurrentReader();
  }
  getCurrentReader(){
    this.readerService.getOneReader(this.readerId).subscribe((response:any)=>{
      this.profile=response;
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
        this.id = updatedProfile._id;
        if (this.file){
          this.fileName = this.file.name;
          const ext = this.fileName.split('.').pop();
          const formData = new FormData();
          formData.append("file", this.file);
          this.readerService.uploadPhoto(formData, this.id).subscribe((response: any)=>{
            updatedProfile.image=environment.apiUrl+"image/"+this.id +"."+ext;
            this.readerService.updateReader(updatedProfile, this.id).subscribe((response:any)=>{
                this.isEditModeEnabled = false;
                this.snackBar.open('Profile updated successfully', 'Close', {
                duration: 3000
                });
                this.profile = response;            
            },
            (error)=>{
              console.log(error);
              this.snackBar.open('There was an error updating your profile. Please try again later.', 'Close', {
                duration: 3000
              });         
            })
          })
        }else{
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
      }
    });
  }
  onFileSelected(event:any) {
    const file:File = event.target.files[0];
    this.fileName = file.name;
    console.log(file);
    this.file = file;
  }
}





