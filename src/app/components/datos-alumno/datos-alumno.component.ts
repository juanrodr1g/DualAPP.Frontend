import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { FormModalDetallesComponent } from '../form-modal-detalles/form-modal-detalles.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';

@Component({
  selector: 'app-datos-alumno',
  templateUrl: './datos-alumno.component.html',
  styleUrls: ['./datos-alumno.component.css']
})
export class DatosAlumnoComponent implements OnInit {
Plantillaciclo:any
alumno:UsuarioModel
arrayUsuarios:UsuarioModel[]=[];
arrayAlumnos:UsuarioModel[]=[];
arrayTareasyModulos=[]
  constructor(private route: ActivatedRoute,public services:ProfesorService,public modalService:NgbModal) { }

  ngOnInit(): void {
    
    console.log("pepe")
    console.log(this.arrayTareasyModulos)
    this.getArrayTareasyModulos()
  }
  getArrayTareasyModulos(){
    this.route.params.subscribe(params => {
      console.log(params['id'])
      this.arrayTareasyModulos=[]
      console.log(this.arrayTareasyModulos)
      this.getAlumnos()
      setTimeout(() => {
        this.arrayAlumnos.forEach(element => {
          if(element.id==params['id']){
            this.alumno=element
            this.Plantillaciclo={}
            this.Plantillaciclo=this.alumno.PlantillaCiclo
            console.log(this.Plantillaciclo)
            this.arrayTareasyModulos=[]
            
            console.log(this.alumno)
  for (let index1 = 0; index1 < this.alumno.PlantillaCiclo.Modulos.length; index1++) {
    for (let index2 = 0; index2 < this.alumno.PlantillaCiclo.Modulos[index1].tareas.length; index2++) {
      var modulo={
        Nombre:this.alumno.PlantillaCiclo.Modulos[index1].Nombre,
        tarea:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].Nombre,
        Horas:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].Horas,
        HorasRealizadas:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].HorasRealizadas
      }      
      if(modulo.HorasRealizadas==undefined){
        modulo.HorasRealizadas=0
      }
      console.log(modulo)
      console.log("pepe")
      this.arrayTareasyModulos.push(modulo)
    }
    
  }
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
      /*fecha=element.FechaCreacion.split("T")
      fecha2=fecha[0].split("-")
      element.FechaCreacion=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0]
      console.log(element.FechaCreacion)*/
      this.arrayAlumnos.push(element)
    }
  });
})
  
}
abrirModal(modulo,lugar:boolean){
  this.Plantillaciclo.Modulos.forEach(element2 => {
    element2.tareas.forEach(element3 => {
      if(modulo.tarea==element3.Nombre){
        console.log(element2)
        console.log(element3)
    console.log(lugar)
    if(lugar){
      const modalRef = this.modalService.open(FormModalDetallesComponent,{size:"lg"});
    modalRef.componentInstance.PlantillaCiclo = this.Plantillaciclo;
    modalRef.componentInstance.Tarea = element3;
    modalRef.componentInstance.modulo = modulo;
    modalRef.componentInstance.id = this.alumno.id;
      modalRef.componentInstance.detalles = true;
      modalRef.result.then((result) => {
this.getArrayTareasyModulos()
console.log("done")
      });
    }else{
      const modalRef = this.modalService.open(FormModalDetallesComponent);
    modalRef.componentInstance.PlantillaCiclo = this.Plantillaciclo;
    modalRef.componentInstance.Tarea = element3;
    modalRef.componentInstance.modulo = modulo;
    modalRef.componentInstance.id = this.alumno.id;
      modalRef.componentInstance.detalles = false;
      modalRef.result.then((result) => {
        this.getArrayTareasyModulos()
        console.log("done")
              });
    }
      }
    });
  });


}
}
