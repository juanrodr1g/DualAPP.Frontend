import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { FormModalAPComponentCambioContraseña } from '../form-modal-Cambiocontraseña/form-modal-ap.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-perfilusuarios',
  templateUrl: './perfilusuarios.component.html',
  styleUrls: ['./perfilusuarios.component.css']
})
export class PerfilusuariosComponent implements OnInit {
  editarUser:boolean=false
  id;
  userLS:UsuarioModel= JSON.parse(localStorage.getItem("currentUser"))
  usuario:UsuarioModel;
  email = new FormControl('', [Validators.required, Validators.email]);
  localstorage = JSON.parse(localStorage.getItem("currentUser"));





  constructor(public service:ProfesorService,public modalService:NgbModal) { }

  ngOnInit(): void {
    this.id=this.userLS.id
    this.service.getUsuarioPorId(this.userLS.id).subscribe(resp=>{
this.usuario=resp
    })
    console.log(this.localstorage.email);
    (<HTMLInputElement> document.getElementById("NombreLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("ApellidoLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("EmailLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("TelefonoLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputDireccion")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputCiudad")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputProvincia")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputCodigopostal")).disabled = true;
  }

  editarPerfil(){
    (<HTMLInputElement> document.getElementById("NombreLabel")).disabled = false;
    (<HTMLInputElement> document.getElementById("ApellidoLabel")).disabled = false;
    (<HTMLInputElement> document.getElementById("EmailLabel")).disabled = false;
    (<HTMLInputElement> document.getElementById("TelefonoLabel")).disabled = false;
    (<HTMLInputElement> document.getElementById("inputDireccion")).disabled = false;
    (<HTMLInputElement> document.getElementById("inputCiudad")).disabled = false;
    (<HTMLInputElement> document.getElementById("inputProvincia")).disabled = false;
    (<HTMLInputElement> document.getElementById("inputCodigopostal")).disabled = false;
this.editarUser=true
  }
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

confirmarEdicion(){
  var user={
  
    Nombre:(<HTMLInputElement> document.getElementById("NombreLabel")).value,
    Apellido:(<HTMLInputElement> document.getElementById("ApellidoLabel")).value,
    email:(<HTMLInputElement> document.getElementById("EmailLabel")).value,
    Telefono:(<HTMLInputElement> document.getElementById("TelefonoLabel")).value,
    Direccion:(<HTMLInputElement> document.getElementById("inputDireccion")).value,
    Ciudad:(<HTMLInputElement> document.getElementById("inputCiudad")).value,
    Provincia:(<HTMLInputElement> document.getElementById("inputProvincia")).value,
    Cp:(<HTMLInputElement> document.getElementById("inputCodigopostal")).value,
  
  }
console.log(user)
  this.service.patchUsuarios(this.id,user).subscribe(resp=>{
    console.log(resp)
    this.usuario = resp
    console.log(this.usuario);
    (<HTMLInputElement> document.getElementById("NombreLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("ApellidoLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("EmailLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("TelefonoLabel")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputDireccion")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputCiudad")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputProvincia")).disabled = true;
    (<HTMLInputElement> document.getElementById("inputCodigopostal")).disabled = true;
    this.editarUser=false
  })
}

cambiarContrasena(){
  const modalRef = this.modalService.open(FormModalAPComponentCambioContraseña);
}

}
