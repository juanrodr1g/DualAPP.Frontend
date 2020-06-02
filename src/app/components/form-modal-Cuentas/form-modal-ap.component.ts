import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { AuthService } from 'src/app/services/auth.service';
import { CicloService } from 'src/app/services/ciclo.service';
import { error } from 'protractor';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentUsuario {
file;ext;img;nombreIcono
  p:any= new Date();g:any= new Date()
  alumno=localStorage.getItem("eleccionCuentas")
  @Input() public id;
  @Input() public modif=false; 
  @Input() public usuariom: UsuarioModel;
  imagename='/assets/image-placeholder.jpg';
arrayUsuarios: UsuarioModel[] = []
  profesorArray: UsuarioModel[] = [];
  tutorArray: UsuarioModel[] = [];
  cicloArray: UsuarioModel[] = [];
  usuario: UsuarioModel;
  cambio:boolean=false;
  myForm: FormGroup;
  filePath;
  Imgsrc='/assets/image-placeholder.jpg';
  Imgpreview:any = null;
  isSubmitted:boolean=false;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private service: ProfesorService,
   public authservice:AuthService,
   public cicloservice:CicloService
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
    this.cicloservice.getCiclos().subscribe(resp=>{
      this.cicloArray=resp
    })
   console.log(this.modif)
   if(this.modif==true){
    this.Imgsrc=this.usuariom.Foto
    this.Fotom.setValue(this.usuariom.Foto, {
      onlySelf: true
    })
  this.Apellidom.setValue(this.usuariom.Apellido, {
    onlySelf: true
  })
  this.passw.setValue(1, {
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
    if(!this.modif){
      this.usuariom={
        Instructor:"Ninguno",
        Colaborador:"Ninguno",
        CicloFormativo:"Ninguno"
      }
    }
    console.log(this.usuariom)
    this.myForm = this.formBuilder.group({
      Foto:'',
      Apellido:'',
      Nombre: ['', [Validators.required]],
      Instructor: ['',[Validators.required]],
      Colaborador: ['',[Validators.required]],
      CicloFormativo: ['',[Validators.required]],
      Dni: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      Cp: ['', [Validators.required]],
      email:['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      FechaCreacion:`${this.p.getDate()}-${this.p.getMonth()+1}-${this.p.getFullYear()}`,
      password:['', [Validators.required, Validators.minLength(6)]],
      PlantillaCiclo:"",
      Rol:this.alumno
    });
  }
 cambiarProfesor(e) {
  this.Profesorm.setValue(e.target.value, {
    onlySelf: true
  })
}
cambiarTutor(e) {
  this.tutorm.setValue(e.target.value, {
    onlySelf: true
  })
}
cambiarCiclo(e) {
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
get passw() {
  return this.myForm.get('password');
}
 get Profesorm() {
  return this.myForm.get('Instructor');
}
get Dnim() {
  return this.myForm.get('Dni');
}
get plantilla() {
  return this.myForm.get('PlantillaCiclo');
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
  
  this.isSubmitted=true
    if(this.myForm.valid){
      Swal.fire({
        title: 'Espere',
        text: 'Subiendo cuenta...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
    if(this.modif){
      this.nombreIcono = `${formValue.Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+this.ext
    if(this.file!=null){
      this.imagename =`https://dualapi.herokuapp.com/api/Containers/local-storage/download/${this.nombreIcono}`;
      }else{
        this.imagename='/assets/image-placeholder.jpg';
      }
      console.log("pepe")
    
      if(this.alumno=="alumno"){
      this.cicloArray.forEach(element => {
        if(element.Nombre==formValue.CicloFormativo){
          console.log(element)
          if(this.cambio){
          var alumno:UsuarioModel={
            Foto:this.imagename,
            Apellido:formValue.Apellido,
        Nombre:formValue.Nombre,
        Instructor: formValue.Instructor,
        Colaborador:formValue.Colaborador,
        CicloFormativo: formValue.CicloFormativo,
        Dni: formValue.Dni,
        Direccion: formValue.Direccion,
        Telefono: formValue.Telefono,
        Cp: formValue.Cp,
        email:formValue.email,
        FechaCreacion:formValue.FechaCreacion,
        password:formValue.password,
        PlantillaCiclo:element,
        Rol:formValue.Rol
          }
          delete alumno.password
      delete alumno.FechaCreacion
      this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
        console.log("imagen subida 1");
        this.service.patchUsuarios(this.id,alumno).subscribe(resp=>{
          this.isSubmitted=false
          Swal.close();
          this.usuariom.Instructor=''
          this.usuariom.Colaborador=''
          this.usuariom.CicloFormativo=''
          this.activeModal.close(this.myForm.value);
         
        })
      });
    }else{

      var ext1=this.usuariom.Foto;
      var exten = ext1.split(".")
      var ext = exten[2];
      console.log(ext)
      var alumno:UsuarioModel={
        Foto:this.usuariom.Foto,
        Apellido:formValue.Apellido,
    Nombre:formValue.Nombre,
    Instructor: formValue.Instructor,
    Colaborador:formValue.Colaborador,
    CicloFormativo: formValue.CicloFormativo,
    Dni: formValue.Dni,
    Direccion: formValue.Direccion,
    Telefono: formValue.Telefono,
    Cp: formValue.Cp,
    email:formValue.email,
    FechaCreacion:formValue.FechaCreacion,
    password:formValue.password,
    PlantillaCiclo:element,
    Rol:formValue.Rol
      }
      delete alumno.password
  delete alumno.FechaCreacion
  this.service.uploadImages(this.img,`${formValue.Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+ext).subscribe(resp =>{
    console.log("imagen subida 2");
  
    this.service.patchUsuarios(this.id,alumno).subscribe(resp=>{
      this.isSubmitted=false
      Swal.close();
      this.usuariom.Instructor=''
      this.usuariom.Colaborador=''
      this.usuariom.CicloFormativo=''
      this.activeModal.close(this.myForm.value);
      Swal.fire({
        title: 'Exito',
        text: 'Cuenta editada',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    })
  });

  

    }
      
        }
        })
      }else{
        if(this.cambio){
          var alumno:UsuarioModel={
            Foto:this.imagename,
            Apellido:formValue.Apellido,
        Nombre:formValue.Nombre,
        Dni: formValue.Dni,
        Direccion: formValue.Direccion,
        Telefono: formValue.Telefono,
        Cp: formValue.Cp,
        email:formValue.email,
        FechaCreacion:formValue.FechaCreacion,
        password:formValue.password,
        Rol:formValue.Rol
          }
          delete alumno.password
      delete alumno.FechaCreacion
      this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
        console.log("imagen subida 3");
        this.service.patchUsuarios(this.id,alumno).subscribe(resp=>{
          this.isSubmitted=false
          Swal.close();
          this.usuariom.Instructor=''
          this.usuariom.Colaborador=''
          this.usuariom.CicloFormativo=''
          this.activeModal.close(this.myForm.value);
        })
      });
    }else{

      var ext1=this.usuariom.Foto;
      var exten = ext1.split(".")
      var ext = exten[2];
      console.log(ext)
      var alumno:UsuarioModel={
        Foto:this.usuariom.Foto,
        Apellido:formValue.Apellido,
    Nombre:formValue.Nombre,
    Dni: formValue.Dni,
    Direccion: formValue.Direccion,
    Telefono: formValue.Telefono,
    Cp: formValue.Cp,
    email:formValue.email,
    FechaCreacion:formValue.FechaCreacion,
    password:formValue.password,
    Rol:formValue.Rol
      }
      delete alumno.password
  delete alumno.FechaCreacion

    this.service.patchUsuarios(this.id,alumno).subscribe(resp=>{
      this.isSubmitted=false
      Swal.close();
      this.usuariom.Instructor=''
      this.usuariom.Colaborador=''
      this.usuariom.CicloFormativo=''
      this.activeModal.close(this.myForm.value);
     
    })

    }
  }
    }else{
      console.log("pepote")
  
    if(this.alumno=="alumno"){
      this.nombreIcono = `${formValue.Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+this.ext
    if(this.file!=null){
      this.imagename =`https://dualapi.herokuapp.com/api/Containers/local-storage/download/${this.nombreIcono}`;
      }else{
        this.imagename='/assets/image-placeholder.jpg';
      }
    this.cicloArray.forEach(element => {
      if(element.Nombre==formValue.CicloFormativo){
        console.log(element)
        var alumno:UsuarioModel={
          Foto:this.imagename,
          Apellido:formValue.Apellido,
      Nombre:formValue.Nombre,
      Instructor: formValue.Instructor,
      Colaborador:formValue.Colaborador,
      CicloFormativo: formValue.CicloFormativo,
      Dni: formValue.Dni,
      Direccion: formValue.Direccion,
      Telefono: formValue.Telefono,
      Cp: formValue.Cp,
      email:formValue.email,
      FechaCreacion:formValue.FechaCreacion,
      password:formValue.password,
      PlantillaCiclo:element,
      Rol:formValue.Rol
        }
        this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
          console.log("imagen subida 4");
          Swal.close();
        console.log(alumno);
        Swal.fire({
          title: 'Exito',
          text: 'Cuenta creada',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.authservice.registerUser(alumno).subscribe(resp=>{
          this.isSubmitted=false
          this.activeModal.close(this.myForm.value);
        },error=>{
          Swal.close()
          setTimeout(() => {
            alert("Ese correo ya existe")
          }, 400);
        })
      });
      }
    });
  }else{
    this.nombreIcono = `${formValue.Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+this.ext
    if(this.file!=null){
      this.imagename =`https://dualapi.herokuapp.com/api/Containers/local-storage/download/${this.nombreIcono}`;
      }else{
        this.imagename='/assets/image-placeholder.jpg';
      }
    var alumno:UsuarioModel={
      Foto:this.imagename,
      Apellido:formValue.Apellido,
  Nombre:formValue.Nombre,
  Dni: formValue.Dni,
  Direccion: formValue.Direccion,
  Telefono: formValue.Telefono,
  Cp: formValue.Cp,
  email:formValue.email,
  FechaCreacion:formValue.FechaCreacion,
  password:formValue.password,
  Rol:formValue.Rol
    }
    this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
      console.log("imagen subida 5");
    console.log(alumno)
    this.authservice.registerUser(alumno).subscribe(resp=>{
      this.isSubmitted=false
     
      Swal.close();
      Swal.fire({
        title: 'Exito',
        text: 'Cuenta creada',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.activeModal.close(this.myForm.value);
    },error=>{
      console.log("ERRRRRROR")
      Swal.close();
    

    Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'El email ya existe.',
  confirmButtonText: 'OK'
    })
   

    })
  });
  }
  }

    
}
}
handleFileSelect(evt){
  var files = evt.target.files;
  this.file = files[0];
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
 }
 cambiaPreview(event:any){
  if(event.target.files && event.target.files[0]){
    const reader = new FileReader;
    reader.onload = (e:any) => {
      this.Imgsrc=e.target.result
    }
    reader.readAsDataURL(event.target.files[0])
    this.Imgpreview=event.target.files[0]
  }else{
    this.Imgsrc='/assets/image-placeholder.jpg'
    this.Imgpreview=null;
    this.Fotom.setValue(this.Imgsrc, {
      onlySelf: true
    })
  }
}
get Fotom() {
  return this.myForm.get('Foto');
}


get primEmail(){
	return this.myForm.get('email')
  }

}
