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
arrayProfesores:UsuarioModel[]=[];
arrayTutores:UsuarioModel[]=[];
arrayAlumnos:UsuarioModel[]=[];
alumnoData:boolean=false
eleccionCuentas=localStorage.getItem("eleccionCuentas")
  ngOnInit(): void {
this.getAlumnos()
this.getProfesores()
this.getTutores()
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
  
  getProfesores(){
    this.services.getUsuarios().subscribe(resp=>{
      this.arrayUsuarios=resp;
      this.arrayUsuarios.forEach(element => {
        if(element.Rol=="profesor"){
          this.arrayProfesores.push(element)
        }
      });
    })
      }

      getTutores(){
        this.services.getUsuarios().subscribe(resp=>{
          this.arrayUsuarios=resp;
          this.arrayUsuarios.forEach(element => {
            if(element.Rol=="tutorempresa"){
              this.arrayTutores.push(element)
            }
          });
        })
          }

  verAlumno(alumno:UsuarioModel){
    this.router.navigate( ['/profesor/',alumno.id] );
    this.alumnoData=true
  }
}
