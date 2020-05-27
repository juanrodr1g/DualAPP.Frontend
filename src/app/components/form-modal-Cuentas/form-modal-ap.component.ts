import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { AuthService } from 'src/app/services/auth.service';
import { CicloService } from 'src/app/services/ciclo.service';


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
      Apellido:'',
      Nombre: ['', [Validators.required]],
      Instructor: this.usuariom.Instructor,
      Colaborador: this.usuariom.Colaborador,
      CicloFormativo: this.usuariom.CicloFormativo,
      Dni: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      Cp: ['', [Validators.required]],
      email:['', [Validators.required]],
      FechaCreacion:`${this.p.getDate()}-${this.p.getMonth()+1}-${this.p.getFullYear()}`,
      password:['', [Validators.required]],
      PlantillaCiclo:"",
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
    if(this.modif){
      console.log("pepe")
      if(this.alumno=="alumno"){
      this.cicloArray.forEach(element => {
        if(element.Nombre==formValue.CicloFormativo){
          console.log(element)
          var alumno:UsuarioModel={
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
      this.service.patchUsuarios(this.id,alumno).subscribe(resp=>{
        this.isSubmitted=false
        Swal.close();
        this.usuariom.Instructor=''
        this.usuariom.Colaborador=''
        this.usuariom.CicloFormativo=''
        this.activeModal.close(this.myForm.value);
      })
        }
        })
      }else{
        var alumno:UsuarioModel={
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
      this.activeModal.close(this.myForm.value);
    })
      }
      
    }else{
      console.log("pepote")
    /*Swal.fire({
      title: 'Espere',
      text: 'Subiendo alumno...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();*/
    if(this.alumno=="alumno"){
    this.cicloArray.forEach(element => {
      if(element.Nombre==formValue.CicloFormativo){
        console.log(element)
        var alumno:UsuarioModel={
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
        console.log(alumno)
        this.authservice.registerUser(alumno).subscribe(resp=>{
          this.isSubmitted=false
          
          Swal.close();
          this.activeModal.close(this.myForm.value);
        })
      }
    });
  }else{
    var alumno:UsuarioModel={
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
    console.log(alumno)
    this.authservice.registerUser(alumno).subscribe(resp=>{
      this.isSubmitted=false
      
      Swal.close();
      this.activeModal.close(this.myForm.value);
    })
  }
  }

    
}
}
}
