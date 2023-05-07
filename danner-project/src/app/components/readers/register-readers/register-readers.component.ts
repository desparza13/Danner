import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Credentials } from 'src/app/shared/interfaces/credentials';
import { LoginService } from 'src/app/shared/services/login.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
@Component({
  selector: 'app-register-readers',
  templateUrl: './register-readers.component.html',
  styleUrls: ['./register-readers.component.scss']
})
export class RegisterReadersComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,  Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$')]);
  name = new FormControl('', [Validators.required]);
  user = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  readingChallenge = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6),  Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$')]);
  reader: Reader = {
    _id: '',
    name: '',
    user: '',
    email: '',
    city: '',
    password: '',
    read: [],
    toBeRead: [],
    reading: [],
    friends: [],
    image: 'https://pbs.twimg.com/media/E9WKMzwXEAQ_zt2.png',
    readingChallenge: 0
  }

  credentials:  Credentials = { email: '', password: '' };


  
  constructor(private dialog: MatDialog, private _readerService:ReaderService, private router: Router,
    private loginService: LoginService, private authService: AuthService){

  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Email is invalid' : '';
  }

  getPasswordErrorMessage(){
    if(this.password.hasError('minlength')){
      return 'Password must have at least 6 characters'
    }else{
      if(this.password.hasError('pattern')){
        return 'Must contain at least 1 capital letter and 1 number.'

      }
    }
    
    
    
    return this.password.hasError('required') ? 'Password is required': '';
  }

  getConPasswordErrorMessage(){
    if(this.confirmPassword.hasError('pattern')){
      return 'Not a valid Password'
    }

    return this.confirmPassword.hasError('required') ? 'You must enter your password': '';
  }
  
  getNameErrorMessage(){
    return this.name.hasError('required') ? 'Name is required': '';
  }

  getCityErrorMessage(){
    return this.city.hasError('required') ? 'City is required': '';
  }

  getUserErrorMessage(){
    return this.user.hasError('required') ? 'User is required': '';
  }

  getReadingChallengeErrorMessage(){
    return this.name.hasError('required') ? 'Reading Challenge is required': '';
  }
  login(){
    var loginUser = {
      userId: ''
    }

    var readingChall:any;
    this.reader.city = this.city.value || '';
    this.reader.email = this.email.value || '';
    this.reader.name = this.name.value || '';
    this.reader.password = this.password.value || '';
    readingChall = this.readingChallenge.value
    this.reader.readingChallenge = readingChall;
    this.reader.user = this.user.value || '';
    console.log(this.reader);
    this._readerService.postReader(this.reader).subscribe((response: any)=>{
      console.log(response);
      
      this.credentials.email = response.email;
      this.credentials.password = response.password;
      console.log(this.credentials);
      this.loginService.loginReaders(this.credentials).subscribe((data: any) => {
        console.log(data)
        // Recibimos el token
        this.authService.setToken(data.token);
        this.authService.setLoginUser(data.id,'reader');
        // Send to readers Home
        this.router.navigate(['readers']);
      });
    }, (error) => {
      const dialogRef = this.dialog.open(NotificationDialogComponent, {
        width: '400px',
        data: {
          message: 'Something went wrong when connecting, please log in again.'
        }
      });
    })
    

  }
}


