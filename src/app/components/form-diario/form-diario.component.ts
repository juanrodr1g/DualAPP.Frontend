
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
  selector: 'app-form-diario',
  templateUrl: './form-diario.component.html',
  styleUrls: ['./form-diario.component.css']
})
export class FormDiarioComponent implements OnInit {


    usuario: UsuarioModel;
    myForm: FormGroup;
    isSubmitted:boolean=false;
    @Input() public arrayDiario;
    @Input() public id;  
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
        Fecha: ['', [Validators.required]],
        Descripcion: ['', [Validators.required]],
      });
    }
  
  get formControls(){
    return this.myForm['controls'];
  }
  submitForm(formValue)
  {
    
    this.isSubmitted=true
    var array=[]
    array=this.arrayDiario
    array.push(formValue)
      if(this.myForm.valid){
        var alumno={
          Diario:array
        }
this.service.patchUsuarios(this.id,alumno).subscribe(resp=>{
  this.activeModal.close()
})
  }
  }
  }

