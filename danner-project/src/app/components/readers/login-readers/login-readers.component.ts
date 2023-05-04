import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Reader } from 'src/app/shared/interfaces/reader';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { Credentials } from 'src/app/shared/interfaces/credentials';
@Component({
  selector: 'app-login-readers',
  templateUrl: './login-readers.component.html',
  styleUrls: ['./login-readers.component.scss']
})
export class LoginReadersComponent {
  hide = true;
  title = true;
  route: string = '';
  readers: Array<Reader> = [];
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  reader: Array<Reader> = [];
  credentials:  Credentials = { email: '', password: '' };

  ngOnInit() {
    console.log(this.title);
    this._readerServide.getReaders().subscribe((response: any) => {
      this.readers = response;
    }
    )
  }
  constructor(private dialog: MatDialog, private _readerServide: ReaderService, private router: Router,
    private loginService: LoginService,
    private authService: AuthService) {

  }

  changeTitle() {
    this.title = !this.title;
    console.log(this.title);
  }
  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter your password' : '';
  }

  login() {
    this.credentials.email=this.email.value || '';
    this.credentials.password=this.password.value ||'';

    this.loginService.loginReaders(this.credentials).subscribe((data: any) => {
      // Recibimos el token
      this.authService.setToken(data.token);
      this.authService.setLoginUser(data.id);
      // Send to readers Home
      this.router.navigate(['/readers']);
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
