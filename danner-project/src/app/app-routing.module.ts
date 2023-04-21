import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsReadersComponent } from './components/readers/friends-readers/friends-readers.component';
import { ReadingChallengeComponent } from './components/readers/reading-challenge/reading-challenge.component';
import { LoginReadersComponent } from './components/readers/login-readers/login-readers.component';
import { BooksReadersComponent } from './components/readers/books-readers/books-readers.component';
import { HomeReadersComponent } from './components/readers/home-readers/home-readers.component';
import { ReaderProfileComponent } from './components/readers/reader-profile/reader-profile.component';
import { AddFriendsReadersComponent } from './components/readers/add-friends-readers/add-friends-readers.component';
import { HomeAuthorsComponent } from './components/authors/home-authors/home-authors.component';
import { AddBookAuthorsComponent } from './components/authors/add-book-authors/add-book-authors.component';
import { AuthorProfileComponent } from './components/authors/author-profile/author-profile.component';

const routes: Routes = [
  //Readers
  {path: 'readers', component: HomeReadersComponent},
  {path: 'readers/friends', component:FriendsReadersComponent},
  {path: 'readers/readingChallenge', component: ReadingChallengeComponent},
  {path: 'readers/login', component: LoginReadersComponent},
  {path: 'readers/books', component: BooksReadersComponent},
  {path: 'readers/profile', component: ReaderProfileComponent},
  {path: 'readers/addFriends', component:AddFriendsReadersComponent},

  //Authors
  {path: 'authors', component:HomeAuthorsComponent},
  {path: 'authors/addBook', component:AddBookAuthorsComponent},
  {path: 'authors/profile', component:AuthorProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
