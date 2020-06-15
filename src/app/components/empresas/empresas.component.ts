import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponentEditarEmpresa } from '../form-modal-editarempresa/form-modal-ap.component';
import Swal from 'sweetalert2';
import { UsuarioModel } from 'src/app/models/usuario';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  term;
  eleccionCuentas;
empresasArray:Empresa[]=[]
empresasArray2:Empresa[]=[]
detalles:boolean=false
tareas:boolean=false
usuario:UsuarioModel= JSON.parse(localStorage.getItem("currentUser"));
  constructor(public empresaservice:EmpresasService, public router:Router,public route:ActivatedRoute,public modalService:NgbModal) { }

    ngOnInit(): void {
    
     
    this.empresaservice.getEmpresas().subscribe(resp=>{
      this.getEmpresas();
      this.route.params.subscribe(params => {
      
        if(params['id']!='0'){
          this.detalles=true
         
         
        }

      })
    })
   
  }



  getEmpresas(){
    this.empresasArray=[]
   
    this.empresaservice.getEmpresas().subscribe(resp=>{
      this.empresasArray2=resp;
      this.empresasArray2.forEach(element => {
        if(this.usuario.Rol == "tutorempresa"){
    
        
        if(element.TutorEmpresa == this.usuario.Nombre+" "+this.usuario.Apellido){
     
          this.empresasArray.push(element)
        }
      }else{
        if(this.usuario.Rol=="profesor"){
          this.empresasArray.push(element)
      
        }
      }
      });
    })
 
      }

  editarEmpresa(empresa:Empresa){
    const modalRef = this.modalService.open(FormModalAPComponentEditarEmpresa);
    modalRef.componentInstance.id = empresa.id;
    modalRef.componentInstance.modif = true;
    modalRef.componentInstance.empresam=empresa;

    modalRef.result.then((result) => {
      this.getEmpresas();
    });
 
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
      
        if(params['id']!='0'){
          this.detalles=true
        
         
       


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
