import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalRegistroCiclosComponent } from '../modal-registro-ciclos/modal-registro-ciclos.component';
import { CicloModel } from 'src/app/models/ciclo';
import { CicloService } from 'src/app/services/ciclo.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { ModalEvaluacionesComponent } from '../modal-evaluaciones/modal-evaluaciones.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-ciclos',
  templateUrl: './registro-ciclos.component.html',
  styleUrls: ['./registro-ciclos.component.css']
})



export class RegistroCiclosComponent implements OnInit {
  file;ext;img;nombreIcono;imagename;g:Date=new Date()
  Imgsrc='/assets/image-placeholder.jpg';
  modif:boolean=false
  arrayEvaluaciones=[["A","B","C","D","F"],["Sobresaliente","Notable","Bien","Insuficiente","Suspenso"],[1,2,3,4,5],[1,2,3,4,5,6,7,8,9,10],[10,20,30,40,50,60,70,80,90,100]]
  p;term;idmodif
  HorasTotal=0;
  myForm: FormGroup;
  arrayUsuarios: UsuarioModel[] = []
  arrayAlumnos: UsuarioModel[] = []
  profesorArray: UsuarioModel[] = [];
ciclo:any;cambio
confirmar:boolean=false
profesor:UsuarioModel;
Imgpreview:any = null;
usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser")) 
 id=localStorage.getItem("idCicloCreado")
arrayModulos;
  constructor(public router:Router,public modalService:NgbModal,private formBuilder: FormBuilder,public cicloService:CicloService,
    private service: ProfesorService,private route: ActivatedRoute) { }
  isSubmitted:boolean=false;

  ngOnInit(): void {
    console.log(this.arrayEvaluaciones[0])
    this.arrayEvaluaciones[0].forEach(element => {
      console.log(element)
    });
this.createForm();
this.getProfesores()
console.log(this.profesorArray)
setTimeout(() => {
  

this.profesorArray.forEach(element => {
  console.log(element)
  console.log(this.usuario.email)
  if(element.email==this.usuario.email){
    console.log(element.TipoEvaluaciones)
    element.TipoEvaluaciones.forEach(element2 => {
      this.arrayEvaluaciones.push(element2)
    });
    
    
    
  }
});
}, 100);
this.route.params.subscribe(params => {
  console.log(params['id'])
  if(params['id']==0){
    console.log("elimina")
    localStorage.setItem("modifCiclo","0")
    this.cicloService.getCicloPorId(this.id).subscribe(resp=>{
      this.ciclo=resp
      this.arrayModulos=this.ciclo.Modulos
    this.arrayModulos.forEach(element => {
      this.HorasTotal+=element.Horas
      this.Horasm.setValue(this.HorasTotal, {
        onlySelf: true
      })
    });
    setTimeout(() => {
      
    
    this.evalm.setValue(this.arrayEvaluaciones[0], {
      onlySelf: true
    })
    this.myForm.value['TipoEvaluaciones'] = this.arrayEvaluaciones[0];
  }, 400);
    })
  }else{
    this.modif=true
    localStorage.setItem("modifCiclo","1")
    console.log("no elimina")
    this.cicloService.getCicloPorId(params['id']).subscribe(resp=>{
      this.idmodif=params['id']
      this.ciclo=resp
      this.arrayModulos=this.ciclo.Modulos
    this.arrayModulos.forEach(element => {
      this.HorasTotal+=element.Horas
      this.Horasm.setValue(this.HorasTotal, {
        onlySelf: true
      })
    });
    this.Nombrem.setValue(this.ciclo.Nombre, {
      onlySelf: true
    })
    this.myForm.value['Nombre'] = this.ciclo.Nombre;
    this.Imgsrc=this.ciclo.fotoCiclo
    setTimeout(() => {
      this.Fotom.setValue(this.ciclo.fotoCiclo, {
        onlySelf: true
      })
      this.Profesorm.setValue(this.ciclo.Profesor, {
        onlySelf: true
      })
      this.myForm.value['Profesor'] = this.ciclo.Profesor;
      console.log(this.ciclo.TipoEvaluacion)
      this.evalm.setValue(this.ciclo.TipoEvaluacion, {
        onlySelf: true
      })
      this.myForm.value['TipoEvaluaciones'] = this.ciclo.TipoEvaluacion;
    }, 300);
    
    })
  }
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

  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Horas: [this.HorasTotal, [Validators.required]],
      Profesor:this.usuario.Nombre+" "+this.usuario.Apellido,
      TipoEvaluaciones: ['', [Validators.required]],
      idProfesor:this.usuario.id,
      fotoCiclo:''
      
    });
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
    return this.myForm.get('fotoCiclo');
  }

  registrarModulo(){
    
    const modalRef = this.modalService.open(ModalRegistroCiclosComponent);
    modalRef.componentInstance.HorasCiclo=this.myForm.value.Horas
    console.log(this.HorasTotal)
    modalRef.componentInstance.HorasTotal=this.HorasTotal
    modalRef.componentInstance.idmodif=this.idmodif
    modalRef.componentInstance.modif=this.modif
    modalRef.result.then((result) => {
      console.log(this.modif)
      if(this.modif){
        console.log("modif")
        this.cicloService.getCicloPorId(this.idmodif).subscribe(resp=>{
          this.ciclo=resp
          this.arrayModulos=this.ciclo.Modulos
          this.HorasTotal=0
          this.arrayModulos.forEach(element => {
            this.HorasTotal+=element.Horas
            this.Horasm.setValue(this.HorasTotal, {
              onlySelf: true
            })
          });
        })
      }else{
      this.cicloService.getCicloPorId(this.id).subscribe(resp=>{
        this.ciclo=resp
        this.arrayModulos=this.ciclo.Modulos
        this.HorasTotal=0
        this.arrayModulos.forEach(element => {
          this.HorasTotal+=element.Horas
          this.Horasm.setValue(this.HorasTotal, {
            onlySelf: true
          })
        });
      })
    }
    });
  
  }

