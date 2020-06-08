import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../../services/auth.service'
import {UsuarioModel} from '../../models/usuario'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
usuario=JSON.parse(localStorage.getItem("currentUser"))
  myForm:FormGroup;
  constructor(public authService:AuthService, public router:Router, public formBuilder: FormBuilder) {
this.createForm();
   }

  ngOnInit() {
    if(this.usuario.Rol=="profesor"){
      this.router.navigate(['/home/ciclo',0]);
      localStorage.setItem("logeado","1")
      }
      if(this.usuario.Rol=="alumno"){
        localStorage.setItem("logeado","1")
        }
        if(this.usuario.Rol=="tutorempresa"){
          this.router.navigate(['/home/alumno',0])
          localStorage.setItem("logeado","1")
          }
localStorage.setItem("logeado","0")
if(localStorage.getItem("deslogueado")=="1"){
  localStorage.setItem("deslogueado","0")
  location.reload()
}
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  private createForm() {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  
  onLogin(form) {
      console.log("entra");
      return this.authService
        .loginuser(form.email,form.password)
        .subscribe(
        data => {
          console.log(data)
          this.authService.setUser(data.user);
          const token = data.id;
          this.authService.setId(data.user.id)
          this.authService.setToken(token);
          console.log(data.user.Rol)
          if(data.user.Rol=="profesor"){
          this.router.navigate(['/home/ciclo',0]);
          localStorage.setItem("logeado","1")
          }
          if(data.user.Rol=="alumno"){
            this.router.navigate(['/home/alumno/',data.user.id])
            localStorage.setItem("logeado","1")
            }
            if(data.user.Rol=="tutorempresa"){
              this.router.navigate(['/home/empresas',0])
              localStorage.setItem("logeado","1")
              }
        },(error)=>
        
        Swal.fire({
          title: 'ERROR',
          text: 'Email o contraseña incorrecta, intentelo de nuevo.',
          icon: 'error',
          confirmButtonText: 'OK'
        })
        
        );
    }



}
