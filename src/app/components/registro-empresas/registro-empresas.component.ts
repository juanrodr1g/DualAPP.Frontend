import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CicloService } from 'src/app/services/ciclo.service';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { Empresa } from 'src/app/models/empresa';
import { EmpresasService } from 'src/app/services/empresas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-empresas',
  templateUrl: './registro-empresas.component.html',
  styleUrls: ['./registro-empresas.component.css']
})
export class RegistroEmpresasComponent implements OnInit {
  confirmar:boolean=false
  constructor(public router:Router,public modalService:NgbModal,private formBuilder: FormBuilder,public empresasService:EmpresasService,
    private service: ProfesorService) { }
  myForm: FormGroup;
  arrayUsuarios: UsuarioModel[] = [];
  arrayTutores: UsuarioModel[] = [];
  empresa:Empresa
  isSubmitted:boolean=false;
  id=localStorage.getItem("idEmpresaCreado")
  ngOnInit(): void {
    this.createForm();
    this.getTutores();
    this.empresasService.getEmpresaPorId(this.id).subscribe(resp=>{
      this.empresa=resp
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(!this.confirmar){
      this.empresasService.deleteEmpresas(this.id).subscribe()
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
    this.service.getUsuarios().subscribe(resp=>{
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

      submitForm(formValue){
        
        this.isSubmitted=true

       

        if(this.myForm.valid){
    this.confirmar=true
        var empresa={
          Nombre:formValue.Nombre,
          TutorEmpresa:formValue.TutorEmpresa,
          Direccion:formValue.Direccion,
          Telefono:formValue.Telefono,
          Email:formValue.Email

        }
        
        Swal.fire({
          title: 'Exito',
          text: 'Empresa creada',
          icon: 'success',
          confirmButtonText: 'OK'
        })
       this.empresasService.patchEmpresas(this.id,empresa).subscribe(resp=>{
         this.router.navigateByUrl("profesor/empresas/0")
       })
      }else{
        Swal.fire({
          title: 'Exito',
          text: 'Rellene todos los datos',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
      }
      get formControls(){
        return this.myForm['controls'];
      }
}
