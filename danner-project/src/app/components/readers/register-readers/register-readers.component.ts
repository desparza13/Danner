import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Reader } from 'src/app/shared/interfaces/reader';
import { ReaderService } from 'src/app/shared/services/reader.service';
@Component({
  selector: 'app-register-readers',
  templateUrl: './register-readers.component.html',
  styleUrls: ['./register-readers.component.scss']
})
export class RegisterReadersComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$')]);
  name = new FormControl('', [Validators.required]);
  user = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  readingChallenge = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$')]);
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
    readingChallenge: 0
  }

  route: string = '';
  
  constructor(private dialog: MatDialog, private _readerService:ReaderService, private router: Router){

  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage(){
    if(this.password.hasError('pattern')){
      return 'Not a valid Password'
    }
    return this.password.hasError('required') ? 'You must enter your password': '';
  }

  getConPasswordErrorMessage(){
    if(this.confirmPassword.hasError('pattern')){
      return 'Not a valid Password'
    }
    return this.confirmPassword.hasError('required') ? 'You must enter your password': '';
  }
  
  getNameErrorMessage(){
    return this.name.hasError('required') ? ' You must enter a name': '';
  }

  getCityErrorMessage(){
    return this.city.hasError('required') ? ' You must enter a city': '';
  }

  getUserErrorMessage(){
    return this.name.hasError('required') ? ' You must enter a user': '';
  }

  getReadingChallengeErrorMessage(){
    return this.name.hasError('required') ? 'You must enter a number': '';
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
      this.route='readers'
      loginUser.userId = response._id;
      localStorage.setItem('loginUser', JSON.stringify(loginUser));
      this.router.navigate([this.route]);
    })
    

  }
}


