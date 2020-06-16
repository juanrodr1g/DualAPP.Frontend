import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Empresa } from 'src/app/models/empresa';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AuthService } from 'src/app/services/auth.service';
import { error } from 'protractor';
import { create } from 'domain';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentEditarEmpresa {
  Imgpreview:any = null;
  arrayAlumnos=[]
  cambio:boolean=false
  existe:boolean=false
  Imgsrc='/assets/image-placeholder.jpg';
  file;ext;img;nombreIcono;imagename;g:Date=new Date()
  Tutor;
  empresa: Empresa;
  myForm: FormGroup;
  isSubmitted:boolean=false;
  arrayTutores:UsuarioModel[]=[];
  arrayUsuarios:UsuarioModel[]=[];
  arrayEmpresas:Empresa[]=[];
  filePath
  @Input() public id;
  @Input() public modif=false; 
  @Input() public empresam: Empresa;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private service: EmpresasService,
   public authservice:AuthService,
   public services:ProfesorService,
   public storage:AngularFireStorage
  ) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
this.createForm();
this.getTutores();
this.getAlumnos()
console.log(this.modif)
if(this.modif==true){
this.cargarDatos()

  }
  
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

cargarDatos(){
  this.Nombrem.setValue(this.empresam.Nombre, {
    onlySelf: true
  })
  this.myForm.value['Nombre'] = this.empresam.Nombre;
this.Direccionm.setValue(this.empresam.Direccion, {
  onlySelf: true
})
this.myForm.value['Direccion'] = this.empresam.Direccion;
this.Telefonom.setValue(this.empresam.Telefono, {
  onlySelf: true
})
this.Imgsrc=this.empresam.fotoEmpresa
this.fotoEmpresam.setValue(this.empresam.fotoEmpresa, {
  onlySelf: true
})
this.myForm.value['Telefono'] = this.empresam.Telefono;
this.Emailm.setValue(this.empresam.Email, {
  onlySelf: true
})
this.myForm.value['Email'] = this.empresam.Email;

}

existeEmpresa(nombre){
  this.existe=false
  console.log(this.existe)
  this.service.getEmpresas().subscribe(resp=>{
    this.arrayEmpresas=resp
  this.arrayEmpresas.forEach(element=>{
    console.log(nombre)
    console.log(element.Nombre)
    if(element.Nombre==nombre && this.empresam.Nombre!=nombre){
      this.existe=true
    }
  });
})
  }


  arreglarRelacion(empresaModificada){
this.arrayAlumnos.forEach(element => {
  if(empresaModificada.Nombre!=element.Empresa && element.Empresa==this.empresam.Nombre){
    var alumno={
      Empresa:empresaModificada.Nombre
    }
    this.services.patchUsuarios(element.id,alumno).subscribe()
  }
});
this.arrayTutores.forEach(element => {
  if(empresaModificada.Nombre!=element.Empresa && element.Empresa==this.empresam.Nombre){
    var tutor={
      Empresa:empresaModificada.Nombre
    }
    this.services.patchUsuarios(element.id,tutor).subscribe()
  }
});
  }

  private createForm() {
    
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      Email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      fotoEmpresa:''
    });
 
  }
  



get formControls(){
  return this.myForm['controls'];
}
submitForm(formValue){
  this.existeEmpresa(formValue.Nombre)
  this.isSubmitted=true

this.getTutor()
setTimeout(() => {
  if(formValue.Nombre!=undefined && formValue.Nombre!='' && formValue.Direccion!=undefined && formValue.Direccion!='' && formValue.Telefono!=undefined && formValue.Telefono!='' && formValue.Email!=undefined && formValue.Email!='' && this.myForm.controls['Email'].valid){
    Swal.fire({
      title: 'Espere',
      text: 'Puede tardar unos segundos...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
      
    console.log("oumama")
    if(this.existe){
      Swal.fire({
        title: 'ERROR',
        text: 'Esa empresa ya existe',
        icon: 'error',
        confirmButtonText: 'OK'
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
          setTimeout(() => {
        var empresa1={
          Nombre:formValue.Nombre,
          Direccion:formValue.Direccion,
          Telefono:formValue.Telefono,
          Email:formValue.Email,
          fotoEmpresa:imagename
    
        }
        
        this.arrayEmpresas.push(empresa)
        console.log(this.arrayEmpresas)

        this.service.patchEmpresas(this.id,empresa1).subscribe(resp=>{
          this.arreglarRelacion(resp)
          setTimeout(() => {
            
          
          Swal.fire({
            title: 'Exito!',
            text: 'Empresa editada',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.activeModal.close()
        }, 400);
        })
      }, 400);
    })})
      }else{
    var empresa={
      Nombre:formValue.Nombre,
      Direccion:formValue.Direccion,
      Telefono:formValue.Telefono,
      Email:formValue.Email

    }
    
    this.arrayEmpresas.push(empresa)
    console.log(this.arrayEmpresas)

    this.service.patchEmpresas(this.id,empresa).subscribe(resp=>{
      this.arreglarRelacion(resp)
          setTimeout(() => {
            
          
          Swal.fire({
            title: 'Exito!',
            text: 'Empresa editada',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          this.activeModal.close()
        }, 400);
    })
  }

    }

  }else{
    Swal.fire({
      title: 'ERROR',
      text: 'Rellene todos los datos',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}, 200);
}




get TutorEmpresam() {
  return this.myForm.get('TutorEmpresa');
}
get fotoEmpresam() {
  return this.myForm.get('fotoEmpresa');
}

getTutores(){
  this.arrayTutores=[]
  this.services.getUsuarios().subscribe(resp=>{
    this.arrayUsuarios=resp;
    setTimeout(() => {
      this.arrayUsuarios.forEach(element => {
        if(element.Rol=="tutorempresa"){
          this.arrayTutores.push(element)
        }
      });
    }, 100);

  })
    }
    get primEmail(){
      return this.myForm.get('Email')
      }

    get Nombrem() {
      return this.myForm.get('Nombre');
    }
    get Direccionm() {
      return this.myForm.get('Direccion');
    }
    get Telefonom() {
      return this.myForm.get('Telefono');
    }
    get Emailm() {
      return this.myForm.get('Email');
    }

    getTutor(){
      console.log(this.arrayTutores)
      this.arrayTutores.forEach(element => {
        if(element.Nombre+" "+element.Apellido==this.myForm.value.TutorEmpresa){
          this.Tutor=element
          console.log(this.Tutor)
        }
      });
      console.log(this.Tutor)
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
      return this.myForm.get('fotoEmpresa');
    }
}