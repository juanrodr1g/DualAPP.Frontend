import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {Output, EventEmitter, Input,} from '@angular/core';
import {FormControl,} from '@angular/forms';


@Component({
  selector: 'app-modal-registro-ciclos',
  templateUrl: './modal-registro-ciclos.component.html',
  styleUrls: ['./modal-registro-ciclos.component.css']
})
export class ModalRegistroCiclosComponent implements OnInit {
  myForm: FormGroup;
  isSubmitted:boolean=false;
  constructor( public activeModal: NgbActiveModal,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Horas: ['', [Validators.required]],
    });
  }
  submitForm(formValue){
   
  }

  get formControls(){
    return this.myForm['controls'];
  }
}
