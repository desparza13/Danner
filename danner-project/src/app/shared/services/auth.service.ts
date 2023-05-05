import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { 
    this.authStatus.next(this.isAuth());
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    // Cambiar el valor del observable a true
    this.authStatus.next(true);
  }
  setLoginUser(id: string):void{
    
    localStorage.setItem('loginUser', (id));
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getLoginUser(): string{
    return localStorage.getItem('loginUser') || '';
  }
  deleteToken(): void {
    localStorage.removeItem('token');
    // Cambiar el valor del observable a false
    this.authStatus.next(false);
  }

  deleteLoginUser():void{
    localStorage.removeItem('loginUser');

  }

  isAuth(): boolean {
    return !!this.getToken();
  }
}
