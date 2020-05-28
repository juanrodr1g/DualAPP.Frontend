import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  empresa:Empresa;

  readonly URL_API = 'https://dualapi.herokuapp.com/api/Empresas';

  constructor(private http: HttpClient) {

  }
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  getEmpresas() {
    return this.http.get<[]>(this.URL_API);
  }

  getEmpresaPorId(id) {
    return this.http.get<Empresa>(`${this.URL_API}/${id}`);
  }

  deleteEmpresas(id: string) {
    return this.http.delete(this.URL_API + `/${id}`);
  }
  postEmpresas(empresa:Empresa){
    return this.http.post<[]>(this.URL_API,empresa);
  }

  patchEmpresas(id,empresas: Empresa) {
    const empresasTemp = {
      ...empresas
    };
  
    delete empresasTemp.id;
    return this.http.patch(this.URL_API + `/${id}`, empresasTemp);
  }
}