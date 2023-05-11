import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' //importar

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient: HttpClient) { }
  getAuthors(){
    const url:string = environment.apiUrl + 'authors'; //Definir url para el get
    return this.httpClient.get(url); //Regresar llamada tipo get
  }

  getOneAuthor(id:string){
    const url:string = environment.apiUrl + 'authors/' + id; //Definir url para el get por id
    return this.httpClient.get(url); //Regresar llamada tipo get con id
  }

  postAuthor(body:object){
    const url:string = environment.apiUrl + 'authors/';//Definir url para el post
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url,body,options); //Regresar llamada tipo post
  }

  updateAuthor(body:object, id:any){
    const url:string = environment.apiUrl + 'authors/'+id; //Definir url para el update 
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.put(url,body,options); //Regresar llamada tipo put para actualizar
  }

  deleteAuthor(id:string){
    const url:string = environment.apiUrl + 'authors/' + id; //Definir url para el delete
    return this.httpClient.delete(url); //Regresar llamada tipo delete para eliminar
  }
  uploadPhoto(formData:FormData, id:any){
    const url:string = environment.apiUrl + 'authors/uploadPhoto/' + id;
    return this.httpClient.post(url, formData);
  }
}
