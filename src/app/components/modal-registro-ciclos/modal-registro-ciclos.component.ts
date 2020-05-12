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
  selector: 'app-modal-registro-ciclos',
  templateUrl: './modal-registro-ciclos.component.html',
  styleUrls: ['./modal-registro-ciclos.component.css']
})
export class ModalRegistroCiclosComponent implements OnInit {
  tarea;p;
  issub:boolean=false;tareaEscrita:boolean=false
  id=localStorage.getItem("idCicloCreado")
  arrayModulos:ModuloModel[]=[];
  arrayTareas:TareaModel[]=[]
  myForm: FormGroup;
  isSubmitted:boolean=false;
  constructor( public activeModal: NgbActiveModal,private formBuilder: FormBuilder,public cicloService:CicloService) { }

  ngOnInit(): void {
    this.createForm();
    this.cicloService.getCicloPorId(this.id).subscribe(resp=>{
      this.arrayModulos=resp.Modulos
    })
  }

  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Horas: ['', [Validators.required]],
      tarea:['']
    });
  }
  submitForm(formValue){
    if(this.myForm.valid){
      var modulo={
        Nombre:formValue.Nombre
      }
      this.arrayModulos.push(modulo)
      console.log(this.arrayModulos)
      
      this.arrayModulos.forEach(element => {
        if(element.Nombre==formValue.Nombre){
          element.tareas=this.arrayTareas
          this.arrayTareas=[]
        }
      });
      var ciclo:CicloModel={
        Modulos:this.arrayModulos
      }
      this.cicloService.patchCiclos(this.id,ciclo).subscribe(resp=>{
        this.activeModal.close()
      })
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
