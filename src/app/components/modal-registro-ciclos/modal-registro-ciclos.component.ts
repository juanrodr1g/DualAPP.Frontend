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
  HorasMax=0;
  @Input() public HorasCiclo;
  @Input() public HorasTotal;
  @Input() public idmodif;
  @Input() public modif;
  HorasAux=0
  tarea;r
  issub:boolean=false;tareaEscrita:boolean=false
  id=localStorage.getItem("idCicloCreado")
  arrayModulos:ModuloModel[]=[];
  arrayTareas:TareaModel[]=[]
  myForm: FormGroup;
  isSubmitted:boolean=false;
  constructor( public activeModal: NgbActiveModal,private formBuilder: FormBuilder,public cicloService:CicloService) { }

  ngOnInit(): void {
    console.log(this.HorasTotal)
    this.HorasAux=this.HorasCiclo-this.HorasTotal
    console.log(this.HorasCiclo)
    this.createForm();
    if(this.modif){
      this.cicloService.getCicloPorId(this.idmodif).subscribe(resp=>{
        this.arrayModulos=resp.Modulos
      })
    }else{
    this.cicloService.getCicloPorId(this.id).subscribe(resp=>{
      this.arrayModulos=resp.Modulos
    })
  }
  }
  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Horas: ['', [Validators.required]],
      HorasTarea: [''],
      tarea:['']
    });
  }
  submitForm(formValue){
    this.isSubmitted=true
    if(this.myForm.valid){
      var modulo={
        Nombre:formValue.Nombre,
        Horas:formValue.Horas
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
      if(this.modif){
        this.cicloService.patchCiclos(this.idmodif,ciclo).subscribe(resp=>{
          this.activeModal.close()
        })
      }else{
      this.cicloService.patchCiclos(this.id,ciclo).subscribe(resp=>{
        this.activeModal.close()
      })
    }
    }
  }
anadirTarea(){
  console.log(this.myForm.value.Horas)
  this.issub=true
  if(this.myForm.value.tarea!=""){
    this.tareaEscrita=true
  }
  if(this.formControls.HorasTarea.errors?.required==undefined && this.tareaEscrita){
  var t={
    Nombre:this.myForm.value.tarea,
    Horas:this.myForm.value.HorasTarea,
    actividades:[],
    EvProfesor:"No evaluado",
    EvTutor:"No evaluado"
  }
  if(this.myForm.value.Horas=="" || this.myForm.value.Horas==undefined){
    alert("Tienes que introducir las horas del módulo primero")
  }else{
    this.HorasMax+=t.Horas
    console.log(this.myForm.value.Horas)
    console.log(t.Horas)
    console.log(this.HorasMax)
  if(t.Horas>this.myForm.value.Horas || this.HorasMax>this.myForm.value.Horas){
    alert("Las horas de las tareas superan a las del módulo")
    this.HorasMax-=t.Horas
  }else{
    if(t.Horas==0){
      alert("No puede haber una tarea con 0 horas")
    }else{
this.arrayTareas.push(t)
console.log(this.arrayTareas)
    }
  }
}
this.taream.setValue("", {
  onlySelf: true
})
this.horasm.setValue("", {
  onlySelf: true
})
this.tareaEscrita=false
this.issub=false
  }else{
    alert("Tienes que darle un nombre a la tarea")
  }
}

get taream() {
  return this.myForm.get('tarea');
}
get horasm() {
  return this.myForm.get('HorasTarea');
}

  get formControls(){
    return this.myForm['controls'];
  }
}
