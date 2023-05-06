import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthReaderGuard implements CanActivate {
  stat:boolean = false;
  
  constructor(private authService: AuthService, private route: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isAuth()){
        const token = this.authService.getToken();
        
        this.authService.decodeReader({token}).subscribe((response:any)=>{
          console.log(response)
          if(response.role === route.data['role']){
            this.stat = true;
          }
        })
        console.log(this.stat);
        if(!this.stat){
          this.route.navigate(['/authors/login']);

        }
        return this.stat
      }else{
        this.route.navigate(['']);
        return this.stat;
      }
  }
  
}
