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


@Component({
  selector: 'app-form-modal-detalles',
  templateUrl: './form-modal-detalles.component.html',
  styleUrls: ['./form-modal-detalles.component.css']
})
export class FormModalDetallesComponent implements OnInit {
  g:any= new Date()
  usuario:UsuarioModel=JSON.parse(localStorage.getItem("currentUser"))
  comentario;ext;file;img;nombreIcono;
  p;Coment:boolean;q;
  @Input() public id;
  @Input() public modulo;
  @Input() public detalles;
  @Input() public PlantillaCiclo;
  @Input() public Tarea;
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
  constructor( public activeModal: NgbActiveModal,private formBuilder: FormBuilder,public cicloService:CicloService,public services:ProfesorService,public router: Router) { }

  ngOnInit(): void {
    this.createForm2()
    this.createForm();
    console.log(this.id)
    this.getActividades();
    var k=[]
    k=this.PlantillaCiclo.TipoEvaluacion.split(",")
    for (const i of k) {
      this.arrayEvaluaciones.push(i)
    }
    
  }

getActividades(){
  this.PlantillaCiclo.Modulos.forEach(element => {
  if(this.modulo.Nombre==element.Nombre){
    element.tareas.forEach(element2 => {
      if(element2.Nombre==this.Tarea.Nombre){
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
            console.log(alumno)
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
      Autoevaluacion: ['A', [Validators.required]]
    });
  }

  private createForm2() {
  
    this.myForm = this.formBuilder.group({
      EvProfesor: '',
      EvTutor: ''
    });
  }

  submitForm(formValue){
    console.log("odiosmio")
    console.log(this.detalles)
if(this.detalles){

}else{


  

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
          alert("Las horas de la actividad no pueden superar a las del módulo")
        }else{
          Swal.fire({
            title: 'Espere',
            text: 'Subiendo actividad...',
            icon: 'info',
            allowOutsideClick: false
          });
          Swal.showLoading();
        element2.HorasRealizadas+=formValue.Horas
        this.nombreIcono=`${formValue.Nombre.trim()}Img`+this.g.getDate()+this.g.getMonth()+this.g.getMinutes()+this.g.getSeconds()+this.g.getMilliseconds()+'.'+this.ext
        this.services.uploadImages(this.img,this.nombreIcono).subscribe(resp =>{
          console.log("imagen subida");
          
        
        formValue['Adjunto'] = `https://dualapi.herokuapp.com/api/Containers/local-storage/download/${this.nombreIcono}`;
        element2.actividades.push(formValue)
        console.log(element2)
        console.log(this.PlantillaCiclo)
        var alumno:UsuarioModel={
          PlantillaCiclo:this.PlantillaCiclo
        }
        console.log(alumno)
        this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
          Swal.close()
          this.activeModal.close(this.myForm.value);
        })
      });
    }
      }
      
    });
    
  }
});

}
  }

verAdjunto(n){
  console.log(n.Adjunto)
  window.open(n.Adjunto, '_blank');
  
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
  this.PlantillaCiclo.Modulos.forEach(element => {
    if(this.modulo.Nombre==element.Nombre){
      element.tareas.forEach(element2 => {
        if(element2.Nombre==this.Tarea.Nombre){
element2.actividades.forEach(element3 => {
  element2.actividades = element2.actividades.filter(function(dato){
    if(dato.Nombre==actividad.Nombre && dato.Fecha==actividad.Fecha && dato.Horas==actividad.Horas && dato.Adjunto==actividad.Adjunto){
      element2.HorasRealizadas-=dato.Horas  
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
get horasm() {
  return this.myForm.get('Horas');
}

  get formControls(){
    return this.myForm['controls'];
  }
}
