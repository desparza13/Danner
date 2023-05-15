import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Author } from 'src/app/shared/interfaces/author';
import { Credentials } from 'src/app/shared/interfaces/credentials';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthorService } from 'src/app/shared/services/author.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { NotificationDialogComponent } from '../../readers/notification-dialog/notification-dialog.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-authors',
  templateUrl: './register-authors.component.html',
  styleUrls: ['./register-authors.component.scss']
})
export class RegisterAuthorsComponent {
  id = '';
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{6,}$')]);
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
  fileName = '';
  route: string = '';
  credentials: Credentials = { email: '', password: '' };
  file: any;
  constructor(private dialog: MatDialog,
    private _authorService: AuthorService,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private http: HttpClient) {

  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Email is required';
    }

    return this.email.hasError('email') ? 'Email is invalid' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('minlength')) {
      return 'Password must have at least 6 characters'
    } else {
      if (this.password.hasError('pattern')) {
        return 'Must contain at least 1 capital letter and 1 number.'

      }
    }
    return this.password.hasError('required') ? 'Password is required' : '';
  }

  getConPasswordErrorMessage() {
    if (this.confirmPassword.hasError('pattern')) {
      return 'Not a valid Password'
    }

    return this.confirmPassword.hasError('required') ? 'You must enter your password' : '';
  }

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'Name is required' : '';
  }

  getCityErrorMessage() {
    return this.city.hasError('required') ? 'City is required' : '';
  }

  getUserErrorMessage() {
    return this.user.hasError('required') ? 'User is required' : '';
  }

  login() {
    this.author.city = this.city.value || '';
    this.author.email = this.email.value || '';
    this.author.name = this.name.value || '';
    this.author.password = this.password.value || '';
    this.author.user = this.user.value || '';
    this._authorService.postAuthor(this.author).subscribe((response1: any) => {
      this.id = response1._id;
      if (this.file) {
        this.fileName = this.file.name;
        const ext = this.fileName.split('.').pop();
        const formData = new FormData();
        formData.append("file", this.file);
        this._authorService.uploadPhoto(formData, this.id).subscribe((response: any) => {
          console.log("Response file", response1);
          let updatedAuthor = {
            name: response1.name,
            user: response1.user,
            email: response1.email,
            city: response1.city,
            image: environment.apiUrl + "image/" + this.id + "." + ext,
            password: response1.password
          }
          console.log(updatedAuthor.image);
          this._authorService.updateAuthor(updatedAuthor, this.id).subscribe((response: any) => {
            console.log(response);
            this.credentials.email = response1.email;
            this.credentials.password = response1.password;
            this.loginService.loginAuthors(this.credentials).subscribe((data: any) => {
              // Recibimos el token
              this.authService.setToken(data.token);
              this.authService.setLoginUser(data.id, 'author','DB');
              // Send to readers Home
              this.router.navigate(['/authors']);
            }, (error) => {
              const dialogRef = this.dialog.open(NotificationDialogComponent, {
                width: '400px',
                data: {
                  message: 'Something went wrong when connecting, please log in again.'
                }
              });
            });
          })
        });
      }
      else {
        this.credentials.email = response1.email;
        this.credentials.password = response1.password;
        this.loginService.loginAuthors(this.credentials).subscribe((data: any) => {
          // Recibimos el token
          this.authService.setToken(data.token);
          this.authService.setLoginUser(data.id, 'author','DB');
          // Send to readers Home
          this.router.navigate(['/authors']);
        }, (error) => {
          const dialogRef = this.dialog.open(NotificationDialogComponent, {
            width: '400px',
            data: {
              message: 'Something went wrong when connecting, please log in again.'
            }
          });
        });
      }
    })
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    console.log(file);
    this.file = file;
  }
}
