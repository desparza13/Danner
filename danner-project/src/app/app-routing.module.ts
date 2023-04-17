import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeReadersComponent } from './components/readers/home-readers/home-readers.component';

const routes: Routes = [
  { path: '', component: HomeReadersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
