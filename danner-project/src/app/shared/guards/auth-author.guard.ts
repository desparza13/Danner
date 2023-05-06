import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from 'src/app/components/readers/notification-dialog/notification-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthAuthorGuard implements CanActivate {
  stat:boolean = false;
  
  constructor(private authService: AuthService, private route: Router, private dialog: MatDialog){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isAuth()){
        const token = this.authService.getToken();
        const response= {};
        this.authService.decodeAuthor({token}).subscribe((response:any)=>{
          console.log(response.role === route.data['role'])
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
        this.route.navigate(['/authors/login']);
        
        return this.stat;
      }
  }
  
}
