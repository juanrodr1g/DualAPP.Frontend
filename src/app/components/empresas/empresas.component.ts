import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { EmpresasService } from 'src/app/services/empresas.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(public empresaservice:EmpresasService, public router:Router,public route:ActivatedRoute) { }

    ngOnInit(): void {
     
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



borrarEmpresa(empresa){
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
      localStorage.setItem("idEmpresaCreada",aux.id)
      this.router.navigateByUrl("/registroempresas")
    })
  }


  verEmpresa(empresa){

  }
}
