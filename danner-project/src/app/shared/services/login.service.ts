import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Credentials } from '../interfaces/credentials';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  loginReaders(credentials: Credentials): Observable<any> {
    const url:string = environment.apiUrl + 'readers/login'; //Definir url para el update 

    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url, credentials,options);
  }

  loginAuthors(credentials: Credentials): Observable<any> {
    const url:string = environment.apiUrl + 'authors/login'; //Definir url para el update 

    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url, credentials,options);
  }

  googleLoginAuthors(idToken: string): Observable<any> {
    const url:string = environment.apiUrl + 'authors/login/google';
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url, { googleToken: idToken}, options)
  }

  googleLoginReaders(idToken: string): Observable<any> {
    const url:string = environment.apiUrl + 'readers/login/google';
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url, { googleToken: idToken}, options)
  }

  decode(token:string){
    const url:string = environment.apiUrl + 'decode/'+token;//Definir url para el post
    
    return this.httpClient.get(url); //Regresar llamada tipo post
  }
}
