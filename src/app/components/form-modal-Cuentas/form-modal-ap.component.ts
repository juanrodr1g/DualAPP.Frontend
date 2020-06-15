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
import { Empresa } from 'src/app/models/empresa';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentUsuario {
file;ext;img;nombreIcono;cambiociclo:boolean=false;
existe:boolean=false
arrayAlumnos=[]
  p:any= new Date();g:any= new Date()
  alumno=localStorage.getItem("eleccionCuentas")
  @Input() public id;
  @Input() public modif=false; 
  @Input() public usuariom: UsuarioModel;
  imagename='/assets/image-placeholder.jpg';
arrayUsuarios: UsuarioModel[] = []
  profesorArray: UsuarioModel[] = [];
  tutorArray: UsuarioModel[] = [];
  cicloArray = [];
  empresaArray:Empresa[] = [];
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
   public cicloservice:CicloService,
   private storage: AngularFireStorage,
   public empresasService:EmpresasService
  ) {

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

      getTutores(){
        this.service.getUsuarios().subscribe(resp=>{
          this.arrayUsuarios=resp;
          setTimeout(() => {
            
          
          this.arrayUsuarios.forEach(element => {
            if(element.Rol=="tutorempresa"){
              this.tutorArray.push(element)
            }
          });
        }, 100);
        })
          }

          getEmpresas(){
            setTimeout(() => {
              this.empresasService.getEmpresas().subscribe(resp=>{
                this.empresaArray=resp;
  
              })
            }, 100);
            
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
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log(this.usuariom)
    this.createForm();
    console.log(this.alumno)
    this.getProfesores()
    this.getTutores()
    this.getEmpresas()
    setTimeout(() => {
      this.cicloservice.getCiclos().subscribe(resp=>{
        this.cicloArray=resp
      })
    }, 100);
this.getAlumnos()
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
    console.log(this.usuariom.Instructor)
    this.myForm.value['Instructor']=this.usuariom.Instructor
    this.tutorm.setValue(this.usuariom.Colaborador, {
      onlySelf: true
    })
    this.myForm.value['Colaborador']=this.usuariom.Colaborador
    this.ciclom.setValue(this.usuariom.CicloFormativo, {
      onlySelf: true
    })
    this.myForm.value['CicloFormativo']=this.usuariom.CicloFormativo
    this.empresam.setValue(this.usuariom.Empresa, {
      onlySelf: true
    })
    this.myForm.value['Empresa']=this.usuariom.Empresa
  }, 300);

  }else{
    setTimeout(() => {
      
    if(this.profesorArray.length==0){

    }else{
    this.Profesorm.setValue(this.profesorArray[0].Nombre+" "+this.profesorArray[0].Apellido, {
      onlySelf: true
    
    })
  }
  if(this.tutorArray.length==0){

  }else{
    this.tutorm.setValue(this.tutorArray[0].Nombre+" "+this.tutorArray[0].Apellido, {
      onlySelf: true
    })
    console.log(this.tutorArray[0].Nombre+" "+this.tutorArray[0].Apellido)
  }
  if(this.cicloArray.length==0){

  }else{
    this.ciclom.setValue(this.cicloArray[0].Nombre, {
      onlySelf: true
    })
  }
  if(this.empresaArray.length==0){

  }else{
    this.empresam.setValue(this.empresaArray[0].Nombre, {
      onlySelf: true
    })
  }
  }, 600);
  }
  }
  private createForm() {
    console.log(this.usuariom)
    this.myForm = this.formBuilder.group({
      Foto:'',
      Apellido:'',
      Nombre: ['', [Validators.required]],
      Instructor: [''],
      Colaborador: [''],
      CicloFormativo: [''],
      Empresa: [''],
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
  this.cambiociclo=true;
}
cambiarEmpresa(e) {
  this.empresam.setValue(e.target.value, {
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

get empresam() {
  return this.myForm.get('Empresa');
}
get cpm() {
  return this.myForm.get('Cp');
}
get formControls(){
  return this.myForm['controls'];
}
submitForm(formValue)
{
  this.existe=false
  this.isSubmitted=true
  this.existeUsuario(formValue.Nombre+" "+formValue.Apellido)
  setTimeout(() => {
    
  
  if(this.existe){
    Swal.fire({
      title: 'ERROR',
      text: 'Ya existe un usuario con ese nombre',
      icon: 'error',
      confirmButtonText: 'OK'
    })
    this.existe=false
  }else{
    if(formValue.Apellido!='' && formValue.Apellido!=undefined && formValue.Nombre!='' && formValue.Nombre!=undefined && formValue.Dni!='' && formValue.Dni!=undefined && formValue.Direccion!='' && formValue.Direccion!=undefined && formValue.email!='' && formValue.email!=undefined && formValue.Telefono!='' && formValue.Telefono!=undefined && formValue.Cp!='' && formValue.Cp!=undefined && formValue.password!='' && formValue.password!=undefined && this.myForm.controls['email'].valid && this.myForm.controls['password'].valid && this.myForm.controls['Dni'].valid){
      Swal.fire({
        title: 'Espere',
        text: 'Subiendo cuenta...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
    if(this.modif){
    if(this.file!=null){

      }else{
        this.imagename='/assets/image-placeholder.jpg';
      }
      console.log("pepe")
    
      if(this.alumno=="alumno"){
        console.log(formValue)
      this.cicloArray.forEach(element => {
        
        if(element.Nombre==formValue.CicloFormativo){
          console.log(element)
          if(this.cambio){
            this.filePath = `${formValue.Nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
            const fileRef = this.storage.ref(this.filePath);
            this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
              fileRef.getDownloadURL().subscribe((url) => {
                var imagename=''
                imagename = url;
                console.log(url) 
            if(this.cambiociclo){
          var alumno:UsuarioModel={
            Foto:imagename,
            Apellido:formValue.Apellido,
        Nombre:formValue.Nombre,
        Instructor: formValue.Instructor,
        Colaborador:formValue.Colaborador,
        CicloFormativo: formValue.CicloFormativo,
        Empresa: formValue.Empresa,
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
        }else{
          var alumno:UsuarioModel={
            Foto:imagename,
            Apellido:formValue.Apellido,
        Nombre:formValue.Nombre,
        Instructor: formValue.Instructor,
        Colaborador:formValue.Colaborador,
        Empresa: formValue.Empresa,
        Dni: formValue.Dni,
        Direccion: formValue.Direccion,
        Telefono: formValue.Telefono,
        Cp: formValue.Cp,
        email:formValue.email,
        FechaCreacion:formValue.FechaCreacion,
        password:formValue.password,
        Rol:formValue.Rol
          }
        }
          delete alumno.password
      delete alumno.FechaCreacion

        this.service.patchUsuarios(this.id,alumno).subscribe(resp=>{
          setTimeout(() => {
          this.arreglarRelacion(resp)
        }, 300);
          setTimeout(() => {
            
          
          this.isSubmitted=false
          Swal.close();
          Swal.fire({
            title: 'Exito',
            text: 'Cuenta editada',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.usuariom.Instructor=''
          this.usuariom.Colaborador=''
          this.usuariom.CicloFormativo=''
          this.usuariom.Empresa=''
          this.activeModal.close(this.myForm.value);
         
          console.log("ERROR LOKO")
        }, 500);
        })
      })})
    }else{

      var ext1=this.usuariom.Foto;
      var exten = ext1.split(".")
      var ext = exten[2];
      console.log(ext)
      if(this.cambiociclo){
      var alumno:UsuarioModel={
        Foto:this.usuariom.Foto,
        Apellido:formValue.Apellido,
    Nombre:formValue.Nombre,
    Instructor: formValue.Instructor,
    Colaborador:formValue.Colaborador,
    CicloFormativo: formValue.CicloFormativo,
    Empresa: formValue.Empresa,
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
    }else{
      var alumno:UsuarioModel={
        Foto:this.usuariom.Foto,
        Apellido:formValue.Apellido,
    Nombre:formValue.Nombre,
    Instructor: formValue.Instructor,
    Colaborador:formValue.Colaborador,
    Empresa: formValue.Empresa,
    Dni: formValue.Dni,
    Direccion: formValue.Direccion,
    Telefono: formValue.Telefono,
    Cp: formValue.Cp,
    email:formValue.email,
    FechaCreacion:formValue.FechaCreacion,
    password:formValue.password,
    Rol:formValue.Rol
      }
    }
      delete alumno.password
  delete alumno.FechaCreacion
    this.service.patchUsuarios(this.id,alumno).subscribe(resp=>{
      setTimeout(() => {
        this.arreglarRelacion(resp)
      }, 300);
      setTimeout(() => {
        
      
      this.isSubmitted=false
      Swal.close();
      Swal.fire({
        title: 'Exito',
        text: 'Cuenta editada',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.usuariom.Instructor=''
      this.usuariom.Colaborador=''
      this.usuariom.CicloFormativo=''
      this.usuariom.Empresa=''
      this.activeModal.close(this.myForm.value);
      
    }, 500);
    })
    

  

    }
      
        }
        })
      }else{
        if(this.cambio){
          this.filePath = `${formValue.Nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
      fileRef.getDownloadURL().subscribe((url) => {
        var imagename=''
        imagename = url;
        console.log(url) 
          var alumno:UsuarioModel={
            Foto:imagename,
            Apellido:formValue.Apellido,
        Nombre:formValue.Nombre,
        Dni: formValue.Dni,
        Direccion: formValue.Direccion,
        Empresa: formValue.Empresa,
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
          setTimeout(() => {
            this.arreglarRelacion(resp)
          }, 300);
          setTimeout(() => {
            
          
          this.isSubmitted=false
          Swal.close();
          Swal.fire({
            title: 'Exito',
            text: 'Cuenta editada',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.usuariom.Instructor=''
          this.usuariom.Colaborador=''
          this.usuariom.CicloFormativo=''
          this.activeModal.close(this.myForm.value);
        }, 500);
        })
      })})
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
    Empresa: formValue.Empresa,
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
      setTimeout(() => {
        this.arreglarRelacion(resp)
      }, 300);
      setTimeout(() => {
        
      
      this.isSubmitted=false
      Swal.close();
      Swal.fire({
        title: 'Exito',
        text: 'Cuenta editada',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.usuariom.Instructor=''
      this.usuariom.Colaborador=''
      this.usuariom.CicloFormativo=''
      this.activeModal.close(this.myForm.value);
    }, 500);
    })

    }
  }
    }else{
      if(this.Imgpreview==undefined){
        if(this.alumno=="alumno"){
          console.log("entra")
          console.log(formValue)
        this.cicloArray.forEach(element => {
          if(element.Nombre==formValue.CicloFormativo){
            console.log(formValue)
            console.log(element)
            var alumno:UsuarioModel={
              Foto:this.Imgsrc,
              Apellido:formValue.Apellido,
          Nombre:formValue.Nombre,
          Instructor: formValue.Instructor,
          Colaborador:formValue.Colaborador,
          CicloFormativo: formValue.CicloFormativo,
          Empresa: formValue.Empresa,
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
            this.service.sendEmail(alumno.email,alumno.password).subscribe(resp=>{
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
                Swal.close()
                setTimeout(() => {
                  Swal.fire({
                    title: 'ERROR',
                    text: 'Ese correo ya existe',
                    icon: 'error',
                    confirmButtonText: 'OK'
                  });
                }, 400);
              })
    
            },error=>{
              Swal.close()
              setTimeout(() => {
                console.log(formValue)
                Swal.fire({
                  title: 'ERROR',
                  text: 'Ese correo no existe',
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              }, 400);
            })
          }
        });
      }else{
        var alumno:UsuarioModel={
          Foto:this.Imgsrc,
          Apellido:formValue.Apellido,
      Nombre:formValue.Nombre,
      Dni: formValue.Dni,
      Direccion: formValue.Direccion,
      Telefono: formValue.Telefono,
      Empresa: formValue.Empresa,
      Cp: formValue.Cp,
      email:formValue.email,
      FechaCreacion:formValue.FechaCreacion,
      password:formValue.password,
      Rol:formValue.Rol
        }
        this.authservice.registerUser(alumno).subscribe(resp=>{
          this.service.sendEmail(alumno.email,alumno.password).subscribe(resp=>{
            this.isSubmitted=false
            Swal.close();
          Swal.fire({
            title: 'Exito',
            text: 'Cuenta creada',
            icon: 'success',
            confirmButtonText: 'OK'
          });
            this.activeModal.close(this.myForm.value);
          })
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
      }
      }else{
      this.filePath = `${formValue.Nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
      fileRef.getDownloadURL().subscribe((url) => {
        var imagename=''
        imagename = url;
        console.log(url) 

        

    if(this.alumno=="alumno"){
      console.log("entra")
      console.log(formValue)
    this.cicloArray.forEach(element => {
      if(element.Nombre==formValue.CicloFormativo){
        console.log(formValue)
        console.log(element)
        var alumno:UsuarioModel={
          Foto:imagename,
          Apellido:formValue.Apellido,
      Nombre:formValue.Nombre,
      Instructor: formValue.Instructor,
      Colaborador:formValue.Colaborador,
      CicloFormativo: formValue.CicloFormativo,
      Empresa: formValue.Empresa,
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
        this.service.sendEmail(alumno.email,alumno.password).subscribe(resp=>{
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
            Swal.close()
            setTimeout(() => {
              Swal.fire({
                title: 'ERROR',
                text: 'Ese correo ya existe',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }, 400);
          })

        },error=>{
          Swal.close()
          setTimeout(() => {
            console.log(formValue)
            Swal.fire({
              title: 'ERROR',
              text: 'Ese correo no existe',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }, 400);
        })
      }
    });
  }else{
    var alumno:UsuarioModel={
      Foto:imagename,
      Apellido:formValue.Apellido,
  Nombre:formValue.Nombre,
  Dni: formValue.Dni,
  Direccion: formValue.Direccion,
  Telefono: formValue.Telefono,
  Empresa: formValue.Empresa,
  Cp: formValue.Cp,
  email:formValue.email,
  FechaCreacion:formValue.FechaCreacion,
  password:formValue.password,
  Rol:formValue.Rol
    }
    this.authservice.registerUser(alumno).subscribe(resp=>{
      this.service.sendEmail(alumno.email,alumno.password).subscribe(resp=>{
        this.isSubmitted=false
        Swal.close();
      Swal.fire({
        title: 'Exito',
        text: 'Cuenta creada',
        icon: 'success',
        confirmButtonText: 'OK'
      });
        this.activeModal.close(this.myForm.value);
      })
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
  }
})
})
      }
  }

    
}

  }
}, 300);
}
existeUsuario(nombre){
  this.existe=false
  var r:boolean=false
  console.log(this.existe)
  if(this.usuariom==undefined){
var p = ''
  }else{
  var p=this.usuariom.Nombre+" "+this.usuariom.Apellido
  }
  this.arrayUsuarios.forEach(function(element,index){
    if(element.Nombre+" "+element.Apellido==nombre && p!=nombre){
      r=true
    }
  });
  setTimeout(() => {
    this.existe=r
  }, 100);
  
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

arreglarRelacion(cuentaModificada){
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
if(cuentaModificada.Rol=="profesor"){
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb")
this.arrayAlumnos.forEach(element => {
  console.log(element.Instructor)
  console.log(this.usuariom.Nombre+" "+this.usuariom.Apellido)
  console.log(cuentaModificada.Nombre+" "+cuentaModificada.Apellido)
  if(element.Instructor==this.usuariom.Nombre+" "+this.usuariom.Apellido){
var alumno={
  Instructor:cuentaModificada.Nombre+" "+cuentaModificada.Apellido
}
this.service.patchUsuarios(element.id,alumno).subscribe()
  }
});
  
  this.cicloArray.forEach(element => {
    console.log(element.Profesor)
    console.log(this.usuariom.Nombre+" "+this.usuariom.Apellido)
    console.log(cuentaModificada.Nombre+" "+cuentaModificada.Apellido)
    if(element.Profesor==this.usuariom.Nombre+" "+this.usuariom.Apellido){
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
    console.log(this.usuariom.Nombre+" "+this.usuariom.Apellido)
    console.log(cuentaModificada.Nombre+" "+cuentaModificada.Apellido)
    if(element.Colaborador==this.usuariom.Nombre+" "+this.usuariom.Apellido){
  var alumno={
    Colaborador:cuentaModificada.Nombre+" "+cuentaModificada.Apellido
  }
  this.service.patchUsuarios(element.id,alumno).subscribe()
    }
  });
  this.empresaArray.forEach(element => {
    if(element.TutorEmpresa==this.usuariom.Nombre+" "+this.usuariom.Apellido){
      var empresa={
        TutorEmpresa:cuentaModificada.Nombre+" "+cuentaModificada.Apellido,
        fotoTutor:cuentaModificada.Foto
      }
      this.empresasService.patchEmpresas(element.id,empresa).subscribe()
    }
  });
}
}

_handleReaderLoaded(readerEvt) {
  this.cambio=true;
  var binaryString = readerEvt.target.result;
         this.img= btoa(binaryString);
         console.log(btoa(binaryString));
 }
 cambiaPreview(event:any){
   this.cambio=true
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
