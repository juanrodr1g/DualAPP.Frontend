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

  deleteUsuario(id: string) {
    return this.http.delete(this.URL_API + `/${id}`);
  }
  patchUsuarios(id,usuarios: UsuarioModel) {
    const usuarioTemp = {
      ...usuarios
    };
  
    delete usuarioTemp.id;
    return this.http.patch(this.URL_API + `/${id}`, usuarioTemp);
  }
  uploadImages(img:any,name){
    return this.http.post(`http://localhost:3000/api/containers/FileUpload`,{file:img,name:name})
  }

}
