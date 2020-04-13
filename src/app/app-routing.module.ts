import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { AuthComponent } from './components/auth/auth.component';


const routes: Routes = [
  { path: 'profesores', component: ProfesoresComponent },
  { path: 'login', component: AuthComponent },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
