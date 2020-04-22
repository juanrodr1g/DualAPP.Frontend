import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { AuthComponent } from './components/auth/auth.component';
import {AuthGuard} from './components/guards/auth.guard'
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilusuariosComponent } from './components/perfilusuarios/perfilusuarios.component';

const routes: Routes = [
  { path: 'profesor/:id', component: ProfesoresComponent, canActivate:[AuthGuard]  },
  { path: 'alumno', component: ProfesoresComponent, canActivate:[AuthGuard]  },
  { path: 'tutorempresa', component: ProfesoresComponent, canActivate:[AuthGuard]  },
  { path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]  },
  { path: 'perfilusuarios', component: PerfilusuariosComponent, canActivate:[AuthGuard]  },
  { path: 'login', component: AuthComponent },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
