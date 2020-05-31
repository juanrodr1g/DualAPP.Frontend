import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { AuthService } from 'src/app/services/auth.service';
import { CicloService } from 'src/app/services/ciclo.service';
import { error } from 'protractor';
import { create } from 'domain';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentCambioContraseña {
  usuario: UsuarioModel;
  myForm: FormGroup;
  isSubmitted:boolean=false;
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
  
  this.isSubmitted=true
    if(this.myForm.valid){
   this.service.changePassword(formValue.Antigua,formValue.Nueva).subscribe(resp=>{
    alert("Contraseña cambiada con éxito")
    this.activeModal.close()
   },error=>{
     alert("Contraseña anterior incorrecta")
   })
}
}
}