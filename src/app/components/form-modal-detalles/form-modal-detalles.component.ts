import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Output, EventEmitter, Input,} from '@angular/core';
import {FormControl,} from '@angular/forms';
import { CicloService } from 'src/app/services/ciclo.service';
import { CicloModel } from 'src/app/models/ciclo';
import { ModuloModel } from 'src/app/models/modulo';
import { TareaModel } from 'src/app/models/tarea';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { getLocaleDateFormat } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-form-modal-detalles',
  templateUrl: './form-modal-detalles.component.html',
  styleUrls: ['./form-modal-detalles.component.css']
})
export class FormModalDetallesComponent implements OnInit {
  g:any= new Date()
  filePath;Imgpreview
  usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser"))
  comentario;ext;file;img;nombreIcono;
  p;Coment:boolean;q;
  @Input() public id;
  @Input() public modulo;
  @Input() public detalles;
  @Input() public PlantillaCiclo;
  @Input() public Tarea;
  reload:boolean=false;
  HorasRealizadas=0;
  arrayComentarios=[];
  arrayActividades;
  issub:boolean=false;tareaEscrita:boolean=false
  arrayEvaluaciones=[]
  idc=localStorage.getItem("idCicloCreado")
  arrayModulos:ModuloModel[]=[];
  arrayTareas:TareaModel[]=[]
  myForm: FormGroup;  myForm2: FormGroup;
  isSubmitted:boolean=false;
  EvProfesor;EvTutor
  existe:boolean=false
  Imgsrc
  modif: boolean;
  tareaeditar: any;
  constructor( public activeModal: NgbActiveModal,private formBuilder: FormBuilder,public cicloService:CicloService,public services:ProfesorService,public router: Router,
    public storage:AngularFireStorage) { }

  ngOnInit(): void {
    this.createForm2()
    this.createForm();
    setTimeout(() => {
      if(this.usuario.Rol=="profesor"){
        (<HTMLInputElement> document.getElementById("evtut")).disabled = true;
      }
      if(this.usuario.Rol=="tutorempresa"){
        (<HTMLInputElement> document.getElementById("evprof")).disabled = true;
      }
      if(this.usuario.Rol=="alumno"){
        (<HTMLInputElement> document.getElementById("evprof")).disabled = true;
        (<HTMLInputElement> document.getElementById("evtut")).disabled = true;
      }
    }, 400);
    
    console.log(this.id)
    this.getActividades();
    var k=[]
    console.log(this.PlantillaCiclo.TipoEvaluacion)
    if(Array.isArray(this.PlantillaCiclo.TipoEvaluacion)){
      this.PlantillaCiclo.TipoEvaluacion.forEach(element => {
        this.arrayEvaluaciones.push(element)
      });
      
    }else{
    k=this.PlantillaCiclo.TipoEvaluacion.split(",")
    for (const i of k) {
      this.arrayEvaluaciones.push(i)
    }
  }
   
    
  }

getActividades(){
  this.PlantillaCiclo.Modulos.forEach(element => {
  if(this.modulo.Nombre==element.Nombre){
    element.tareas.forEach(element2 => {
      if(element2.Nombre==this.Tarea.Nombre){
        setTimeout(() => {
          this.evt.setValue(element2.EvTutor, {
            onlySelf: true
          })
          this.evp.setValue(element2.EvProfesor, {
            onlySelf: true
          })
        }, 400);
        
        if(element2.Comentarios==undefined){

        }else{
        element2.Comentarios.forEach(element3 => {
          this.arrayComentarios.push(element3)
        });
      }
        this.arrayActividades=element2.actividades
      }
    
      });
    }
});

}

borrarComentario(coment){
console.log(coment)

this.PlantillaCiclo.Modulos.forEach(element => {
  if(this.modulo.Nombre==element.Nombre){
    element.tareas.forEach(element2 => {
      if(element2.Nombre==this.Tarea.Nombre){
        element2.Comentarios.forEach(element3 => {
          if(element3.usuario==coment.usuario){
            if(element3.comentario==coment.comentario){
              
              element2.Comentarios = element2.Comentarios.filter(function(dato){
                if(dato.comentario==coment.comentario && dato.usuario==coment.usuario){
                    return false;
                }else{
                    return true;
                }
            });
            console.log(element2.Comentarios)
            var alumno:UsuarioModel={
              PlantillaCiclo:this.PlantillaCiclo
            }
            this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
              this.arrayComentarios=element2.Comentarios
            })
            }
          }
          
        });
      }
    
      });
    }
});
}


