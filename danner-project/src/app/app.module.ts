import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' //importsr
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { NavReadersComponent } from './layouts/readers/nav-readers/nav-readers.component';
import { FriendsReadersComponent } from './components/readers/friends-readers/friends-readers.component';
import { ReadingChallengeComponent } from './components/readers/reading-challenge/reading-challenge.component';
import { LoginReadersComponent } from './components/readers/login-readers/login-readers.component';
import { BooksReadersComponent } from './components/readers/books-readers/books-readers.component';
import { HomeReadersComponent } from './components/readers/home-readers/home-readers.component';
import { RatingsFilterComponent } from './components/readers/home-readers/ratings-filter/ratings-filter.component';
import { GenreFilterComponent } from './components/readers/home-readers/genre-filter/genre-filter.component';
import { ReadingChallengeWidgetComponent } from './components/readers/home-readers/reading-challenge-widget/reading-challenge-widget.component';
import { ConfirmationDialogComponent } from './components/readers/confirmation-dialog/confirmation-dialog.component';
import { NotificationDialogComponent } from './components/readers/notification-dialog/notification-dialog.component';
import { RegisterReadersComponent } from './components/readers/register-readers/register-readers.component';
import { LoginAuthorsComponent } from './components/authors/login-authors/login-authors.component';

@NgModule({
  declarations: [
    AppComponent,
    NavReadersComponent,
    FriendsReadersComponent,
    ReadingChallengeComponent,
    LoginReadersComponent,
    BooksReadersComponent,
    HomeReadersComponent,
    RatingsFilterComponent,
    GenreFilterComponent,
    ReadingChallengeWidgetComponent,
    HomeReadersComponent,
    ConfirmationDialogComponent,
    NotificationDialogComponent,
    RegisterReadersComponent,
    LoginAuthorsComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
