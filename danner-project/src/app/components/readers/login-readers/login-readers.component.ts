import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { ReaderService } from 'src/app/shared/services/reader.service';
import { Reader } from 'src/app/shared/interfaces/reader';
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

  ngOnInit() {
    console.log(this.title);
    this._readerServide.getReaders().subscribe((response: any) => {
      this.readers = response;
    }
    )
  }
  constructor(private dialog: MatDialog, private _readerServide: ReaderService, private router: Router) {

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
    var loginUser = {
      userId: ''
    }
    console.log(this.readers);
    this.reader = this.reader = this.readers.filter((reader: Reader) => {
      return reader.email === this.email.value && reader.password === this.password.value;
    })

    if (this.reader.length === 0) {
      const dialogRef = this.dialog.open(NotificationDialogComponent, {
        width: '400px',
        data: {
          message: 'Something went wrong when connecting, please log in again.'
        }
      });
    } else {
      this.route = 'readers'
      loginUser.userId = this.reader[0]._id;
      localStorage.setItem('loginUser', JSON.stringify(loginUser));
      this.router.navigate([this.route]);
    }
  }
}
