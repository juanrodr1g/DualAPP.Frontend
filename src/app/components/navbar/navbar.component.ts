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
    localStorage.setItem("eleccionCuentas","profesores")
    location.reload()
  }
  eleccionCuentasA(){
    localStorage.setItem("eleccionCuentas","alumnos")
    location.reload()
  }
  eleccionCuentasT(){
    localStorage.setItem("eleccionCuentas","tutoresEmpresa")
    location.reload()
  }

  miPerfil(){
    this.router.navigateByUrl("/perfilusuarios")
  }

}
