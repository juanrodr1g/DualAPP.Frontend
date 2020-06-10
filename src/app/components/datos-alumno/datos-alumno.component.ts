import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { FormModalDetallesComponent } from '../form-modal-detalles/form-modal-detalles.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormDiarioComponent } from '../form-diario/form-diario.component';

@Component({
  selector: 'app-datos-alumno',
  templateUrl: './datos-alumno.component.html',
  styleUrls: ['./datos-alumno.component.css']
})
export class DatosAlumnoComponent implements OnInit {
Plantillaciclo:any
arrayDiario
alumno:UsuarioModel
arrayUsuarios:UsuarioModel[]=[];
arrayAlumnos:UsuarioModel[]=[];
arrayTareasyModulos=[]
usuario:UsuarioModel= JSON.parse(localStorage.getItem("currentUser"));
  constructor(private route: ActivatedRoute,public services:ProfesorService,public modalService:NgbModal) {  this.getAlumnos();this.getArrayTareasyModulos()}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.services.getUsuarioPorId(params['id']).subscribe(resp=>{
        this.alumno=resp
        if(resp.Diario==undefined){
          this.arrayDiario=[]
        }else{
        this.arrayDiario=resp.Diario
        }
        console.log(this.arrayDiario)
      })
    })

  }
  
borrarDiario(diario){
    this.arrayDiario = this.arrayDiario.filter(function(dato){
      if(dato.Descripcion==diario.Descripcion && dato.Fecha==diario.Fecha){
        return false;
      }else{
          return true;
      }
  });
var alumno={
  Diario:this.arrayDiario
}
this.services.patchUsuarios(this.usuario.id,alumno).subscribe()
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
  getArrayTareasyModulos(){
    Swal.fire({
      title: 'Espere',
      text: 'Puede tardar unos segundos...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.route.params.subscribe(params => {
      this.arrayTareasyModulos=[]
      this.getAlumnos()
      setTimeout(() => {
        this.arrayAlumnos.forEach(element => {
          if(element.id==params['id']){
            this.alumno=element
            this.Plantillaciclo={}
            this.Plantillaciclo=this.alumno.PlantillaCiclo
            console.log(this.Plantillaciclo)
            this.arrayTareasyModulos=[]
  for (let index1 = 0; index1 < this.alumno.PlantillaCiclo.Modulos.length; index1++) {
    for (let index2 = 0; index2 < this.alumno.PlantillaCiclo.Modulos[index1].tareas.length; index2++) {
      var modulo={
        Nombre:this.alumno.PlantillaCiclo.Modulos[index1].Nombre,
        tarea:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].Nombre,
        Horas:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].Horas,
        HorasRealizadas:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].HorasRealizadas,
        EvProfesor:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].EvProfesor,
        EvTutor:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].EvTutor
      }      
      if(modulo.HorasRealizadas==undefined){
        modulo.HorasRealizadas=0
      }
      this.arrayTareasyModulos.push(modulo)
    }
    
  }
          }

        });
        Swal.close()
      }, 500);

    });
  }


abrirModal(modulo,lugar:boolean){
  this.Plantillaciclo.Modulos.forEach(element2 => {
    element2.tareas.forEach(element3 => {
      if(modulo.tarea==element3.Nombre){
    if(lugar){
      const modalRef = this.modalService.open(FormModalDetallesComponent,{size:"lg"});
    modalRef.componentInstance.PlantillaCiclo = this.Plantillaciclo;
    modalRef.componentInstance.Tarea = element3;
    modalRef.componentInstance.modulo = modulo;
    modalRef.componentInstance.id = this.alumno.id;
      modalRef.componentInstance.detalles = true;
      modalRef.result.then((result) => {
this.getArrayTareasyModulos()
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
              });
    }
      }
    });
  });


}

crearDiario(){
  const modalRef = this.modalService.open(FormDiarioComponent);
  modalRef.componentInstance.arrayDiario = this.arrayDiario;
  modalRef.componentInstance.id = this.alumno.id;

    modalRef.componentInstance.detalles = false;
    modalRef.result.then((result) => {
      this.services.getUsuarioPorId(this.alumno.id).subscribe(resp=>{
        this.arrayDiario=resp.Diario
      })
            });
}

}
