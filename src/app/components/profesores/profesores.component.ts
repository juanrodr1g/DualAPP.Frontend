import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  constructor(public services:ProfesorService, public router:Router) { }
arrayUsuarios:UsuarioModel[]=[];
arrayAlumnos:UsuarioModel[]=[];
alumnoData:boolean=false
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
  verAlumno(alumno:UsuarioModel){
    this.router.navigate( ['/profesor/',alumno.id] );
    this.alumnoData=true
  }
}
