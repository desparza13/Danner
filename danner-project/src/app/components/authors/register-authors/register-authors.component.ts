import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Author } from 'src/app/shared/interfaces/author';
import { AuthorService } from 'src/app/shared/services/author.service';

@Component({
  selector: 'app-register-authors',
  templateUrl: './register-authors.component.html',
  styleUrls: ['./register-authors.component.scss']
})
export class RegisterAuthorsComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required,  Validators.minLength(6),Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$')]);
  name = new FormControl('', [Validators.required]);
  user = new FormControl('', [Validators.required]);
  city = new FormControl('', [Validators.required]);
  readingChallenge = new FormControl('', [Validators.required]);
  confirmPassword = new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$')]);
  author: Author = {
    _id: '',
    name: '',
    user: '',
    email: '',
    city: '',
    password: '',
    image: 'https://pbs.twimg.com/media/E9WKMzwXEAQ_zt2.png'
  }

  route: string = '';
  
  constructor(private dialog: MatDialog, private _authorService:AuthorService, private router: Router){

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

  login(){
    var loginUser = {
      userId: ''
    }

    this.author.city = this.city.value || '';
    this.author.email = this.email.value || '';
    this.author.name = this.name.value || '';
    this.author.password = this.password.value || '';
    this.author.user = this.user.value || '';
    console.log(this.author);
    this._authorService.postAuthor(this.author).subscribe((response: any)=>{
      console.log(response);
      this.route='authors'
      loginUser.userId = response._id;
      localStorage.setItem('loginUser', JSON.stringify(loginUser));
      this.router.navigate([this.route]);
    })
    

  }
}
