import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators,ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { AuthService } from 'src/app/services/auth.service';
import { CicloService } from 'src/app/services/ciclo.service';
import { error, Ptor } from 'protractor';
import { create } from 'domain';


@Component({
  selector: 'app-modal-evaluaciones',
  templateUrl: './modal-evaluaciones.component.html',
  styleUrls: ['./modal-evaluaciones.component.css']
})
export class ModalEvaluacionesComponent implements OnInit {
  extras=0
  arrayUsuarios: UsuarioModel[] = []
  profesorArray=[]
  usuario: UsuarioModel;
  myForm: FormGroup;
  isSubmitted:boolean=false;
  @Input() public Profesor;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private service: ProfesorService,
   public authservice:AuthService,
   public cicloservice:CicloService
  ) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
this.createForm()
this.getProfesores()
setTimeout(() => {
  this.getProfesor()
}, 400);

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
      getProfesor(){
        this.profesorArray.forEach(element => {
          console.log(element)
          console.log(this.Profesor.email)
          if(element.email==this.Profesor.email){
            this.Profesor=element    
          }
        });
      }

  private createForm() {

    this.myForm = this.formBuilder.group({
      ev1: ['', [Validators.required]],
      ev2: ['', [Validators.required]],
      ev3: ['', [Validators.required]],
      ev4: ['', [Validators.required]],
      ev5: ['', [Validators.required]],
      ev6: [''],
      ev7: [''],
      ev8: [''],
      ev9: [''],
      ev10: ['']
    });
  }

get formControls(){
  return this.myForm['controls'];
}
submitForm(formValue)
{

  console.log(this.Profesor)
  this.isSubmitted=true
    if(this.myForm.valid){
      var arr=[]
      
      arr.push(formValue.ev1)
      console.log(formValue.ev1)
      
      arr.push(formValue.ev2)
      arr.push(formValue.ev3)
      arr.push(formValue.ev4)
      arr.push(formValue.ev5)
      console.log(arr)
      console.log(this.Profesor.TipoEvaluaciones)
      var p=[]
      p=this.Profesor.TipoEvaluaciones
      p.push(arr)
var user={
  TipoEvaluaciones:p
}
console.log(user)
this.service.patchUsuarios(this.Profesor.id,user).subscribe(resp=>{
  this.activeModal.close()
})
}
}

anadirOpcion(){
  this.extras+=1
}

}