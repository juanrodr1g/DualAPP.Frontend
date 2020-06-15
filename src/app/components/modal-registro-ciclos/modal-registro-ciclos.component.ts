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
import Swal from 'sweetalert2';

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
  HorasModulo=0;
  HorasAux=0
  tarea;r
  issub:boolean=false;tareaEscrita:boolean=false
  id=localStorage.getItem("idCicloCreado")
  arrayModulos:ModuloModel[]=[];
  arrayTareas:TareaModel[]=[]
  myForm: FormGroup;
  isSubmitted:boolean=false;
  existe: boolean;
  existe2: boolean;
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
      Horas: 0,
      HorasTarea: [''],
      tarea:['']
    });
  }
  submitForm(formValue){
    this.existeModulo(formValue.Nombre)
    setTimeout(() => {
      
   
    this.isSubmitted=true
    if(this.myForm.valid){
      if(this.myForm.value.Horas==0 || this.myForm.value.Horas==undefined){
   
        Swal.fire({
          title: 'ERROR',
          text: 'Tienes que introducir minimo una tarea',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        
      }else{
        if(this.existe){
          Swal.fire({
            title: 'ERROR',
            text: 'Ese Módulo ya existe',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }else{
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
    }
  }, 200);
  }
anadirTarea(){
  this.existeAF(this.myForm.value.tarea)
  setTimeout(() => {
    

  console.log(this.myForm.value.Horas)
  this.issub=true
  if(this.myForm.value.tarea!=""){
    this.tareaEscrita=true
  }
  if(this.formControls.HorasTarea.errors?.required==undefined && this.tareaEscrita){
    if(this.existe2){
      Swal.fire({
        title: 'ERROR',
        text: 'Esa tarea ya existe',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }else{
  var t={
    Nombre:this.myForm.value.tarea,
    Horas:this.myForm.value.HorasTarea,
    actividades:[],
    EvProfesor:"No evaluado",
    EvTutor:"No evaluado"
  }
  
    this.HorasMax+=t.Horas
    console.log(this.myForm.value.Horas)
    console.log(t.Horas)
    console.log(this.HorasMax)
    if(t.Horas==0){
      Swal.fire({
        title: 'ERROR',
        text: 'No puede haber una actividad formativa con 0 horas',
        icon: 'error',
        confirmButtonText: 'OK'
      });
   
    }else{
      
   
this.arrayTareas.push(t)
this.HorasModulo+=this.myForm.value.HorasTarea
this.myForm.value['Horas'] = this.HorasModulo;
this.horasModm.setValue(this.HorasModulo, {
  onlySelf: true
})
console.log(this.HorasModulo)
console.log(this.arrayTareas)
this.taream.setValue("", {
  onlySelf: true
})
this.horasm.setValue("", {
  onlySelf: true
})
    }
  


this.tareaEscrita=false
this.issub=false
  }
  }else{
  
    Swal.fire({
      title: 'ERROR',
      text: 'Tienes que darle un nombre a la actividad formativa',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}, 200);
}
existeModulo(nombre){
  this.existe=false
this.arrayModulos.forEach(element=>{
  console.log(element)
  if(element.Nombre==nombre){
    this.existe=true
  }
});
}
existeAF(nombre){
  this.existe2=false
this.arrayTareas.forEach(element=>{
  console.log(element)
  if(element.Nombre==nombre){
    this.existe2=true
  }
});
}
get taream() {
  return this.myForm.get('tarea');
}
get horasm() {
  return this.myForm.get('HorasTarea');
}
get horasModm() {
  return this.myForm.get('Horas');
}

  get formControls(){
    return this.myForm['controls'];
  }
}
