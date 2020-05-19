import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalRegistroCiclosComponent } from '../modal-registro-ciclos/modal-registro-ciclos.component';
import { CicloModel } from 'src/app/models/ciclo';
import { CicloService } from 'src/app/services/ciclo.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-registro-ciclos',
  templateUrl: './registro-ciclos.component.html',
  styleUrls: ['./registro-ciclos.component.css']
})



export class RegistroCiclosComponent implements OnInit {
  p;term
  myForm: FormGroup;
  arrayUsuarios: UsuarioModel[] = []
  profesorArray: UsuarioModel[] = [];
ciclo:CicloModel
confirmar:boolean=false
 id=localStorage.getItem("idCicloCreado")
arrayModulos;
  constructor(public router:Router,public modalService:NgbModal,private formBuilder: FormBuilder,public cicloService:CicloService,
    private service: ProfesorService) { }
  isSubmitted:boolean=false;

  ngOnInit(): void {
this.createForm();
this.getProfesores()
this.cicloService.getCicloPorId(this.id).subscribe(resp=>{
  this.ciclo=resp
  this.arrayModulos=this.ciclo.Modulos
})
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
      Profesor: ['', [Validators.required]],
      Horas: ['', [Validators.required]]
    });
  }

  registrarModulo(){
    const modalRef = this.modalService.open(ModalRegistroCiclosComponent, {size: 'lg'});
    modalRef.componentInstance.Horas=this.myForm.value.Horas
    modalRef.result.then((result) => {
      this.cicloService.getCicloPorId(this.id).subscribe(resp=>{
        this.ciclo=resp
        this.arrayModulos=this.ciclo.Modulos
      })
    });
  }

  cambiarProfesor(e) {
    this.Profesorm.setValue(e.target.value, {
      onlySelf: true
    })
  }

  get Profesorm() {
    return this.myForm.get('Profesor');
  }

  submitForm(formValue){
    this.isSubmitted=true
    if(this.myForm.valid){
this.confirmar=true
    var ciclo={
      Nombre:formValue.Nombre,
      Profesor:formValue.Profesor
    }
   this.cicloService.patchCiclos(this.id,ciclo).subscribe(resp=>{
     this.router.navigateByUrl("profesor/ciclo/0")
   })
  }
  }

ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  if(!this.confirmar){
    this.cicloService.deleteCiclos(this.id).subscribe()
  }
}

  get formControls(){
    return this.myForm['controls'];
  }

}
