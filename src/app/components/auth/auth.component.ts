import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators,FormGroup, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../../services/auth.service'
import {UsuarioModel} from '../../models/usuario'
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  myForm:FormGroup;
  constructor(public authService:AuthService, public router:Router, public formBuilder: FormBuilder) {
this.createForm();
   }

  ngOnInit() {

    console.log("Pantalla Login")
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
          this.router.navigate(['/profesor/alumno',0]);
          }
          if(data.user.Rol=="alumno"){
            alert("Login alumno")
            }
            if(data.user.Rol=="tutorempresa"){
              this.router.navigate(['/profesor/alumno',0])
              }
        },(error)=>alert("Email o contraseña incorrecto."));
    }



}