  get Nombrem() {
    return this.myForm.get('Nombre');
  }

  cambiarProfesor(e) {
    this.Profesorm.setValue(e.target.value, {
      onlySelf: true
    })
  }

  cambiarEvaluacion(e) {
    this.evalm.setValue(e.target.value, {
      onlySelf: true
    })
  }

registrarEvaluacion(){
  const modalRef = this.modalService.open(ModalEvaluacionesComponent);
  console.log(this.profesor)
  modalRef.componentInstance.Profesor=this.usuario
}

  get Profesorm() {
    return this.myForm.get('Profesor');
  }
  get evalm() {
    return this.myForm.get('TipoEvaluaciones');
  }
  get Horasm() {
    return this.myForm.get('Horas');
  }

  submitForm(formValue){
    this.isSubmitted=true
    console.log(formValue)
    if(this.myForm.controls['Nombre'].valid && this.myForm.controls['TipoEvaluaciones'].valid){
      if(this.arrayModulos.length==0){
        Swal.fire({
          title: 'ERROR',
          text: 'No puede crear un ciclo sin módulos',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }else{
      Swal.fire({
        title: 'Espere',
        text: 'Puede tardar unos segundos...',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
    this.nombreIcono = `${formValue.Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+this.ext
    if(this.file!=null){
      this.imagename =`https://dualapi.herokuapp.com/api/Containers/local-storage/download/${this.nombreIcono}`;
      }else{
        this.imagename='/assets/image-placeholder.jpg';
      }
      if(this.modif){
        
      if(this.cambio){
        this.confirmar=true
        var ciclo={
          Nombre:formValue.Nombre,
          TipoEvaluacion:formValue.TipoEvaluaciones,
          fotoCiclo:this.imagename
        }
        this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
          console.log("imagen subida 2");
       this.cicloService.patchCiclos(this.idmodif,ciclo).subscribe(resp=>{
        Swal.close()
        Swal.fire({
          title: 'Exito',
          text: 'Ciclo modificado',
          icon: 'success',
          confirmButtonText: 'OK'
        })
         this.router.navigateByUrl("home/ciclo/0")
       })
      })
    }else{
      this.confirmar=true
        var ciclo2={
          Nombre:formValue.Nombre,
          TipoEvaluacion:formValue.TipoEvaluaciones,
        }
       this.cicloService.patchCiclos(this.idmodif,ciclo2).subscribe(resp=>{
         Swal.close()
        Swal.fire({
          title: 'Exito',
          text: 'Ciclo modificado',
          icon: 'success',
          confirmButtonText: 'OK'
        })
         this.router.navigateByUrl("home/ciclo/0")
       })
    }
      }else{
        if(this.myForm.valid){
        this.confirmar=true
        var ciclox={
          Nombre:formValue.Nombre,
          Profesor:formValue.Profesor,
          TipoEvaluacion:formValue.TipoEvaluaciones,
          idProfesor:this.usuario.id,
          fotoProfesor:this.usuario.Foto,
          fotoCiclo:this.imagename
        }
        Swal.fire({
          title: 'Exito',
          text: 'Ciclo creado con exito.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        this.service.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
          console.log("imagen subida 3");
          console.log(ciclox)
       this.cicloService.patchCiclos(this.id,ciclox).subscribe(resp=>{
         this.router.navigateByUrl("home/ciclo/0")
       })
      })
      }
}
    }
  }
  }

borrarModulo(modulo){
  this.arrayModulos = this.arrayModulos.filter(function(dato){
    if(dato.Nombre==modulo.Nombre && dato.Horas==modulo.Horas){
        return false;
    }else{
        return true;
    }
  })
  var ciclo:CicloModel={
    Modulos:this.arrayModulos
  }
  if(this.modif){
    this.cicloService.patchCiclos(this.idmodif,ciclo).subscribe(resp=>{
      this.HorasTotal=0
      if(this.arrayModulos.length==0){
        console.log("escerisimo")
        this.Horasm.setValue(this.HorasTotal, {
          onlySelf: true
        })
      }
      this.arrayModulos.forEach(element => {
        this.HorasTotal+=element.Horas
        this.Horasm.setValue(this.HorasTotal, {
          onlySelf: true
        })
      });
    })
  }else{
  this.cicloService.patchCiclos(this.id,ciclo).subscribe(resp=>{
    this.HorasTotal=0
    if(this.arrayModulos.length==0){
      this.Horasm.setValue(this.HorasTotal, {
        onlySelf: true
      })
    }
    this.arrayModulos.forEach(element => {
      this.HorasTotal+=element.Horas
      this.Horasm.setValue(this.HorasTotal, {
        onlySelf: true
      })
    });
  })
}
}

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  console.log(this.modif)
  if(!this.confirmar && !this.modif && localStorage.getItem("modifCiclo")=="0"){
    this.cicloService.deleteCiclos(this.id).subscribe()
    this.router.navigateByUrl("/home/ciclo/0")
  }
  console.log(this.arrayModulos.length)
  if(this.arrayModulos.length==0){
    this.cicloService.deleteCiclos(this.id).subscribe()
    this.router.navigateByUrl("/home/ciclo/0")
  }
}

  get formControls(){
    return this.myForm['controls'];
  }

}
