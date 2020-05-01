import { Component, OnInit } from '@angular/core';
import { ProfesorService } from 'src/app/services/profesor.service';
import { UsuarioModel } from 'src/app/models/usuario';
import { CicloModel } from 'src/app/models/ciclo';
import { CicloService } from 'src/app/services/ciclo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModuloModel } from 'src/app/models/modulo';



@Component({
  selector: 'app-ciclos',
  templateUrl: './ciclos.component.html',
  styleUrls: ['./ciclos.component.css']
})
export class CiclosComponent implements OnInit {
ciclosArray:CicloModel[]=[]
modulosArray:ModuloModel[]=[]
detalles:boolean=false
  constructor(public cicloservice:CicloService, public router:Router,public route:ActivatedRoute) { }

    ngOnInit(): void {
      
    this.cicloservice.getCiclos().subscribe(resp=>{
      this.ciclosArray=resp
      this.route.params.subscribe(params => {
        console.log(params['id'])
        if(params['id']!='0'){
          this.detalles=true
          console.log("entropp")
        }
        this.ciclosArray.forEach(element => {
          if(element.id==params['id']){
            console.log(element.Modulos)
            element.Modulos.forEach(element => {
              console.log(element)
              this.modulosArray.push(element)

            });
          }
        });
      })
    })
  }

  verModulos(ciclo:CicloModel){
    this.router.navigate(["profesor/ciclo/",ciclo.id])
  }

}
