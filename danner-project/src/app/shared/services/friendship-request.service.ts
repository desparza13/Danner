import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http' //importar

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendshipRequestService {

  constructor(private httpClient: HttpClient) { }

  getRequests(){
    const url:string = environment.apiUrl + 'requests'; //Definir url para el get
    return this.httpClient.get(url); //Regresar llamada tipo get
  }

  getOneRequest(id:string){
    const url:string = environment.apiUrl + 'requests/' + id; //Definir url para el get por id
    return this.httpClient.get(url); //Regresar llamada tipo get con id
  }

  postRequest(body:object){
    const url:string = environment.apiUrl + 'requests/';//Definir url para el post
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.post(url,body,options); //Regresar llamada tipo post
  }

  updateRequest(body:object, id:string){
    const url:string = environment.apiUrl + 'requests/'+id; //Definir url para el update 
    const httpHeaders= new HttpHeaders({'Content-Type' : 'application/json'}); //Asignar los headers
    let options = {
      headers: httpHeaders
    }; 
    return this.httpClient.put(url,body,options); //Regresar llamada tipo put para actualizar
  }

  deleteRequest(id:string){
    const url:string = environment.apiUrl + 'requests/' + id; //Definir url para el delete
    return this.httpClient.delete(url); //Regresar llamada tipo delete para eliminar
  }
}
