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

@Component({
  selector: 'app-registro-empresas',
  templateUrl: './registro-empresas.component.html',
  styleUrls: ['./registro-empresas.component.css']
})
export class RegistroEmpresasComponent implements OnInit {
  confirmar:boolean=false;cambio=false;
  Imgpreview:any = null;
  Imgsrc='/assets/image-placeholder.jpg';
  file;ext;img;nombreIcono;imagename;g:Date=new Date()
  Tutor;
  constructor(public router:Router,public modalService:NgbModal,private formBuilder: FormBuilder,public empresasService:EmpresasService,
    private service: ProfesorService) { }
  myForm: FormGroup;
  arrayUsuarios: UsuarioModel[] = [];
  arrayTutores: UsuarioModel[] = [];
  empresa:Empresa
  isSubmitted:boolean=false;
  id=localStorage.getItem("idEmpresaCreado")
  ngOnInit(): void {
    this.createForm();
    this.getTutores();
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

getTutor(){
  console.log(this.arrayTutores)

  console.log(this.myForm.value.TutorEmpresa)
  this.arrayTutores.forEach(element => {
    if(element.Nombre+" "+element.Apellido==this.myForm.value.TutorEmpresa){
      this.Tutor=element
      console.log(this.Tutor)
    }
  });
  console.log(this.Tutor)
}

  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      TutorEmpresa: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      Email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      fotoEmpresa:''
    });
  }

  cambiarProfesor(e) {
    this.TutorEmpresam.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get TutorEmpresam() {
    return this.myForm.get('TutorEmpresa');
  }

  getTutores(){
    this.arrayTutores=[]
    this.service.getUsuarios().subscribe(resp=>{
      this.arrayUsuarios=resp;
      setTimeout(() => {
        this.arrayUsuarios.forEach(element => {
          if(element.Rol=="tutorempresa"){
            this.arrayTutores.push(element)
            this.myForm.value['TutorEmpresa'] = this.arrayTutores[0];
            this.TutorEmpresam.setValue(this.arrayTutores[0].Nombre+" "+this.arrayTutores[0].Apellido, {
              onlySelf: true
            })
          }
        });
      }, 400);
      
    })
      }
      
      get primEmail(){
        return this.myForm.get('Email')
        }

      submitForm(formValue){
        this.getTutor()
        this.isSubmitted=true

       

        if(this.myForm.valid){
    this.confirmar=true
    this.nombreIcono = `${formValue.Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+this.ext
    if(this.file!=null){
      this.imagename =`https://dualapi.herokuapp.com/api/Containers/local-storage/download/${this.nombreIcono}`;
      }else{
        this.imagename='/assets/image-placeholder.jpg';
      }
      setTimeout(() => {
        
        console.log(this.Tutor)
        var empresa={
          Nombre:formValue.Nombre,
          TutorEmpresa:formValue.TutorEmpresa,
          Direccion:formValue.Direccion,
          Telefono:formValue.Telefono,
          Email:formValue.Email,
          fotoEmpresa:this.imagename,
          fotoTutor:this.Tutor.Foto
        }
        
        Swal.fire({
          title: 'Exito',
          text: 'Empresa creada',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
          console.log("imagen subida 3");
       this.empresasService.patchEmpresas(this.id,empresa).subscribe(resp=>{
         console.log(resp)
         this.router.navigateByUrl("home/empresas/0")
       })
      })
    }, 400);
      }else{
        Swal.fire({
          title: 'ERROR',
          text: 'Rellene todos los datos',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
      }
      get formControls(){
        return this.myForm['controls'];
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
        return this.myForm.get('fotoEmpresa');
      }
      
}
