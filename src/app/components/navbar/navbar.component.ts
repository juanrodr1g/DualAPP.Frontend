import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
  }
  arrayUsuarios:UsuarioModel[]=[];
  arrayAlumnos:UsuarioModel[]=[];
  shouldRun =true;
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {

    this.route.params.subscribe(params => {
      console.log(params['id'])
  
    })
    setTimeout(() => {
      this.getAlumnos()
    }, 200);
  }
 
  logOut(){
    this.authService.logoutUser().subscribe()
    this.router.navigateByUrl("/login")
  }
  eleccionCuentasP(){
    localStorage.setItem("eleccionCuentas","profesor")
    this.router.navigateByUrl("profesor/alumno/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }
  eleccionCuentasA(){
    localStorage.setItem("eleccionCuentas","alumno")
    this.router.navigateByUrl("profesor/alumno/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }
  eleccionCuentasT(){
    localStorage.setItem("eleccionCuentas","tutorempresa")
    this.router.navigateByUrl("profesor/alumno/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }

  verCiclos(){
    this.router.navigateByUrl("profesor/ciclo/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }

  miPerfil(){
    localStorage.setItem("eleccionCuentas","ninguno")
    this.router.navigateByUrl("profesor/perfil/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }

verAlumno(alumno:UsuarioModel){
    this.router.navigate( ['/profesor/alumno/',alumno.id] );
    localStorage.setItem("eleccionCuentas","ninguno")
    this.alumnoData=true
  }

  getAlumnos(){
    this.arrayAlumnos=[]
this.services.getUsuarios().subscribe(resp=>{
  this.arrayUsuarios=resp;
  this.arrayUsuarios.forEach(element => {
    if(element.Rol=="alumno"){
      this.arrayAlumnos.push(element)
    }
  });
})
  }
}
