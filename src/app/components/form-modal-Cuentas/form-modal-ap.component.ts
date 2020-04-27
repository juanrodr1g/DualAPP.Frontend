import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentUsuario {

  p:any= new Date()
  alumno=localStorage.getItem("eleccionCuentas")
  @Input() public id;
  @Input() public modif=false; 
  @Input() public usuariom: UsuarioModel;
arrayUsuarios: UsuarioModel[] = []
  profesorArray: UsuarioModel[] = [];
  tutorArray: UsuarioModel[] = [];
  cicloArray: UsuarioModel[] = [];
  usuario: UsuarioModel;
  cambio:boolean=false;
  HospValid=false;
  myForm: FormGroup;
  filePath;
  Imgsrc='/assets/image-placeholder.jpg';
  Imgpreview:any = null;
  isSubmitted:boolean=false;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private service: ProfesorService,
   public authservice:AuthService
  ) {

  }
  getProfesores(){
    this.service.getUsuarios().subscribe(resp=>{
      this.arrayUsuarios=resp;
      this.arrayUsuarios.forEach(element => {
        if(element.Rol=="profesor"){
          this.profesorArray.push(element)
        }
      });
    })
      }

      getTutores(){
        this.service.getUsuarios().subscribe(resp=>{
          this.arrayUsuarios=resp;
          this.arrayUsuarios.forEach(element => {
            if(element.Rol=="tutorempresa"){
              this.tutorArray.push(element)
            }
          });
        })
          }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.usuariom)
    this.createForm();
    console.log(this.alumno)
    this.getProfesores()
    this.getTutores()
   console.log(this.modif)
   if(this.modif==true){
  this.Apellidom.setValue(this.usuariom.Apellido, {
    onlySelf: true
  })
  this.Direccionm.setValue(this.usuariom.Direccion, {
    onlySelf: true
  })
  this.Dnim.setValue(this.usuariom.Dni, {
    onlySelf: true
  })
  this.cpm.setValue(this.usuariom.Cp, {
    onlySelf: true
  })
  this.emailm.setValue(this.usuariom.email, {
    onlySelf: true
  })
  this.Telefonom.setValue(this.usuariom.Telefono, {
    onlySelf: true
  })
  this.Nombrem.setValue(this.usuariom.Nombre, {
    onlySelf: true
  })
  setTimeout(() => {
    this.Profesorm.setValue(this.usuariom.Instructor, {
      onlySelf: true
    
    })
    this.tutorm.setValue(this.usuariom.Colaborador, {
      onlySelf: true
    })
    this.ciclom.setValue(this.usuariom.CicloFormativo, {
      onlySelf: true
    })
  }, 500);

  }
  }
  private createForm() {
    console.log(this.usuariom)
    this.myForm = this.formBuilder.group({
      Apellido:'',
      Nombre: ['', [Validators.required]],
      Instructor: [this.usuariom.Instructor, [Validators.required]],
      Colaborador: [this.usuariom.Colaborador, [Validators.required]],
      CicloFormativo: [this.usuariom.CicloFormativo, [Validators.required]],
      Dni: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      Cp: ['', [Validators.required]],
      email:['', [Validators.required]],
      FechaCreacion:`${this.p.getDate()}-${this.p.getMonth()+1}-${this.p.getFullYear()}`,
      password:'1234',
      Rol:this.alumno
    });
  }
 cambiarProfesor(e) {
  this.HospValid=true;
  this.Profesorm.setValue(e.target.value, {
    onlySelf: true
  })
}
cambiarTutor(e) {
  this.HospValid=true;
  this.tutorm.setValue(e.target.value, {
    onlySelf: true
  })
}
cambiarCiclo(e) {
  this.HospValid=true;
  this.ciclom.setValue(e.target.value, {
    onlySelf: true
  })
}

