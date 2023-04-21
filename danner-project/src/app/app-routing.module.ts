import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsReadersComponent } from './components/readers/friends-readers/friends-readers.component';
import { ReadingChallengeComponent } from './components/readers/reading-challenge/reading-challenge.component';
import { LoginReadersComponent } from './components/readers/login-readers/login-readers.component';
import { BooksReadersComponent } from './components/readers/books-readers/books-readers.component';
import { HomeReadersComponent } from './components/readers/home-readers/home-readers.component';

const routes: Routes = [
  {path: 'readers', component: HomeReadersComponent},
  {path: 'readers/friends', component:FriendsReadersComponent},
  {path: 'readers/readingChallenge', component: ReadingChallengeComponent},
  {path: '', component: LoginReadersComponent},
  {path: 'readers/books', component: BooksReadersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
