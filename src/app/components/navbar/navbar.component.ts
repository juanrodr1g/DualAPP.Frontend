import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logeado:boolean=false
  currentuser;
  usuario:UsuarioModel= JSON.parse(localStorage.getItem("currentUser"));
  localstorage = JSON.parse(localStorage.getItem("currentUser"));
  mobileQuery: MediaQueryList;
  alumnoData:boolean=false
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;

  constructor(public services:ProfesorService,public authService:AuthService, public router:Router, private changeDetectorRef: ChangeDetectorRef,private media: MediaMatcher,private route: ActivatedRoute) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      if(localStorage.getItem("currentUser")){
        this.logeado=true
        console.log(this.logeado)
      }
      if(localStorage.getItem("deslogueado")=="1"){
        location.reload()
        localStorage.setItem("deslogueado","0")
      }
      this.getUsuario()
    });
  }
  arrayUsuarios:UsuarioModel[]=[];
  arrayAlumnos:UsuarioModel[]=[];
  shouldRun =true;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  getUsuario(){
    this.services.getUsuarioPorId(this.usuario.id).subscribe(resp=>{
      this.usuario=resp
      var p:any=resp
      Object.defineProperty(p,"id",{value:this.usuario.id})
      console.log(p)
      localStorage.setItem("currentUser",JSON.stringify(p))
    })
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      console.log(params['id'])
  
    })
    setTimeout(() => {
      this.getAlumnos()
    }, 200);
    console.log(this.usuario)
  }
 
  logOut(){
    this.authService.logoutUser().subscribe()
    localStorage.setItem("deslogueado","1")
    localStorage.setItem("alumnoData","0")
    this.localstorage.setItem("currentUser","0")
    this.router.navigateByUrl("/login")

  }
  eleccionCuentasP(){
    localStorage.setItem("eleccionCuentas","profesor")
   localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("home/alumno/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }
  eleccionCuentasA(){
    localStorage.setItem("eleccionCuentas","alumno")
    localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("home/alumno/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }
  eleccionCuentasT(){
    localStorage.setItem("eleccionCuentas","tutorempresa")
    localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("home/alumno/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }

  verCiclos(){
    localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("home/ciclo/0")
    
    setTimeout(() => {
      location.reload()
    }, 200);
  }

  verEmpresas(){
    localStorage.setItem("alumnoData","0")
    this.router.navigateByUrl("home/empresas/0")
    
    setTimeout(() => {
      location.reload()
    }, 200);
  }

  verMicuadernillo(){
    localStorage.setItem("alumnoData","1")
    this.router.navigate( ['/home/alumno/',this.usuario.id] );
    
    setTimeout(() => {
      location.reload()
    }, 200);
  }

  miPerfil(){
    localStorage.setItem("alumnoData","0")
    localStorage.setItem("eleccionCuentas","ninguno")
    this.router.navigateByUrl("home/perfil/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }

verAlumno(alumno:UsuarioModel){
    localStorage.setItem("eleccionCuentas","ninguno")
    localStorage.setItem("alumnoData","1")
    this.router.navigate( ['/home/alumno/',alumno.id] );
  }

  getAlumnos(){
    this.arrayAlumnos=[]
this.services.getUsuarios().subscribe(resp=>{
  this.arrayUsuarios=resp;
  this.arrayUsuarios.forEach(element => {
    if(this.usuario.Rol == "tutorempresa"){

    
    if(element.Rol=="alumno" && element.Colaborador==this.usuario.Nombre+" "+this.usuario.Apellido){
      this.arrayAlumnos.push(element)
    }
  }else{
    if(element.Rol=="alumno"){
      this.arrayAlumnos.push(element)
    }
  }
  });
})
  }
}
