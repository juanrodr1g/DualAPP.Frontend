import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponentEditarEmpresa } from '../form-modal-editarempresa/form-modal-ap.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  term;
  eleccionCuentas;
empresasArray:Empresa[]=[]
detalles:boolean=false
tareas:boolean=false
  constructor(public empresaservice:EmpresasService, public router:Router,public route:ActivatedRoute,public modalService:NgbModal) { }

    ngOnInit(): void {
     console.log( this.getEmpresas());
      console.log('wat?');
    this.empresaservice.getEmpresas().subscribe(resp=>{
      this.empresasArray=resp
      this.route.params.subscribe(params => {
        console.log(params['id'])
        if(params['id']!='0'){
          this.detalles=true
          console.log("entropp")
         
        }

      })
    })
   
  }



  getEmpresas(){
    this.empresasArray=[]
    this.empresaservice.getEmpresas().subscribe(resp=>{
      this.empresasArray=resp;
    console.log(this.empresasArray)
    })
 
      }

  editarEmpresa(empresa:Empresa){
    const modalRef = this.modalService.open(FormModalAPComponentEditarEmpresa);
    modalRef.componentInstance.id = empresa.id;
    modalRef.componentInstance.modif = true;
    modalRef.componentInstance.empresam=empresa;
    console.log(empresa.id)
    modalRef.result.then((result) => {
      this.getEmpresas();
    });
    console.log(empresa)
  } 

borrarEmpresa(empresa){
  Swal.fire({
    title: 'Exito',
    text: 'Empresa eliminada',
    icon: 'success',
    confirmButtonText: 'OK'
  })
  this.empresaservice.deleteEmpresas(empresa.id).subscribe(resp=>{
    this.empresaservice.getEmpresas().subscribe(resp=>{
      this.empresasArray=resp
      this.route.params.subscribe(params => {
        console.log(params['id'])
        if(params['id']!='0'){
          this.detalles=true
          console.log("entropp")
         
       


        }

      })
    })
   
  })
}

  crearEmpresa(){
    var empresa:Empresa={
Nombre:"",

    }
    this.empresaservice.postEmpresas(empresa).subscribe(resp=>{
      var aux
      aux=resp
      localStorage.setItem("idEmpresaCreado",aux.id)
      this.router.navigateByUrl("/registroempresas/0")
    })
  }

 


  verEmpresa(empresa){

  }
}
