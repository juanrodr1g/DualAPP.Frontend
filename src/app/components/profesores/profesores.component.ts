import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  constructor(public services:ProfesorService,public authService:AuthService, public router:Router) { }
arrayUsuarios:UsuarioModel[]=[];
arrayAlumnos:UsuarioModel[]=[];
  ngOnInit(): void {
this.getAlumnos()
  }

  getAlumnos(){
this.services.getUsuarios().subscribe(resp=>{
  this.arrayUsuarios=resp;
  this.arrayUsuarios.forEach(element => {
    if(element.Rol=="alumno"){
      this.arrayAlumnos.push(element)
    }
  });
})
  }
  logOut(){
    this.authService.logoutUser().subscribe()
    this.router.navigateByUrl("/login")
  }
}
