import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorService } from 'src/app/shared/services/author.service';
import { Author } from 'src/app/shared/interfaces/author';
import { ConfirmationDialogComponent } from '../../readers/confirmation-dialog/confirmation-dialog.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.scss']
})
export class AuthorProfileComponent {
  authorId="";
  author:any;
  fileName = '';
  file:any;
  id = '';
  isLoading = true;
  isError = false;
  isEditModeEnabled = false;
  profile: Author = {
    _id: "",
    name: "",
    user: '',
    email: '',
    city: '',
    image: '',
    password: ''
  };
  profileForm: any;

  constructor(
    private authorService: AuthorService,
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
    });
  }

  ngOnInit(): void {
    this.authorId = this.authorId = this.authService.getLoginUser();
    this.getCurrentReader();
  }
  getCurrentReader(){
    this.authorService.getOneAuthor(this.authorId).subscribe((response:any)=>{
      this.profile=response;
      this.isLoading = false;
      this.profileForm.patchValue({
        name: this.profile.name,
        email: this.profile.email,
        password: this.profile.password,
        city: this.profile.city
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
      city: this.profile.city
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
        const updatedProfile: Author = {
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
          this.authorService.uploadPhoto(formData, this.id).subscribe((response:any)=>{
            updatedProfile.image=environment.apiUrl+"image/"+this.id +"."+ext;
            this.authorService.updateAuthor(updatedProfile, this.id).subscribe((response:any)=>{
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
          this.authorService.updateAuthor(updatedProfile, this.profile._id).subscribe(
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





