import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CicloModel } from '../models/ciclo';

@Injectable({
  providedIn: 'root'
})
export class CicloService {
  
  ciclo:CicloModel

  readonly URL_API = 'http://localhost:3000/api/CiclosFs';

  constructor(private http: HttpClient) {

  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  getCiclos() {
    return this.http.get<[]>(this.URL_API);
  }

  deleteCiclos(id: string) {
    return this.http.delete(this.URL_API + `/${id}`);
  }
  patchUsuarios(id,ciclos: CicloModel) {
    const ciclosTemp = {
      ...ciclos
    };
  
    delete ciclosTemp.id;
    return this.http.patch(this.URL_API + `/${id}`, ciclosTemp);
  }
}