cambiarEvaluacion(e) {
  console.log(e.target.value)

}

  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Horas: ['', [Validators.required]],
      Fecha: ['', [Validators.required]],
      Adjunto: ['', [Validators.required]],
      Autoevaluacion: ['No realizada', [Validators.required]]
    });
  }
cambioAutoevaluacion(evento,tarea){
  this.reload = true;
  console.log(evento.target.value)
  this.PlantillaCiclo.Modulos.forEach(element => {
    if(this.modulo.Nombre==element.Nombre){
      element.tareas.forEach(element2 => {
        if(element2.Nombre==this.Tarea.Nombre){
element2.actividades.forEach(element3 => {
  if(element3.Nombre==tarea.Nombre && element3.Fecha==tarea.Fecha){
    if(element3.Autoevaluacion=="No realizada"){
    element2.HorasRealizadas+=element3.Horas
    }
    element3.Autoevaluacion=evento.target.value
  }

            var alumno:UsuarioModel={
              PlantillaCiclo:this.PlantillaCiclo
            }
            console.log(alumno)
            this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
              this.arrayActividades=element2.actividades
              
            })
});
        }
      
        });
        
      }
  });
}

anadirAdjunto(tarea){
  Swal.fire({
    title: 'Espere',
    text: 'Subiendo adjunto...',
    icon: 'info',
    allowOutsideClick: false
  });
  Swal.showLoading();
  this.filePath = `${tarea.Nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
  const fileRef = this.storage.ref(this.filePath);
  this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
    fileRef.getDownloadURL().subscribe((url) => {
      var imagename=''
      imagename = url;
  this.PlantillaCiclo.Modulos.forEach(element => {
    console.log("entraaaaaaa")
    if(this.modulo.Nombre==element.Nombre){
      element.tareas.forEach(element2 => {
        if(element2.Nombre==this.Tarea.Nombre){
element2.actividades.forEach(element3 => {
  if(element3.Nombre==tarea.Nombre && element3.Fecha==tarea.Fecha){
    console.log(imagename)
    element3.Adjunto=imagename
  console.log(element3)

            var alumno:UsuarioModel={
              PlantillaCiclo:this.PlantillaCiclo
            }
            console.log(alumno)
            this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
              Swal.close()
              
              this.arrayActividades=element2.actividades
              console.log(resp)
              //this.activeModal.close()
            })
          }
});
        }
      
        });
        
      }
  });
})})
}
  private createForm2() {
  
    this.myForm2 = this.formBuilder.group({
      EvProfesor: '',
      EvTutor: ''
    });
  }

  submitForm(formValue){
    console.log("odiosmio")
    console.log(this.detalles)
if(this.detalles){

}else{


  if(formValue.Horas <= 0){
    Swal.fire({
      title: 'Error',
      text: 'No se puede crear una tarea con 0 o menos horas.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }else{

 
if(!this.modif){
 
  this.PlantillaCiclo.Modulos.forEach(element => {
    console.log(this.modulo.Nombre)
    console.log(element.Nombre)
  if(this.modulo.Nombre==element.Nombre){
    console.log("jode")
    element.tareas.forEach(element2 => {
      console.log(element2)
      console.log(this.Tarea)
      if(element2.Nombre==this.Tarea.Nombre){
        console.log("poaentraoloco")
        if(element2.HorasRealizadas==undefined || element2.HorasRealizadas==null){
          element2.HorasRealizadas=0
        }
        var h = element2.HorasRealizadas+formValue.Horas
        if(element2.Horas<formValue.Horas || h>element2.Horas){
          Swal.fire({
            title: 'Error',
            text: 'Las hora de la actividad no pueden superar a las del modulo.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }else{
          Swal.fire({
            title: 'Espere',
            text: 'Subiendo actividad...',
            icon: 'info',
            allowOutsideClick: false
          });
          Swal.showLoading();
        if(this.Imgpreview==undefined){
          element2.actividades.push(formValue)
          console.log(element2)
          console.log(this.PlantillaCiclo)
          var alumno:UsuarioModel={
            PlantillaCiclo:this.PlantillaCiclo
          }
          console.log(alumno)
          this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
            Swal.close()
            this.activeModal.close();
          })
        }else{
        this.filePath = `${formValue.Nombre}/${this.Imgpreview.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        
        const fileRef = this.storage.ref(this.filePath);
        this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
          fileRef.getDownloadURL().subscribe((url) => {
            var imagename=''
            imagename = url;
            console.log(url) 
          
        
        formValue['Adjunto'] = imagename;
        element2.actividades.push(formValue)
          console.log(element2)
          console.log(this.PlantillaCiclo)
          var alumno:UsuarioModel={
            PlantillaCiclo:this.PlantillaCiclo
          }
          console.log(alumno)
          this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
            Swal.close()
            this.activeModal.close();
          })
      })})
    }
      }
    }
    });
    
  }
});
}else{
  this.PlantillaCiclo.Modulos.forEach(element => {
    if(this.modulo.Nombre==element.Nombre){
      element.tareas.forEach(element2 => {
        if(element2.Nombre==this.Tarea.Nombre){
  element2.actividades.forEach(element3 => {
    if(element3.Nombre==this.tareaeditar.Nombre && element3.Fecha==this.tareaeditar.Fecha){
element3.Nombre=formValue.Nombre
element3.Horas=formValue.Horas
element3.Fecha=formValue.Fecha
console.log(element3)
var alumno={
  PlantillaCiclo:this.PlantillaCiclo
}
console.log(alumno)
this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
  this.activeModal.close()
})
    }
  });
}
});
}
  });

}}
}
  }

