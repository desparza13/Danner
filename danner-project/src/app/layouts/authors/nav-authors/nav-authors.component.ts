import { Component } from '@angular/core';
import { Author } from 'src/app/shared/interfaces/author';
import { AuthorService } from 'src/app/shared/services/author.service';

@Component({
  selector: 'app-nav-authors',
  templateUrl: './nav-authors.component.html',
  styleUrls: ['./nav-authors.component.scss']
})
export class NavAuthorsComponent {
  userId = '643d9026c9e38d96582f4528'
  author: Author = {
    _id: "",
    name: "",
    user: '',
    email: '',
    city: '',
    image: '',
    password: ''
  };


  ngOnInit() {
    this.getCurrentAuthor();
  }


  constructor(private authorService: AuthorService) {
  }

  //Get the current reader
  getCurrentAuthor() {
    this.authorService.getOneAuthor(this.userId).subscribe((response: any) => {
      this.author = response;
    });
  }

}