get Direccionm() {
  return this.myForm.get('Direccion');
}
get Apellidom() {
  return this.myForm.get('Apellido');
}
get Nombrem() {
  return this.myForm.get('Nombre');
}
get emailm() {
  return this.myForm.get('email');
}
get idm() {
  return this.myForm.get('id');
}
 get Profesorm() {
  return this.myForm.get('Instructor');
}
get Dnim() {
  return this.myForm.get('Dni');
}
get Telefonom() {
  return this.myForm.get('Telefono');
}
get tutorm() {
  return this.myForm.get('Colaborador');
}
 get ciclom() {
  return this.myForm.get('CicloFormativo');
}
get cpm() {
  return this.myForm.get('Cp');
}
get formControls(){
  return this.myForm['controls'];
}
submitForm(formValue)
{
  console.log(formValue)
  this.isSubmitted=true
  if(this.myForm.valid){
    if(this.modif){
      console.log("pepe")
      var usuario=formValue
      delete usuario.password
      delete usuario.FechaCreacion
      console.log(usuario)
this.service.patchUsuarios(this.id,usuario).subscribe(resp=>{
  this.isSubmitted=false
  Swal.close();
  this.usuariom.Instructor=''
  this.usuariom.Colaborador=''
  this.usuariom.CicloFormativo=''
  this.activeModal.close(this.myForm.value);
})
    }else{
      console.log("pepote")
    /*Swal.fire({
      title: 'Espere',
      text: 'Subiendo alumno...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();*/
  
this.authservice.registerUser(formValue).subscribe(resp=>{
  this.isSubmitted=false
  Swal.close();
  this.activeModal.close(this.myForm.value);
})
    
}
  }
}
 /*submitForm(formValue)
{
  if(formValue.Hospital=="Elije un hospital"){
    formValue.Hospital="";
    console.log("1")
    this.HospValid=false;
  }else if(formValue.Hospital==""){
    this.HospValid=false;
    console.log("2")
    console.log(this.isSubmitted)
  }else if(formValue.Hospital=="undefined"){
    this.HospValid=false;
    console.log("3")
  }else{
    this.HospValid=true;
    console.log("4")
  }
  this.isSubmitted=true
  if(this.myForm.valid && this.HospValid){
      Swal.fire({
        title: 'Espere',
        text: 'Subiendo médico...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();

if(!this.modif && this.HospValid){
  this.nombreIcono = `${formValue.Nombre.trim()}Img`+'.'+this.ext;
  if(this.file!=null){
    this.imagename =`http://localhost:3000/api/Containers/local-storage/download/${this.nombreIcono}`;
    }else{
      this.imagename='/assets/image-placeholder.jpg';
    }
  this.serviceMed.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
    console.log("imagen subida");
  });
  this.HospValid=true;
  this.medicos={
    Nombre:formValue.Nombre,
    Foto:this.imagename,
    Hospital:formValue.Hospital,
    Usuario:this.Usuario.Nombre,
    email:this.Usuario.email,
    userId:this.Usuario.id
  }
this.serviceMed.postMedicoos(this.medicos).subscribe(resp =>{
  this.isSubmitted=false
  Swal.close();
  this.activeModal.close(this.myForm.value);
});
}else if(this.HospValid){
  this.nombreIcono = `${formValue.Nombre.trim()}Img`+'.'+this.ext;
  if(this.file!=null){
  this.imagename =`http://localhost:3000/api/Containers/local-storage/download/${this.nombreIcono}`;
  }else{
    this.imagename='/assets/image-placeholder.jpg';
  }
  if(this.cambio){
  this.serviceMed.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
    console.log("imagen subida");
  });

  this.medicos={
    Nombre:formValue.Nombre,
    Foto:this.imagename,
    Hospital:formValue.Hospital,
    Usuario:this.Usuario.Nombre,
    email:this.Usuario.email,
    userId:this.Usuario.id
  }
}else{
  var ext1=this.medicom.Foto;
  var exten = ext1.split(".")
  var ext = exten[2];
  console.log(ext)
  this.medicos={
    Foto:this.medicom.Foto,
    Nombre:formValue.Nombre,
    Usuario:this.Usuario.Nombre,
    Hospital:formValue.Hospital,
    email:this.Usuario.email,
    userId:this.Usuario.id
  }
  this.serviceMed.uploadImages(this.img,`${formValue.Nombre.trim()}Img`+'.'+ext).subscribe(resp =>{
    console.log("imagen subida");
  });
}
  this.serviceMed.putMedicoos(formValue.id,this.medicos).subscribe(resp =>{
    this.modif=false;
  this.isSubmitted=false
  this.HospValid=true;
  Swal.close();
  this.activeModal.close(this.myForm.value);
  })
}
  }
}

handleFileSelect(evt){
  var files = evt.target.files;
  this.file = files[0];
  console.log(this.file)
  if(this.file!=null){
  this.ext=this.file.name;
  this.ext = this.ext.slice((this.ext.lastIndexOf(".") - 1 >>> 0) + 2);
if (files && this.file) {
    var reader = new FileReader();

    reader.onload =this._handleReaderLoaded.bind(this);

    reader.readAsBinaryString(this.file);
}
  }
}
_handleReaderLoaded(readerEvt) {
  this.cambio=true;
  var binaryString = readerEvt.target.result;
         this.img= btoa(binaryString);
         console.log(btoa(binaryString));
 }*/
}