verAdjunto(n){
  console.log(n.Adjunto)
  window.open(n.Adjunto, '_blank');
  
}
cambiaPreview(event:any,tarea){
  if(event.target.files && event.target.files[0]){
    const reader = new FileReader;
    reader.onload = (e:any) => {
      this.Imgsrc=e.target.result
    }
    reader.readAsDataURL(event.target.files[0])
    this.Imgpreview=event.target.files[0]
    this.anadirAdjunto(tarea)
  }else{
    this.Imgsrc='/assets/image-placeholder.jpg'
    this.Imgpreview=null;
  }
}

aplicarEvaluacion(formValue){
  this.reload = true;
  this.PlantillaCiclo.Modulos.forEach(element => {
    console.log(this.modulo.Nombre)
    console.log(element.Nombre)
  if(this.modulo.Nombre==element.Nombre){
    console.log("jode")
    element.tareas.forEach(element2 => {
      console.log(element2)
      console.log(this.Tarea)
      if(element2.Nombre==this.Tarea.Nombre){
        if(this.usuario.Rol=="profesor"){
        element2.EvProfesor=formValue.EvProfesor
        }
        if(this.usuario.Rol=="tutorempresa"){
        element2.EvTutor=formValue.EvTutor
        }
        var alumno={
          PlantillaCiclo:this.PlantillaCiclo
        }
        this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
          Swal.close()
          this.activeModal.close()
        })
      }
    })
  }
})
}

  handleFileSelect(evt){
    var files = evt.target.files;
    this.file = files[0];
    this.ext=this.file.name;
    this.ext = this.ext.slice((this.ext.lastIndexOf(".") - 1 >>> 0) + 2);
  if (files && this.file) {
      var reader = new FileReader();
  
      reader.onload =this._handleReaderLoaded.bind(this);
  
      reader.readAsBinaryString(this.file);
  }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.img= btoa(binaryString);
           console.log(btoa(binaryString));
   }

