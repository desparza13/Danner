import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient:HttpClient) { 
    this.authStatus.next(this.isAuth());
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    // Cambiar el valor del observable a true
    this.authStatus.next(true);
  }
  setLoginUser(id: string,role:string):void{
    
    localStorage.setItem('loginUser', id);
    localStorage.setItem('role', role);
  }
  
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getLoginUser(): string{
    return localStorage.getItem('loginUser') || '';
  }
  getRole(): string{
    return localStorage.getItem('role') || '';
  }
  deleteToken(): void {
    localStorage.removeItem('token');
    // Cambiar el valor del observable a false
    this.authStatus.next(false);
  }

  deleteLoginUser():void{
    localStorage.removeItem('loginUser');
    localStorage.removeItem('role');

  }

  isAuth(): boolean {
    
    return !!this.getToken();
  }

  
}
