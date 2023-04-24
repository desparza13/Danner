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
import { FriendsReviewsReadersComponent } from './components/readers/friends-reviews-readers/friends-reviews-readers.component';
import { BookDetailsComponent } from './components/readers/book-details/book-details.component';
const routes: Routes = [
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
  {path: 'readers/books/:id', component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
