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

  decodeAuthor(body:object){
    const url:string = environment.apiUrl + 'authors/decode';//Definir url para el post
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url,body,options); //Regresar llamada tipo post
  }

  decodeReader(body:object){
    const url:string = environment.apiUrl + 'readers/decode';//Definir url para el post
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url,body,options); //Regresar llamada tipo post
  }
}
