import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-datos-alumno',
  templateUrl: './datos-alumno.component.html',
  styleUrls: ['./datos-alumno.component.css']
})
export class DatosAlumnoComponent implements OnInit {

alumno:UsuarioModel
arrayUsuarios:UsuarioModel[]=[];
arrayAlumnos:UsuarioModel[]=[];

  constructor(private route: ActivatedRoute,public services:ProfesorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id'])
      this.getAlumnos()
      setTimeout(() => {
        this.arrayAlumnos.forEach(element => {
          if(element.id==params['id']){
            this.alumno=element
            console.log(this.alumno)
          }
        });
      }, 200);

    });
  }
  getAlumnos(){
this.services.getUsuarios().subscribe(resp=>{
  this.arrayUsuarios=resp;
  this.arrayUsuarios.forEach(element => {
    var fecha,fecha2;
    if(element.Rol=="alumno"){
      fecha=element.FechaCreacion.split("T")
      fecha2=fecha[0].split("-")
      element.FechaCreacion=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0]
      console.log(element.FechaCreacion)
      this.arrayAlumnos.push(element)
    }
  });
})
  }
}
