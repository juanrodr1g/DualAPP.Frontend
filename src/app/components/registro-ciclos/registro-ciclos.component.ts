import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalRegistroCiclosComponent } from '../modal-registro-ciclos/modal-registro-ciclos.component';


export interface Modulos {
  nombre: string;
  horas: number;

}

const ELEMENT_DATA: Modulos[] = [
  {nombre: 'Hydrogen', horas: 1.0079},
  {nombre: 'Helium', horas: 4.0026 },
];


@Component({
  selector: 'app-registro-ciclos',
  templateUrl: './registro-ciclos.component.html',
  styleUrls: ['./registro-ciclos.component.css']
})



export class RegistroCiclosComponent implements OnInit {
  myForm: FormGroup;

 

  displayedColumns: string[] = ['nombre', 'horas'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(public router:Router,public modalService:NgbModal,private formBuilder: FormBuilder) { }
  isSubmitted:boolean=false;

  ngOnInit(): void {
this.createForm();
  }

  private createForm() {
  
    this.myForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
    });
  }

  registrarModulo(){
    const modalRef = this.modalService.open(ModalRegistroCiclosComponent);
    modalRef.result.then((result) => {
      
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  submitForm(formValue){
   
  }

  get formControls(){
    return this.myForm['controls'];
  }

}
