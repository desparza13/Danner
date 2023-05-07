import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let dataRole = route.data['role'];
      if(this.authService.isAuth()){//Si hay un token 
        let role= this.authService.getRole();
        if(dataRole==='author'){//Si el role con el que se llamo al guard es autor
          if(role==='author'){//si el role que esta en el LS es autor
            return true; //deja pasar
          }else{//si el rol del LS no es autor
            //redirige al login y no deja pasar
            this.router.navigate(['/authors/login']);
            return false;
          }
        }else if(dataRole==='reader'){//si el role con el que llamo al guard es lector
          if(role==='reader'){//si el role del LS es lector
            return true;//deja pasar
          }else{// si el rol del LS no es lector
            //redirige al login y no deja pasar
            this.router.navigate(['']);
            return false
          }
        }
        return false;
      }else{ //Si no hay token
        if(dataRole==='author'){//Si el guard se llamo con un role de autor se redirige a login de autor
          this.router.navigate(['/authors/login']);
        }
        else{//se redirige a login de lector
          this.router.navigate(['']);
        }
        return false;
      }
  }
  
}