borrarActividad(actividad){
  this.reload = true;
  this.PlantillaCiclo.Modulos.forEach(element => {
    if(this.modulo.Nombre==element.Nombre){
      element.tareas.forEach(element2 => {
        if(element2.Nombre==this.Tarea.Nombre){
element2.actividades.forEach(element3 => {
  element2.actividades = element2.actividades.filter(function(dato){
    if(dato.Nombre==actividad.Nombre && dato.Fecha==actividad.Fecha && dato.Horas==actividad.Horas && dato.Adjunto==actividad.Adjunto){
      if(dato.Autoevaluacion == 'No realizada'){

      }else{
        element2.HorasRealizadas-=dato.Horas 
      }
       
      return false;
    }else{
        return true;
    }
});

            var alumno:UsuarioModel={
              PlantillaCiclo:this.PlantillaCiclo
            }
            console.log(alumno)
            this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
              this.arrayActividades=element2.actividades
              
            })
});
        }
      
        });
        
      }
  });
}

editarTarea(tarea){
  this.modif=true
  this.reload = true;
  this.PlantillaCiclo.Modulos.forEach(element => {
    if(this.modulo.Nombre==element.Nombre){
      element.tareas.forEach(element2 => {
        if(element2.Nombre==this.Tarea.Nombre){
  element2.actividades.forEach(element3 => {
    if(element3.Nombre==tarea.Nombre && element3.Fecha==tarea.Fecha){
      this.myForm.value['Nombre']=element3.Nombre
      this.myForm.value['Horas']=element3.Horas
      this.myForm.value['Fecha']=element3.Fecha
      this.horasm.setValue(element3.Horas, {
        onlySelf: true
      })
      this.Fecham.setValue(element3.Fecha, {
        onlySelf: true
      })
      this.Nombrem.setValue(element3.Nombre, {
        onlySelf: true
      })
      this.tareaeditar=tarea
      setTimeout(() => {
        this.detalles=false
      }, 200);
    }
  });
}
});
}
  });

}

  subirComentarios(){
    this.PlantillaCiclo.Modulos.forEach(element => {
      console.log(this.modulo.Nombre)
      console.log(element.Nombre)
    if(this.modulo.Nombre==element.Nombre){
      console.log("jode")
      element.tareas.forEach(element2 => {
        console.log(element2)
        console.log(this.Tarea)
        if(element2.Nombre==this.Tarea.Nombre){
          console.log("poaentraoloco")
          if(this.usuario.Rol=="tutorempresa"){
            var part=this.usuario.Rol.split("e")
            var comen={
              comentario:this.comentario,
              usuario:this.usuario.Nombre+" "+this.usuario.Apellido+"("+part[0]+" e"+part[1]+"esa)",
              foto:this.usuario.Foto
            }
          }else{
          var comen={
            comentario:this.comentario,
            usuario:this.usuario.Nombre+" "+this.usuario.Apellido+"("+this.usuario.Rol+")",
            foto:this.usuario.Foto
          }
        }
        console.log(comen)
          this.arrayComentarios.push(comen)
          element2.Comentarios=this.arrayComentarios
          var alumno:UsuarioModel={
            PlantillaCiclo:this.PlantillaCiclo
          }
          console.log(alumno)
          this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
            this.comentario=""
          })
        }
      });
    }
  });
  }

get taream() {
  return this.myForm.get('tarea');
}

get evp() {
  return this.myForm2.get('EvProfesor');
}
get evt() {
  return this.myForm2.get('EvTutor');
}
get horasm() {
  return this.myForm.get('Horas');
}
get Fecham() {
  return this.myForm.get('Fecha');
}

get Nombrem() {
  return this.myForm.get('Nombre');
}

  get formControls(){
    return this.myForm['controls'];
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.detalles && this.reload){
    location.reload()
    }

    }

   
}
