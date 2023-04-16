import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' //importar

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private httpClient: HttpClient) { }

  getReaders(){
    const url:string = environment.apiUrl + 'readers'; //Definir url para el get
    return this.httpClient.get(url); //Regresar llamada tipo get
  }

  getOneReader(id:string){
    const url:string = environment.apiUrl + 'readers/' + id; //Definir url para el get por id
    return this.httpClient.get(url); //Regresar llamada tipo get con id
  }

  postReader(body:object){
    const url:string = environment.apiUrl + 'readers/';//Definir url para el post
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url,body,options); //Regresar llamada tipo post
  }

  updateReader(body:object, id:string){
    const url:string = environment.apiUrl + 'readers/'+id; //Definir url para el update 
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.put(url,body,options); //Regresar llamada tipo put para actualizar
  }

  deleteReader(id:string){
    const url:string = environment.apiUrl + 'readers/' + id; //Definir url para el delete
    return this.httpClient.delete(url); //Regresar llamada tipo delete para eliminar
  }
}
