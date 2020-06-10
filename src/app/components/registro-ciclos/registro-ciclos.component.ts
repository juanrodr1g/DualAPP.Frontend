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
import { exists } from 'fs';
import { AngularFireStorage } from '@angular/fire/storage';
import { TipoEvaluacionesModel } from 'src/app/models/tipo-evaluaciones';
@Component({
  selector: 'app-registro-ciclos',
  templateUrl: './registro-ciclos.component.html',
  styleUrls: ['./registro-ciclos.component.css']
})



export class RegistroCiclosComponent implements OnInit {
  cicloanterior;
  filePath
  file;ext;img;nombreIcono;imagename;g:Date=new Date()
  Imgsrc='/assets/image-placeholder.jpg';
  modif:boolean=false
  arrayEvaluaciones=[["A","B","C","D","F"],["Sobresaliente","Notable","Bien","Insuficiente","Suspenso"],[1,2,3,4,5],[1,2,3,4,5,6,7,8,9,10],[10,20,30,40,50,60,70,80,90,100]]
  p;term;idmodif
  HorasTotal=0;existe:boolean=true
  myForm: FormGroup;
  arrayUsuarios: UsuarioModel[] = []
  arrayAlumnos: UsuarioModel[] = []
  arrayCiclos=[]
  profesorArray: UsuarioModel[] = [];
ciclo:any;cambio
confirmar:boolean=false
profesor:UsuarioModel;
Imgpreview:any = null;
usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser")) 
 id=localStorage.getItem("idCicloCreado")
arrayModulos;
  constructor(public router:Router,public modalService:NgbModal,private formBuilder: FormBuilder,public cicloService:CicloService,
    private service: ProfesorService,private route: ActivatedRoute,
    public storage:AngularFireStorage) { }
  isSubmitted:boolean=false;

