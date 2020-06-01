import { Component, Output, EventEmitter, Input,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from "rxjs/operators";
import Swal from 'sweetalert2';
import { Empresa } from 'src/app/models/empresa';
import { EmpresasService } from 'src/app/services/empresas.service';
import { AuthService } from 'src/app/services/auth.service';
import { error } from 'protractor';
import { create } from 'domain';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';


@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal-ap.component.html'
})
export class FormModalAPComponentEditarEmpresa {
  empresa: Empresa;
  myForm: FormGroup;
  isSubmitted:boolean=false;
  arrayTutores:UsuarioModel[]=[];
  arrayUsuarios:UsuarioModel[]=[];
  arrayEmpresas:Empresa[]=[];
  @Input() public id;
  @Input() public modif=false; 
  @Input() public empresam: Empresa;
  constructor(
   public activeModal: NgbActiveModal,
   private formBuilder: FormBuilder,
   private service: EmpresasService,
   public authservice:AuthService,
   public services:ProfesorService
  ) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
this.createForm();
this.getTutores();
console.log(this.modif)
if(this.modif==true){
  this.Nombrem.setValue(this.empresam.Nombre, {
    onlySelf: true
  })
this.Direccionm.setValue(this.empresam.Direccion, {
  onlySelf: true
})
this.Telefonom.setValue(this.empresam.Telefono, {
  onlySelf: true
})
this.Emailm.setValue(this.empresam.Email, {
  onlySelf: true
})
setTimeout(() => {
  this.TutorEmpresam.setValue(this.empresam.TutorEmpresa, {
    onlySelf: true
  
  })

}, 500);

  }
  
}
  private createForm() {
    
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      TutorEmpresa: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      Email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    });
 
  }
  



get formControls(){
  return this.myForm['controls'];
}
submitForm(formValue){
 
  this.isSubmitted=true


  if(this.myForm.valid){
    var empresa={
      Nombre:formValue.Nombre,
      TutorEmpresa:formValue.TutorEmpresa,
      Direccion:formValue.Direccion,
      Telefono:formValue.Telefono,
      Email:formValue.Email

    }
    
    this.arrayEmpresas.push(empresa)
    console.log(this.arrayEmpresas)

    this.service.patchEmpresas(this.id,empresa).subscribe(resp=>{
      Swal.fire({
        title: 'Exito!',
        text: 'Empresa creada',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      this.activeModal.close()
    })
  }else{
    Swal.fire({
      title: 'ERROR',
      text: 'Rellene todos los datos',
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}


cambiarProfesor(e) {
  this.TutorEmpresam.setValue(e.target.value, {
    onlySelf: true
  })
}

get TutorEmpresam() {
  return this.myForm.get('TutorEmpresa');
}

getTutores(){
  this.arrayTutores=[]
  this.services.getUsuarios().subscribe(resp=>{
    this.arrayUsuarios=resp;
    this.arrayUsuarios.forEach(element => {
      if(element.Rol=="tutorempresa"){
        this.arrayTutores.push(element)
      }
    });
  })
    }
    get primEmail(){
      return this.myForm.get('Email')
      }

    get Nombrem() {
      return this.myForm.get('Nombre');
    }
    get Direccionm() {
      return this.myForm.get('Direccion');
    }
    get Telefonom() {
      return this.myForm.get('Telefono');
    }
    get Emailm() {
      return this.myForm.get('Email');
    }
}