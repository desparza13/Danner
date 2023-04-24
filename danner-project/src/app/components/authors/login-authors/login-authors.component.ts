import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Author } from 'src/app/shared/interfaces/author';
import { AuthorService } from 'src/app/shared/services/author.service';
import { NotificationDialogComponent } from '../../readers/notification-dialog/notification-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-authors',
  templateUrl: './login-authors.component.html',
  styleUrls: ['./login-authors.component.scss']
})
export class LoginAuthorsComponent {
  hide = true;
  title = true;
  route: string = 'authors/login';
  authors: Array<Author> = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  loginAuthor: Array<Author> = [];
  
  ngOnInit() {
    console.log(this.title);
    this._authorService.getAuthors().subscribe((response: any) => {
      this.authors = response;
    }
    )
  }
  constructor(private dialog: MatDialog, private _authorService: AuthorService, private router: Router) {

  }

  changeTitle() {
    this.title = !this.title;
    console.log(this.title);
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Email is invalid' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'Password is required' : '';
  }

  login() {
    var loginUser = {
      userId: ''
    }
    console.log(this.authors);
    this.loginAuthor = this.loginAuthor = this.authors.filter((loginAuthor: Author) => {
      return loginAuthor.email === this.email.value && loginAuthor.password === this.password.value;
    })
    console.log(this.loginAuthor)
    if (this.loginAuthor.length === 0) {
      const dialogRef = this.dialog.open(NotificationDialogComponent, {
        width: '400px',
        data: {
          message: 'Something went wrong when connecting, please log in again.'
        }
      });
    } else {
      this.route = 'authors'
      loginUser.userId = this.loginAuthor[0]._id;
      localStorage.setItem('loginUser', JSON.stringify(loginUser));
      this.router.navigate([this.route]);
    }
  }
}