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
      Antigua: ['', [Validators.required]],
      Nueva: ['', [Validators.required]],
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
    Swal.fire({
      title: 'Exito',
      text: 'Cuenta creada',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.activeModal.close()
   },error=>{
    Swal.fire({
      title: 'ERROR',
      text: 'Contraseña anterior incorrecta',
      icon: 'error',
      confirmButtonText: 'OK'
    });
   })
}
}
}