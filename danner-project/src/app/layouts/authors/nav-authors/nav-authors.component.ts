import { Component } from '@angular/core';
import { Author } from 'src/app/shared/interfaces/author';
import { AuthorService } from 'src/app/shared/services/author.service';

@Component({
  selector: 'app-nav-authors',
  templateUrl: './nav-authors.component.html',
  styleUrls: ['./nav-authors.component.scss']
})
export class NavAuthorsComponent {
  userId = '643b5cee991bff556bbdb0f3'
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

  //Get the current author
  getCurrentAuthor() {
    this.authorService.getOneAuthor(this.userId).subscribe((response: any) => {
      this.author = response;
    });
  }

}