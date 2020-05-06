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
      Tareas:[[]],
      tarea:['']
    });
  }
  submitForm(formValue){
    if(this.myForm.valid){
      this.arrayModulos.push(formValue)
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
  var t:TareaModel={
    Nombre:this.myForm.value.tarea,
    actividades:[]
  }
this.arrayTareas.push(t)
console.log(this.arrayTareas)
this.taream.setValue("", {
  onlySelf: true
})
}

get taream() {
  return this.myForm.get('tarea');
}

  get formControls(){
    return this.myForm['controls'];
  }
}