  ngOnInit(): void {
this.createForm();
this.getProfesores()
this.getAlumnos()
setTimeout(() => {
  

this.service.getTipoEvaluaciones().subscribe(resp=>{
  var array:TipoEvaluacionesModel[]=resp
  array.forEach(element => {
    this.arrayEvaluaciones.push(element.evaluacion)
  });
})
}, 600);
this.route.params.subscribe(params => {
  if(params['id']==0){
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
    console.log(this.myForm.value['TipoEvaluaciones'])
  }, 400);
    })
  }else{
    this.modif=true
    localStorage.setItem("modifCiclo","1")
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
      this.evalm.setValue(this.ciclo.TipoEvaluacion, {
        onlySelf: true
      })
      this.myForm.value['TipoEvaluaciones'] = this.ciclo.TipoEvaluacion;
      
    }, 300);
    
    })
  }
})
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
    modalRef.componentInstance.HorasTotal=this.HorasTotal
    modalRef.componentInstance.idmodif=this.idmodif
    modalRef.componentInstance.modif=this.modif
    modalRef.result.then((result) => {
      if(this.modif){
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

  modalRef.componentInstance.Profesor=this.usuario
  modalRef.result.then((result) => {
    this.service.getTipoEvaluaciones().subscribe(resp=>{
      var tipoev:TipoEvaluacionesModel[]=[]
      tipoev=resp
      console.log(resp)
      for (let index = 0; index < tipoev.length; index++) {
        const element = tipoev[index];
        if(index==tipoev.length-1){
          this.arrayEvaluaciones.push(element.evaluacion)
        }
      }
      
    })

  })
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
    this.existeCiclo(formValue.Nombre)
    if(this.existe){
      Swal.fire({
        title: 'ERROR',
        text: 'Ya existe un ciclo con ese nombre',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      this.existe=false
    }else{
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
      if(this.modif){
        
        this.cicloService.getCicloPorId(this.ciclo.id).subscribe(resp=>{
          this.cicloanterior=resp
        })
        setTimeout(() => {
          
        
      if(this.cambio){
        this.filePath = `${formValue.Nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(this.filePath);
        this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
          fileRef.getDownloadURL().subscribe((url) => {
            var imagename=''
            imagename = url;
            console.log(url) 
        this.confirmar=true
        var ciclo={
          Nombre:formValue.Nombre,
          TipoEvaluacion:formValue.TipoEvaluaciones,
          fotoCiclo:imagename
        }
       this.cicloService.patchCiclos(this.idmodif,ciclo).subscribe(resp=>{
         this.arreglarRelacion(resp)
         setTimeout(() => {
        Swal.close()
        Swal.fire({
          title: 'Exito',
          text: 'Ciclo modificado',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        
          
         this.router.navigateByUrl("home/ciclo/0")
        }, 400);
       })
    })})
    }else{
      this.confirmar=true
        var ciclo2={
          Nombre:formValue.Nombre,
          TipoEvaluacion:formValue.TipoEvaluaciones,
        }
       this.cicloService.patchCiclos(this.idmodif,ciclo2).subscribe(resp=>{
        this.arreglarRelacion(resp)
        setTimeout(() => {
         Swal.close()
        Swal.fire({
          title: 'Exito',
          text: 'Ciclo modificado',
          icon: 'success',
          confirmButtonText: 'OK'
        })
        
          
        
         this.router.navigateByUrl("home/ciclo/0")
        }, 400);
       })
    }
  }, 200);
      }else{
        if(this.myForm.valid){
          this.filePath = `${formValue.Nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          const fileRef = this.storage.ref(this.filePath);
          this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
            fileRef.getDownloadURL().subscribe((url) => {
              var imagename=''
              imagename = url;
              console.log(url) 
        this.confirmar=true
        var ciclox={
          Nombre:formValue.Nombre,
          Profesor:formValue.Profesor,
          TipoEvaluacion:formValue.TipoEvaluaciones,
          idProfesor:this.usuario.id,
          fotoProfesor:this.usuario.Foto,
          fotoCiclo:imagename
        }
        Swal.fire({
          title: 'Exito',
          text: 'Ciclo creado con exito.',
          icon: 'success',
          confirmButtonText: 'OK'
        })
       this.cicloService.patchCiclos(this.id,ciclox).subscribe(resp=>{
         this.router.navigateByUrl("home/ciclo/0")
       })
    })})
      }
}
    }
  }
}
  }

existeCiclo(nombre){
  this.existe=false
this.cicloService.getCiclos().subscribe(resp=>{
  this.arrayCiclos=resp
this.arrayCiclos.forEach(element=>{
  if(element.Nombre==nombre && this.ciclo.Nombre!=nombre){
    this.existe=true
  }
});
})
}

arreglarRelacion(cicloModificado){
  this.arrayAlumnos.forEach(element => {
    if(element.PlantillaCiclo.Nombre==this.ciclo.Nombre){
      console.log("entra")
  var modulos=[]
  var modFinal=[]
  var i=0
  modulos=cicloModificado.Modulos
  modulos.forEach(element2 => {
  
    var BreakException = {};
    try{
      element.PlantillaCiclo.Modulos.forEach(element3 => {
        i=0
      if(element2.Nombre==element3.Nombre){
        
  element2={
    Nombre:element3.Nombre,
    Horas:element3.Horas,
    tareas:element3.tareas
  }
  if(modFinal.find(elmnt=>elmnt.Nombre===element3.Nombre)){

  }else{
    i=i+1

  
  modFinal.push(element2);
  i=1
   throw BreakException
  }
      }
    });
    if(i==0){
      modFinal.push(element2);
    }
  } catch (e) {
    if (e !== BreakException) throw e;
  }
  i=0
  });
     var alumno={
        CicloFormativo:cicloModificado.Nombre,
        PlantillaCiclo:{
          Nombre:cicloModificado.Nombre,
          Horas:cicloModificado.Horas,
          Modulos:modFinal,
          Profesor:cicloModificado.Profesor,
          TipoEvaluacion:element.PlantillaCiclo.TipoEvaluacion,
          id:element.PlantillaCiclo.id
        }
      }
      
      this.service.patchUsuarios(element.id,alumno).subscribe(resp=>{
      })
      
    }
  });
  
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
  if(!this.confirmar && !this.modif && localStorage.getItem("modifCiclo")=="0"){
    this.cicloService.deleteCiclos(this.id).subscribe()
    this.router.navigateByUrl("/home/ciclo/0")
  }
  if(this.arrayModulos.length==0){
    this.cicloService.deleteCiclos(this.id).subscribe()
    this.router.navigateByUrl("/home/ciclo/0")
  }
}

  get formControls(){
    return this.myForm['controls'];
  }

}
