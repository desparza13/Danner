import {Component, Input} from '@angular/core';
import { BookService } from 'src/app/shared/services/book.service';
import { Book } from 'src/app/shared/interfaces/book';
import { FormControl } from '@angular/forms';
import { Author } from 'src/app/shared/interfaces/author';
import { AuthorService } from 'src/app/shared/services/author.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home-authors',
  templateUrl: './home-authors.component.html',
  styleUrls: ['./home-authors.component.scss']
})
export class HomeAuthorsComponent {
  //Variables
  //Id proof of concept until login and register is implemented
  authorId:string="";
  author:any;
  //Storing books
    //Originals
  allBooks: Array<Book>=[];
  authorBooks: any;
    //Filtered
  filteredAuthorBooks: Array<Book>=[];
  //Chosen filters
  searchControl = new FormControl();
  ratingFilters: Array<Number>=[1,2,3,4,5];
  ratingFiltersObject: any;
  genresFilters: Array<string>=[];
  opened = false;
  currentAuthor: Author = {
    _id: "",
    name: "",
    user: '',
    email: '',
    city: '',
    image: '',
    password: ''
  };
  isLoading = true;

  ngOnInit(){
    this.authorId = this.authService.getLoginUser();

    //Get initial data from the database
    this.getCurrentAuthor();
    //Initialize filtered books as original books
    this.filteredAuthorBooks = this.authorBooks;
    //Whenever the search bar texts changes filterBooks, this way while the user types he/she can see the books with that filter criteria (like netflix)
    this.searchControl.valueChanges.subscribe(() => {
      this.filterBooks();
    });
  }
  constructor(private bookService:BookService, private authorService:AuthorService, private authService:AuthService) {

  }

  //Functions
  //Get integer part of averageRating, in order to calculate how many stars to display in html
  getStars(averageRating: number): string[] {
    const integer = Math.floor(averageRating);
    const stars =[];
    for(let i = 0; i < integer; i++){
      stars.push('★');
    }
    return stars;
  }
  //Get current reader and their list of books (finished, currently reading, to be read and finished)
  getCurrentAuthor(){
    console.log(this.authorId);
    this.authorService.getOneAuthor(this.authorId).subscribe((response:any)=>{
      this.currentAuthor=response;
      this.getAllBooks();
    })
  }
  //Get books functions
  getAllBooks() {
    this.bookService.getBooks().subscribe((response: any) => {
      this.allBooks = response;
      this.authorBooks = this.allBooks.filter((book:any) => book.author == this.currentAuthor.name);
      this.filteredAuthorBooks = this.authorBooks;
      this.filterBooks();
      this.isLoading = false;

    })
  }
  //Filtering
  //Get selected rating values
  getRatingFilters(ratings: any[] | undefined){
    this.ratingFiltersObject = ratings;
    this.ratingFilters=[];
    //If a valid event is triggered (check/uncheck boxes)
    if(ratings!=undefined && ratings.length>0){
      for(let i=0; i<5; i++){
        //Check which ratings were chosen by the reader and save them 
        if(ratings[i].checked==true){
          this.ratingFilters.push(i+1);
        }
      }
      //If no checkboxes are marked, show all ratings
      if(this.ratingFilters.length==0){
        this.ratingFilters=[1,2,3,4,5]
      }     
    }else{ //Not a valid event, show all ratings
      this.ratingFilters=[1,2,3,4,5]
    }
    return this.ratingFilters;
  }
  getGenresFilters(genres: any[] | undefined){
    this.genresFilters=[];
    if(genres!=undefined && genres.length>0){
      for(let i=0; i<genres.length; i++){
          this.genresFilters.push(genres[i].toLowerCase());
      }
      if(this.genresFilters.length==0){
        for(let i=0; i<this.authorBooks.length; i++){
          this.genresFilters.push(this.authorBooks[i].genre.toLowerCase());
        }      
      }     
    }else{
      for(let i=0; i<this.authorBooks.length; i++){
        this.genresFilters.push(this.authorBooks[i].genre.toLowerCase());
      }
    }
  }
  filterBySearchValues(){
    if(this.searchControl.value!=null && this.searchControl.value!=''){
      const search = this.searchControl.value.toLowerCase();
      this.filteredAuthorBooks = this.filteredAuthorBooks.filter((book:any) =>
        book.title.toLowerCase().includes(search)
      );
    }else{
      this.authorBooks = this.allBooks.filter((book:any) => book.author == this.currentAuthor.name);
      this.filteredAuthorBooks = this.authorBooks;
    }
  }
  filterByRating(ratings: any[] | undefined){
    this.ratingFilters = this.getRatingFilters(ratings);
    this.filteredAuthorBooks = this.filteredAuthorBooks.filter(book =>
      this.ratingFilters.includes(Math.floor(book.averageRating))
    );
  }
  filterByGenres(genres?:any){
    this.getGenresFilters(genres);
    this.filteredAuthorBooks = this.filteredAuthorBooks.filter(book =>
      this.genresFilters.includes(book.genre.toLowerCase())
    );
  }
  filterBooks(ratings?: any[], genres?:any){
    this.filterBySearchValues();
    let ratingToUse:any;
    if(ratings!=undefined){
      ratingToUse=ratings
    }else{
      ratingToUse=this.ratingFiltersObject
    }
    this.filterByRating(ratingToUse);
    let genreToUse:any;
    if(genres!=undefined){
      genreToUse=genres
    }else{
      genreToUse=this.genresFilters
    }
    this.filterByGenres(genreToUse);
  }
  
}
