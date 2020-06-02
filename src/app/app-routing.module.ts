import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { AuthComponent } from './components/auth/auth.component';
import {AuthGuard} from './components/guards/auth.guard'
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PerfilusuariosComponent } from './components/perfilusuarios/perfilusuarios.component';
import { RegistroCiclosComponent } from './components/registro-ciclos/registro-ciclos.component';
import { CiclosComponent } from './components/ciclos/ciclos.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { RegistroEmpresasComponent } from './components/registro-empresas/registro-empresas.component';

const routes: Routes = [
  { path: 'home/:lugar/:id', component: ProfesoresComponent, canActivate:[AuthGuard]  },
  { path: 'alumno', component: ProfesoresComponent, canActivate:[AuthGuard]  },
  { path: 'tutorempresa', component: ProfesoresComponent, canActivate:[AuthGuard]  },
  { path: 'empresas', component: EmpresasComponent, canActivate:[AuthGuard]  },
  { path: 'usuarios', component: UsuariosComponent, canActivate:[AuthGuard]  },
  { path: 'perfilusuarios', component: PerfilusuariosComponent, canActivate:[AuthGuard]  },
  { path: 'registrociclos/:id', component: RegistroCiclosComponent, canActivate:[AuthGuard]  },
  { path: 'registroempresas/:id', component: RegistroEmpresasComponent, canActivate:[AuthGuard]  },
  { path: 'ciclos', component: CiclosComponent, canActivate:[AuthGuard]  },
  { path: 'login', component: AuthComponent },
  { path: '**', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
