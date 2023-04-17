import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' //importsr
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './layouts/authors/footer/footer.component';
import { NavComponent } from './layouts/authors/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HomeReadersComponent } from './components/readers/home-readers/home-readers.component';
import { RatingsFilterComponent } from './components/readers/home-readers/ratings-filter/ratings-filter.component';
import { GenreFilterComponent } from './components/readers/home-readers/genre-filter/genre-filter.component';
import { ReadingChallengeWidgetComponent } from './components/readers/home-readers/reading-challenge-widget/reading-challenge-widget.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    HomeReadersComponent,
    RatingsFilterComponent,
    GenreFilterComponent,
    ReadingChallengeWidgetComponent,
    HomeReadersComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
