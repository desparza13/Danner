import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' //importar

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  getReviews(){
    const url:string = environment.apiUrl + 'reviews'; //Definir url para el get
    return this.httpClient.get(url); //Regresar llamada tipo get
  }

  getOneReview(id:string){
    const url:string = environment.apiUrl + 'reviews/' + id; //Definir url para el get por id
    return this.httpClient.get(url); //Regresar llamada tipo get con id
  }

  postReview(body:object){
    const url:string = environment.apiUrl + 'reviews/';//Definir url para el post
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url,body,options); //Regresar llamada tipo post
  }

  updateReview(body:object, id:string){
    const url:string = environment.apiUrl + 'reviews/'+id; //Definir url para el update 
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.put(url,body,options); //Regresar llamada tipo put para actualizar
  }

  deleteReview(id:string){
    const url:string = environment.apiUrl + 'reviews/' + id; //Definir url para el delete
    return this.httpClient.delete(url); //Regresar llamada tipo delete para eliminar
  }
}
