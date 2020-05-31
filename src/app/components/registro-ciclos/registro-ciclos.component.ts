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

@Component({
  selector: 'app-registro-ciclos',
  templateUrl: './registro-ciclos.component.html',
  styleUrls: ['./registro-ciclos.component.css']
})



export class RegistroCiclosComponent implements OnInit {
  modif:boolean=false
  arrayEvaluaciones=[["A","B","C","D","F"],["Sobresaliente","Notable","Bien","Insuficiente","Suspenso"],[1,2,3,4,5],[1,2,3,4,5,6,7,8,9,10],[10,20,30,40,50,60,70,80,90,100]]
  p;term;idmodif
  HorasTotal=0;
  myForm: FormGroup;
  arrayUsuarios: UsuarioModel[] = []
  profesorArray: UsuarioModel[] = [];
ciclo:CicloModel
confirmar:boolean=false
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
this.route.params.subscribe(params => {
  console.log(params['id'])
  if(params['id']==0){
    this.cicloService.getCicloPorId(this.id).subscribe(resp=>{
      this.ciclo=resp
      this.arrayModulos=this.ciclo.Modulos
    this.arrayModulos.forEach(element => {
      this.HorasTotal+=element.Horas
      this.Horasm.setValue(this.HorasTotal, {
        onlySelf: true
      })
    });
    })
  }else{
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
    setTimeout(() => {
      this.Profesorm.setValue(this.ciclo.Profesor, {
        onlySelf: true
      })
      this.myForm.value['Profesor'] = this.ciclo.Profesor;
    }, 400);
    this.modif=true
    })
  }
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
      Horas: [this.HorasTotal, [Validators.required]]
    });
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

registrarEvaluacion(){
  
}

  get Profesorm() {
    return this.myForm.get('Profesor');
  }
  get Horasm() {
    return this.myForm.get('Horas');
  }

  submitForm(formValue){
    this.isSubmitted=true
    console.log(formValue)
    
      if(this.modif){
        this.confirmar=true
        var ciclo={
          Nombre:formValue.Nombre,
          Profesor:formValue.Profesor
        }
       this.cicloService.patchCiclos(this.idmodif,ciclo).subscribe(resp=>{
         this.router.navigateByUrl("profesor/ciclo/0")
       })
      }else{
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
  if(!this.confirmar && !this.modif){
    this.cicloService.deleteCiclos(this.id).subscribe()
  }
}

  get formControls(){
    return this.myForm['controls'];
  }

}
