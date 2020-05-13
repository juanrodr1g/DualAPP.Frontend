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

@Component({
  selector: 'app-form-modal-detalles',
  templateUrl: './form-modal-detalles.component.html',
  styleUrls: ['./form-modal-detalles.component.css']
})
export class FormModalDetallesComponent implements OnInit {
  @Input() public id;
  @Input() public modulo;
  @Input() public detalles;
  @Input() public PlantillaCiclo;
  @Input() public Tarea;
  arrayActividades;
  issub:boolean=false;tareaEscrita:boolean=false
  idc=localStorage.getItem("idCicloCreado")
  arrayModulos:ModuloModel[]=[];
  arrayTareas:TareaModel[]=[]
  myForm: FormGroup;
  isSubmitted:boolean=false;
  constructor( public activeModal: NgbActiveModal,private formBuilder: FormBuilder,public cicloService:CicloService,public services:ProfesorService) { }

  ngOnInit(): void {
    this.createForm();
    this.getActividades();
  }

getActividades(){
  this.PlantillaCiclo.Modulos.forEach(element => {
  if(this.modulo.Nombre==element.Nombre){
    element.tareas.forEach(element2 => {
      if(element2.Nombre==this.Tarea.Nombre){
        this.arrayActividades=element2.actividades
      }
    
      });
    }
});

}


  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Horas: ['', [Validators.required]],
      Fecha: ['', [Validators.required]],
      Adjunto: ['', [Validators.required]],
      Autoevaluacion: ['', [Validators.required]]
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
        element2.actividades.push(formValue)
        console.log(element2)
        console.log(this.PlantillaCiclo)
        var alumno:UsuarioModel={
          PlantillaCiclo:this.PlantillaCiclo
        }
        console.log(alumno)
        this.services.patchUsuarios(this.id,alumno).subscribe(resp=>{
          this.activeModal.close(this.myForm.value);
        })
      }
    });
  }
});



}
  }
anadirTarea(){
  this.issub=true
  if(this.myForm.value.tarea!=""){
    this.tareaEscrita=true
  }
  if(this.formControls.Horas.errors?.required==undefined && this.tareaEscrita){
  var t:TareaModel={
    Nombre:this.myForm.value.tarea,
    Horas:this.myForm.value.Horas,
    actividades:[]
  }
this.arrayTareas.push(t)
console.log(this.arrayTareas)
this.taream.setValue("", {
  onlySelf: true
})
this.horasm.setValue("", {
  onlySelf: true
})
this.tareaEscrita=false
this.issub=false
  }else{
    console.log(this.formControls)
  }
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
