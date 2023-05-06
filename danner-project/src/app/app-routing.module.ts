import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsReadersComponent } from './components/readers/friends-readers/friends-readers.component';
import { ReadingChallengeComponent } from './components/readers/reading-challenge/reading-challenge.component';
import { LoginReadersComponent } from './components/readers/login-readers/login-readers.component';
import { BooksReadersComponent } from './components/readers/books-readers/books-readers.component';
import { HomeReadersComponent } from './components/readers/home-readers/home-readers.component';
import { LoginAuthorsComponent } from './components/authors/login-authors/login-authors.component';
import { ReaderProfileComponent } from './components/readers/reader-profile/reader-profile.component';
import { AddFriendsReadersComponent } from './components/readers/add-friends-readers/add-friends-readers.component';
import { HomeAuthorsComponent } from './components/authors/home-authors/home-authors.component';
import { AddBookAuthorsComponent } from './components/authors/add-book-authors/add-book-authors.component';
import { AuthorProfileComponent } from './components/authors/author-profile/author-profile.component';
import { FriendsReviewsReadersComponent } from './components/readers/friends-reviews-readers/friends-reviews-readers.component';
import { BookDetailsComponent } from './components/readers/book-details/book-details.component';
import { AuthorsBookDetailsComponent } from './components/authors/authors-book-details/authors-book-details.component';
import { AuthAuthorGuard } from './shared/guards/auth-author.guard';
const routes: Routes = [
  //Readers
  {path: 'readers', component: HomeReadersComponent},
  {path: 'readers/friends', component:FriendsReadersComponent},
  {path: 'readers/readingChallenge', component: ReadingChallengeComponent},
  {path: '', component: LoginReadersComponent},
  {path: 'readers/books', component: BooksReadersComponent},
  {path: 'authors/login',component: LoginAuthorsComponent},
  {path: 'readers/profile', component: ReaderProfileComponent},
  {path: 'readers/addFriends', component:AddFriendsReadersComponent},
  {path: 'readers/reviews',component: FriendsReviewsReadersComponent},
  {path: 'readers/:id', component: BookDetailsComponent},
  {path: 'readers/books/:id', component: BookDetailsComponent},
  //Authors
  {path: 'authors', component:HomeAuthorsComponent, canActivate:[AuthAuthorGuard], data:{role:'author'}},
  {path: 'authors/addBook', component:AddBookAuthorsComponent, canActivate:[AuthAuthorGuard], data:{role:'author'}},
  {path: 'authors/profile', component:AuthorProfileComponent, canActivate:[AuthAuthorGuard], data:{role:'author'}},
  {path: 'authors/login',component: LoginAuthorsComponent},
  {path: 'authors/:id', component: AuthorsBookDetailsComponent, canActivate:[AuthAuthorGuard], data:{role:'author'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
