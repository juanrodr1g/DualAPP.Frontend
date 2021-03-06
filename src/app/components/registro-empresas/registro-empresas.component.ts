import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CicloService } from 'src/app/services/ciclo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { Empresa } from 'src/app/models/empresa';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-registro-empresas',
  templateUrl: './registro-empresas.component.html',
  styleUrls: ['./registro-empresas.component.css']
})
export class RegistroEmpresasComponent implements OnInit {
  confirmar:boolean=false;cambio=false;
  Imgpreview:any = null;
  filePath
  arrayEmpresas=[];existe:boolean=false
  Imgsrc='/assets/image-placeholder.jpg';
  file;ext;img;nombreIcono;imagename;g:Date=new Date()
  Tutor;
  constructor(public router:Router,public modalService:NgbModal,private formBuilder: FormBuilder,public empresasService:EmpresasService,
    private service: ProfesorService,
    public storage:AngularFireStorage) { }
  myForm: FormGroup;
  arrayUsuarios: UsuarioModel[] = [];
  arrayTutores: UsuarioModel[] = [];
  empresa:Empresa
  isSubmitted:boolean=false;
  id=localStorage.getItem("idEmpresaCreado")
  ngOnInit(): void {
    this.createForm();
  
    this.empresasService.getEmpresaPorId(this.id).subscribe(resp=>{
      this.empresa=resp
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(!this.confirmar){
      this.empresasService.deleteEmpresas(this.id).subscribe()
      this.router.navigateByUrl("/home/empresas/0")
    }
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

  


      
      get primEmail(){
        return this.myForm.get('Email')
        }

      submitForm(formValue){
      
        this.existeEmpresa(formValue.Nombre)
        this.isSubmitted=true

       
setTimeout(() => {
  

        if(this.myForm.valid){
          Swal.fire({
            title: 'Espere',
            text: 'Puede tardar unos segundos...',
            icon: 'info',
            allowOutsideClick: false
          });
          Swal.showLoading();
          if(this.existe){
            Swal.fire({
              title: 'ERROR',
              text: 'Esa empresa ya existe',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }else{
    this.confirmar=true
    if(this.Imgpreview==undefined){
      setTimeout(() => {
        
     
        var empresa={
          Nombre:formValue.Nombre,
          Direccion:formValue.Direccion,
          Telefono:formValue.Telefono,
          Email:formValue.Email,
          fotoEmpresa:this.Imgsrc,
         
        }
        
        Swal.fire({
          title: 'Exito',
          text: 'Empresa creada',
          icon: 'success',
          confirmButtonText: 'OK'
        })

       this.empresasService.patchEmpresas(this.id,empresa).subscribe(resp=>{
         console.log(resp)
         this.router.navigateByUrl("home/empresas/0")
       })

    }, 400);
    }else{
    this.filePath = `${formValue.Nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(this.filePath);
    this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
      fileRef.getDownloadURL().subscribe((url) => {
        var imagename=''
        imagename = url;
        console.log(url) 
      setTimeout(() => {
        var empresa={
          Nombre:formValue.Nombre,
          Direccion:formValue.Direccion,
          Telefono:formValue.Telefono,
          Email:formValue.Email,
          fotoEmpresa:imagename,
         
        }
        
        Swal.fire({
          title: 'Exito',
          text: 'Empresa creada',
          icon: 'success',
          confirmButtonText: 'OK'
        })

       this.empresasService.patchEmpresas(this.id,empresa).subscribe(resp=>{
         console.log(resp)
         this.router.navigateByUrl("home/empresas/0")
       })

    }, 400);
  })})
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
      get formControls(){
        return this.myForm['controls'];
      }

      existeEmpresa(nombre){
        this.existe=false
        this.empresasService.getEmpresas().subscribe(resp=>{
          this.arrayEmpresas=resp
        this.arrayEmpresas.forEach(element=>{
          if(element.Nombre==nombre){
            this.existe=true
          }
        });
        })
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
