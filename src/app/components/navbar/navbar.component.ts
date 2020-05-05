import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { UsuarioModel } from 'src/app/models/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  private _mobileQueryListener: () => void;
  constructor(public authService:AuthService, public router:Router, private changeDetectorRef: ChangeDetectorRef,private media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  arrayAlumnos:UsuarioModel[]=[];
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
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

}
