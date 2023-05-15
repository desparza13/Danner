import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Author } from 'src/app/shared/interfaces/author';
import { AuthorService } from 'src/app/shared/services/author.service';
import { NotificationDialogComponent } from '../../readers/notification-dialog/notification-dialog.component';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/shared/interfaces/credentials';
import { LoginService } from 'src/app/shared/services/login.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-authors',
  templateUrl: './login-authors.component.html',
  styleUrls: ['./login-authors.component.scss']
})
export class LoginAuthorsComponent {
  hide = true;
  title = true;
  authors: Array<Author> = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  loginAuthor: Array<Author> = [];
  credentials:  Credentials = { email: '', password: '' };
  
  ngOnInit() {
    this.authService.deleteToken();
    this.authService.deleteLoginUser();
    console.log(this.title);
    this._authorService.getAuthors().subscribe((response: any) => {
      this.authors = response;
    }
    )
  }
  constructor(private dialog: MatDialog, 
    private _authorService: AuthorService, 
    private router: Router,
    private loginService: LoginService, 
    private authService: AuthService
    ) 
    {
      
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
    this.credentials.email=this.email.value || '';
    this.credentials.password=this.password.value ||'';

    this.loginService.loginAuthors(this.credentials).subscribe((data: any) => {
      // Recibimos el token
      this.authService.setToken(data.token);
      this.authService.setLoginUser(data.id,'author','DB');
      // Send to readers Home
      this.router.navigate(['/authors']);
    },(error)=>{
      const dialogRef = this.dialog.open(NotificationDialogComponent, {
        width: '400px',
        data: {
          message: 'Something went wrong when connecting, please log in again.'
        }
      });
    });
  }
  
}