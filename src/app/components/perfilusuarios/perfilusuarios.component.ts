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
  id;file;ext;img
  nombreIcono;g:Date=new Date()
  userLS:UsuarioModel= JSON.parse(localStorage.getItem("currentUser"))
  usuario:UsuarioModel;
  email = new FormControl('', [Validators.required, Validators.email]);
  localstorage = JSON.parse(localStorage.getItem("currentUser"));





  constructor(public service:ProfesorService,public modalService:NgbModal) { }

  ngOnInit(): void {
    this.id=this.userLS.id
    this.getUsuario()
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

  handleFileSelect(evt){
    var files = evt.target.files;
    this.file = files[0];
    this.ext=this.file.name;
    this.ext = this.ext.slice((this.ext.lastIndexOf(".") - 1 >>> 0) + 2);
  if (files && this.file) {
      var reader = new FileReader();
  
      reader.onload =this._handleReaderLoaded.bind(this);
  
      reader.readAsBinaryString(this.file);
      setTimeout(() => {
        this.cambiarFoto()
      }, 400);
  }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.img= btoa(binaryString);
           console.log(btoa(binaryString));
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
    this.getUsuario()
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

cambiarFoto(){
  var Nombre=(<HTMLInputElement> document.getElementById("NombreLabel")).value
  this.nombreIcono=`${Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+this.ext
  this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
    console.log("imagen subida");
    var user={
      Foto:`https://dualapi.herokuapp.com/api/Containers/local-storage/download/${this.nombreIcono}`
    }
   this.service.patchUsuarios(this.id,user).subscribe(resp=>{
    console.log(resp)
    this.getUsuario()
    setTimeout(() => {
      location.reload()
    }, 500);
    
   })
})
}

getUsuario(){
  this.service.getUsuarioPorId(this.id).subscribe(resp=>{
    this.usuario=resp
    var p:any=resp
    Object.defineProperty(p,"id",{value:this.id})
    console.log(p)
    localStorage.setItem("currentUser",JSON.stringify(p))
    if(this.usuario.Foto==undefined){
      this.usuario.Foto='/assets/image-placeholder.jpg'
    }
  })
}

}
