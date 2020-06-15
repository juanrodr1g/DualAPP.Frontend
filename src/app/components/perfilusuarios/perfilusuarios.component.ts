import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { FormModalAPComponentCambioContraseña } from '../form-modal-Cambiocontraseña/form-modal-ap.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/storage';
import Swal from 'sweetalert2';
import { CicloService } from 'src/app/services/ciclo.service';


@Component({
  selector: 'app-perfilusuarios',
  templateUrl: './perfilusuarios.component.html',
  styleUrls: ['./perfilusuarios.component.css']
})
export class PerfilusuariosComponent implements OnInit {
  editarUser:boolean=false
  id;file;ext;img
  arrayUsuarios=[]
  profesorArray=[]
  arrayAlumnos=[]
  cicloArray=[]
  nombreIcono;g:Date=new Date()
  userLS:UsuarioModel= JSON.parse(localStorage.getItem("currentUser"))
  usuario:UsuarioModel;
  email = new FormControl('', [Validators.required, Validators.email]);
  localstorage = JSON.parse(localStorage.getItem("currentUser"));
Imgsrc;Imgpreview;filePath




  constructor(public service:ProfesorService,public modalService:NgbModal,
    public storage:AngularFireStorage,public cicloservice:CicloService) { }

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

  getProfesores(){
    this.service.getUsuarios().subscribe(resp=>{
      this.arrayUsuarios=resp;
      setTimeout(() => {
        
      
      this.arrayUsuarios.forEach(element => {
        if(element.Rol=="profesor"){
          this.profesorArray.push(element)
        }
      });
    }, 100);
    })
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
  getAlumnos(){
    this.arrayAlumnos=[]
this.service.getUsuarios().subscribe(resp=>{
  this.arrayUsuarios=resp;
  this.arrayUsuarios.forEach(element => {
    if(element.Rol=="alumno"){
      this.arrayAlumnos.push(element)
    }
  });
})
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
    this.arreglarRelacion
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
arreglarRelacion(cuentaModificada){
if(cuentaModificada.Rol=="profesor"){
this.arrayAlumnos.forEach(element => {
  if(element.Instructor==this.usuario.Nombre+" "+this.usuario.Apellido){
var alumno={
  Instructor:cuentaModificada.Nombre+" "+cuentaModificada.Apellido
}
this.service.patchUsuarios(element.id,alumno).subscribe()
  }
});
  
  this.cicloArray.forEach(element => {
    if(element.Profesor==this.usuario.Nombre+" "+this.usuario.Apellido){
      var ciclo={
        Profesor:cuentaModificada.Nombre+" "+cuentaModificada.Apellido,
        fotoProfesor:cuentaModificada.Foto
      }
      console.log(ciclo)
      this.cicloservice.patchCiclos(element.id,ciclo).subscribe()
    }
  });

}else if(cuentaModificada.Rol=="tutorempresa"){
  this.arrayAlumnos.forEach(element => {
    console.log(element.Instructor)
    console.log(this.usuario.Nombre+" "+this.usuario.Apellido)
    console.log(cuentaModificada.Nombre+" "+cuentaModificada.Apellido)
    if(element.Colaborador==this.usuario.Nombre+" "+this.usuario.Apellido){
  var alumno={
    Colaborador:cuentaModificada.Nombre+" "+cuentaModificada.Apellido
  }
  this.service.patchUsuarios(element.id,alumno).subscribe()
    }
  });
}
}
cambiarContrasena(){
  const modalRef = this.modalService.open(FormModalAPComponentCambioContraseña);
}
cambiaPreview(event:any){
  if(event.target.files && event.target.files[0]){
    const reader = new FileReader;
    reader.onload = (e:any) => {
      this.Imgsrc=e.target.result
    }
    reader.readAsDataURL(event.target.files[0])
    this.Imgpreview=event.target.files[0]
    setTimeout(() => {
      Swal.fire({
        title: 'Espere',
        text: 'Puede tardar unos segundos...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
      this.cambiarFoto()
    }, 400);
  }else{
    this.Imgsrc='/assets/image-placeholder.jpg'
    this.Imgpreview=null;
  }
}
cambiarFoto(){
  var Nombre=(<HTMLInputElement> document.getElementById("NombreLabel")).value
  this.nombreIcono=`${Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+this.ext
  this.filePath = `${this.usuario.Nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  const fileRef = this.storage.ref(this.filePath);
  this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
    fileRef.getDownloadURL().subscribe((url) => {
      var imagename=''
      imagename = url;
      console.log(url) 
    var user={
      Foto:imagename
    }
   this.service.patchUsuarios(this.id,user).subscribe(resp=>{
    console.log(resp)
    this.getUsuario()
    setTimeout(() => {
      location.reload()
    }, 500);
    
   })
})})
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
