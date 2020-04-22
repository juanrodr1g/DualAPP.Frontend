import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import {HospitalesModel} from "../../models/hospitales"
import {UsuarioModel} from "../../models/usuario";
import { HospitalesService } from 'src/app/services/hospitales';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponent {
  Usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser"));
  @Input() public modif=false; 
  @Input() public hospitalm: HospitalesModel;
  cambio:boolean=false;
  nombreIcono;
  imagename='/assets/image-placeholder.jpg';
  ext;
  hospitales: HospitalesModel;
  myForm: FormGroup;
  filePath;
  Imgsrc='/assets/image-placeholder.jpg';
  Imgpreview:any = null;
  file;
  img;
  isSubmitted:boolean=false;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private service: HospitalesService
  ) {
    this.createForm();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.modif)
    if(this.modif==true){
      this.idm.setValue(this.hospitalm.id, {
        onlySelf: true
      })
  
    this.Imgsrc=this.hospitalm.Foto
    this.Fotom.setValue(this.hospitalm.Foto, {
      onlySelf: true
    })
    //if(this.peliculam.portada!=null){
    //this.Imgsrc=this.peliculam.portada
    //}
    //console.log(this.port)
    this.Nombrem.setValue(this.hospitalm.Nombre, {
      onlySelf: true
    })
    this.Usuariom.setValue(this.hospitalm.Usuario, {
      onlySelf: true
    })
    }else{
      this.Usuariom.setValue(this.Usuario.Nombre, {
        onlySelf: true
      })
    }
  }
  private createForm() {
    this.myForm = this.formBuilder.group({
      id:'',
      Foto:'',
      Nombre: ['', [Validators.required]],
      Usuario: ['', [Validators.required]]
    });
  }/*
  private submitForm(formValue) {
    
    this.isSubmitted=true
if(this.myForm.valid){
  console.log(this.Imgpreview)
  if(this.Imgpreview==null && this.modif == false){
    Swal.fire({
      text:'Tienes que añadir una portada',
      icon: 'warning'
    })
  }else{
    if(this.modif==false){
      Swal.fire({
        title: 'Espere',
        text: 'Subiendo película...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
    this.filePath = `${formValue.genero}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['portada'] = url;
          this.pelicula=formValue;
  this.service.crearPelicula(this.pelicula).subscribe( resp => {
            this.resetForm();
            this.activeModal.close(this.myForm.value);
          })
  
        })
      })
    ).subscribe();
  }else{
    Swal.fire({
      title: 'Espere',
      text: 'Actualizando película...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    if(this.Imgpreview==null){
      console.log(this.peliculam)
      this.service.actualizarPelicula(this.myForm.value).subscribe( resp => {
        this.resetForm();
        this.modif=false;
        this.activeModal.close(this.myForm.value);
      })
    }else{
    this.filePath = `${formValue.genero}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          formValue['portada'] = url;
          this.peliculam=formValue;
          console.log(this.peliculam)
          this.service.actualizarPelicula(this.myForm.value).subscribe( resp => {
            this.resetForm();
            this.modif=false;
            this.activeModal.close(this.myForm.value);
          })
  
        })
      })
    ).subscribe();
    }
  }
}
}else{
    
}
  }
  get generon() {
    return this.myForm.get('genero');
  }
  get port() {
    return this.myForm.get('portada');
  }
  get descrip() {
    return this.myForm.get('descripcion');
  }
  get titul() {
    return this.myForm.get('titulo');
  }
  get idm() {
    return this.myForm.get('id');
  }
  cambiarGenero(e) {
    this.generon.setValue(e.target.value, {
      onlySelf: true
    })
  }

  cambiarPortada(e){
    console.log(e.target.value)
    this.port.setValue(e.target.value, {
      onlySelf: true
    })
  }
  get formControls(){
    return this.myForm['controls'];
  }
  resetForm() {
    this.myForm.reset();
    this.Imgsrc = '/assets/img/image_placeholder.jpg';
    this.Imgpreview = null;
    this.isSubmitted = false;
  }
  */
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
get Usuariom() {
  return this.myForm.get('Usuario');
}
get idm() {
  return this.myForm.get('id');
}
get Nombrem() {
  return this.myForm.get('Nombre');
}
 submitForm(formValue)
{
  this.isSubmitted=true
  if(this.myForm.valid){
    Swal.fire({
      title: 'Espere',
      text: 'Subiendo médico...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

  console.log(formValue.Nombre);
  if(!this.modif){
    this.nombreIcono = `${formValue.Nombre.trim()}Img`+'.'+this.ext;
    if(this.file!=null){
      this.imagename =`http://localhost:3000/api/Containers/local-storage/download/${this.nombreIcono}`;
      }else{
        this.imagename='/assets/image-placeholder.jpg';
      }
    
  this.hospitales={
    Foto:this.imagename,
    Nombre:formValue.Nombre,
    Usuario:this.Usuario.Nombre,
    email:this.Usuario.email,
    userId:this.Usuario.id
  }
  this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
    console.log("imagen subida");
  });
this.service.postHospitalees(this.hospitales).subscribe(resp =>{
  this.isSubmitted=false
  Swal.close()
  this.activeModal.close(this.myForm.value);
});
  }else {
    localStorage.setItem("update2","1")
    console.log(this.hospitalm)
    this.nombreIcono = `${formValue.Nombre.trim()}Img`+'.'+this.ext;
    if(this.file!=null){
      this.imagename =`http://localhost:3000/api/Containers/local-storage/download/${this.nombreIcono}`;
      }else{
        this.imagename='/assets/image-placeholder.jpg';
      }
    if(this.cambio){
    this.hospitales={
      Foto:this.imagename,
      Nombre:formValue.Nombre,
      Usuario:this.Usuario.Nombre,
      email:this.Usuario.email,
      userId:this.Usuario.id
    }
    this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
      console.log("imagen subida");
    });
  }else{
    var ext1=this.hospitalm.Foto;
    var exten = ext1.split(".")
    var ext = exten[2];
    console.log(ext)
    this.hospitales={
      Foto:this.hospitalm.Foto,
      Nombre:formValue.Nombre,
      Usuario:this.Usuario.Nombre,
      email:this.Usuario.email,
      userId:this.Usuario.id
    }
    this.service.uploadImages(this.img,`${formValue.Nombre.trim()}Img`+'.'+ext).subscribe(resp =>{
      console.log("imagen subida");
    });
  }
    this.service.putHospitalees(formValue.id,this.hospitales).subscribe(resp =>{
      this.modif=false;
    this.isSubmitted=false
    Swal.close()
    this.activeModal.close(this.myForm.value);
    })
    
  }
}
}
get formControls(){
  return this.myForm['controls'];
}
}