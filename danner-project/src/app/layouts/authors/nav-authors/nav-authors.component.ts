import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/shared/interfaces/author';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthorService } from 'src/app/shared/services/author.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Credentials } from 'src/app/shared/interfaces/credentials';

@Component({
  selector: 'app-nav-authors',
  templateUrl: './nav-authors.component.html',
  styleUrls: ['./nav-authors.component.scss']
})
export class NavAuthorsComponent {
  userId = ''
  author: Author = {
    _id: "",
    name: "",
    user: '',
    email: '',
    city: '',
    image: '',
    password: ''
  };
  logueado: boolean = false;
  credentials:  Credentials = { email: '', password: '' };
  ngOnInit() {
    this.userId = this.authService.getLoginUser();
    this.getCurrentAuthor();
  }

  constructor(private authorService: AuthorService,
              private authService: AuthService,
              private router:Router,
              private socialAuthService: SocialAuthService,
              private loginService: LoginService) {

  }


  //Get the current author
  getCurrentAuthor() {
    this.authorService.getOneAuthor(this.userId).subscribe((response: any) => {
      this.author = response;
    });
  }

  signOut() {
    this.authService.deleteToken();
    this.authService.deleteLoginUser();
    this.socialAuthService.signOut();
    this.router.navigate(['authors/login']);
  }

}
