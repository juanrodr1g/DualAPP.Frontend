import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfilusuarios',
  templateUrl: './perfilusuarios.component.html',
  styleUrls: ['./perfilusuarios.component.css']
})
export class PerfilusuariosComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  localstorage = JSON.parse(localStorage.getItem("currentUser"));





  constructor() { }

  ngOnInit(): void {
    console.log(this.localstorage.email)
  }

  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }





}
