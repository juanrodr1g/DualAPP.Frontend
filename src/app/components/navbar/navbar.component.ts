import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService:AuthService, public router:Router) { }

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
    this.router.navigateByUrl("profesor/0")
    setTimeout(() => {
      location.reload()
    }, 200);
  }

}
