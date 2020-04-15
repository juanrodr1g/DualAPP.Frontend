import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  alumnos: UsuarioModel[];
  
  readonly URL_API = 'http://localhost:3000/api/Usuarios';

  constructor(private http: HttpClient) {

  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  getUsuarios() {
    return this.http.get<[]>(this.URL_API);
  }

}
