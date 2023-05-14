import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isAuth:boolean = false;
  role = '';

  constructor(private authService: AuthService,
    private loginService: LoginService,
    private router:Router){
    this.authService.authStatus.subscribe((status:boolean)=>{//Revisamos si hay algun usuario loggeado
      this.isAuth = status;
      console.log(this.isAuth);
      if(this.isAuth){//Si hay un usuario loggeado
        let token = this.authService.getToken(); //obtenemos el token
        this.loginService.decode(token).subscribe((response:any)=>{//decodificamos el token
          const  url = this.router.url.split('/');
          let role = url[1];//obtenemos la url para saber si estamos en autores o lectores
          if(response.role==='author' && role==='authors'){ //si el role del token decodificado y la ruta es de autores
              this.role='author';//se muestra el nav bar de autores
          }else if(response.role==='reader' && role==='readers'){//si el role del token decodificado y la ruta es de lectores
              this.role='reader'; //se muestra el nav bar de readers
          }
        },(err)=>{
          this.router.navigate(['']);
        })
      }else{
        //this.router.navigate(['']);
        this.role=''
      }
    })
  }

}
