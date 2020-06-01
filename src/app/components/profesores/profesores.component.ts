import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponentUsuario } from '../form-modal-Cuentas/form-modal-ap.component';
import { NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {
  recarga=localStorage.getItem("logeado")
  showFiller = false;
  constructor(public services:ProfesorService, public router:Router,public modalService:NgbModal,private route: ActivatedRoute) { 
    if(this.recarga=="1"){
      location.reload()
      localStorage.setItem("logeado","0")
    }
    router.events.pipe(
    filter(event => event instanceof NavigationEnd)  
  ).subscribe((event: NavigationEnd) => {
    this.alumnoData=localStorage.getItem("alumnoData")
  });}
arrayUsuarios:UsuarioModel[]=[];
arrayProfesores:UsuarioModel[]=[];
arrayTutores:UsuarioModel[]=[];
arrayAlumnos:UsuarioModel[]=[];
alumnoData=localStorage.getItem("alumnoData")
lugar;
eleccionCuentas=localStorage.getItem("eleccionCuentas")
  ngOnInit(): void {
    if(this.recarga=="1"){
      location.reload()
      localStorage.setItem("logeado","0")
    }
    this.route.params.subscribe(params => {
      console.log(params['id'])
    this.lugar=params['lugar']
    })
    setTimeout(() => {
      this.getAlumnos()
this.getProfesores()
this.getTutores()
    }, 200);

  }

  getAlumnos(){
    this.arrayAlumnos=[]
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
    this.arrayProfesores=[]
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
        this.arrayTutores=[]
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
    this.router.navigate( ['/profesor/alumno/',alumno.id] );
    localStorage.setItem("alumnoData","1")
    this.alumnoData=localStorage.getItem("alumnoData")
    console.log(this.alumnoData)
  }

  eliminarUsuario(id){

    Swal.fire({
      title: 'Espere',
      text: 'Eliminando cuenta...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    
    this.services.deleteUsuario(id).subscribe(resp=>{
      this.getAlumnos()
      this.getProfesores()
      this.getTutores()

   
      
      
    })

    Swal.close();
    Swal.fire({
      title: 'Eliminar Usuario',
      text: 'Usuario Eliminado',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  editarUsuario(usuario:UsuarioModel){
    const modalRef = this.modalService.open(FormModalAPComponentUsuario);
    modalRef.componentInstance.id = usuario.id;
    modalRef.componentInstance.modif = true;
    modalRef.componentInstance.usuariom=usuario;
    console.log(usuario.id)
    modalRef.result.then((result) => {
      this.getAlumnos()
      this.getProfesores()
      this.getTutores()
    });
  } 

  registrarAlumno(){
    const modalRef = this.modalService.open(FormModalAPComponentUsuario);
    modalRef.result.then((result) => {
      this.getAlumnos()
    });
  }

  registrarProfesor(){
    const modalRef = this.modalService.open(FormModalAPComponentUsuario);
    modalRef.result.then((result) => {
      this.getProfesores()
    });
  }
  
  registrarTutor(){
    const modalRef = this.modalService.open(FormModalAPComponentUsuario);
    modalRef.result.then((result) => {
      this.getTutores()
    });
  }
}
