import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthComponent } from './components/auth/auth.component';
import { ProfesoresComponent } from './components/profesores/profesores.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { PerfilusuariosComponent } from './components/perfilusuarios/perfilusuarios.component';
import {DatosAlumnoComponent } from './components/datos-alumno/datos-alumno.component';
import {MatDividerModule} from '@angular/material/divider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormModalAPComponentUsuario } from 'src/app/components/form-modal-Cuentas/form-modal-ap.component';
import { CiclosComponent } from './components/ciclos/ciclos.component';
import { RegistroCiclosComponent } from './components/registro-ciclos/registro-ciclos.component';
import { ModalRegistroCiclosComponent } from './components/modal-registro-ciclos/modal-registro-ciclos.component';
import { MatTableModule } from '@angular/material/table' 
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormModalDetallesComponent } from './components/form-modal-detalles/form-modal-detalles.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { FormModalAPComponentCambioContraseña } from './components/form-modal-Cambiocontraseña/form-modal-ap.component';
import { RegistroEmpresasComponent } from './components/registro-empresas/registro-empresas.component';







@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProfesoresComponent,
    FormModalAPComponentUsuario,
    NavbarComponent,
    PerfilusuariosComponent,
    DatosAlumnoComponent,
    CiclosComponent,
    RegistroCiclosComponent,
    ModalRegistroCiclosComponent,
    FormModalDetallesComponent,
    FormModalAPComponentCambioContraseña,
    EmpresasComponent,
    RegistroEmpresasComponent,

  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatDividerModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatTableModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    NgbModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [],
  entryComponents: [
    FormModalAPComponentUsuario,
    ModalRegistroCiclosComponent,
    FormModalDetallesComponent,
    FormModalAPComponentCambioContraseña
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
