import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponentUsuario } from '../form-modal-Cuentas/form-modal-ap.component';


@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  constructor(public services:ProfesorService, public router:Router,public modalService:NgbModal) { }
arrayUsuarios:UsuarioModel[]=[];
arrayProfesores:UsuarioModel[]=[];
arrayTutores:UsuarioModel[]=[];
arrayAlumnos:UsuarioModel[]=[];
alumnoData:boolean=false
eleccionCuentas=localStorage.getItem("eleccionCuentas")
  ngOnInit(): void {
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
    this.router.navigate( ['/profesor/',alumno.id] );
    this.alumnoData=true
  }

  eliminarUsuario(id){
    this.services.deleteUsuario(id).subscribe(resp=>{
      this.getAlumnos()
      this.getProfesores()
      this.getTutores()
    })
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
