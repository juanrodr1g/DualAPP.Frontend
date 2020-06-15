import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario';
import { ProfesorService } from 'src/app/services/profesor.service';
import { FormModalDetallesComponent } from '../form-modal-detalles/form-modal-detalles.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormDiarioComponent } from '../form-diario/form-diario.component';
import { Observable, Observer } from 'rxjs';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as html2canvas from 'html2canvas';


@Component({
  selector: 'app-datos-alumno',
  templateUrl: './datos-alumno.component.html',
  styleUrls: ['./datos-alumno.component.css']
})
export class DatosAlumnoComponent implements OnInit {
Plantillaciclo:any
arrayDiario
alumno:UsuarioModel
arrayUsuarios:UsuarioModel[]=[];
arrayAlumnos:UsuarioModel[]=[];
arrayTareasyModulos=[]
usuario:UsuarioModel= JSON.parse(localStorage.getItem("currentUser"));
base64Image: any;
arrayActividades=[];
base64Img;
  constructor(private route: ActivatedRoute,public services:ProfesorService,public modalService:NgbModal) {  
    this.getAlumnos();
    
   
  
  
  }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.services.getUsuarioPorId(params['id']).subscribe(resp=>{
        this.alumno=resp
        
    if(this.alumno.PlantillaCiclo == undefined){

    }else{
    this.getArrayTareasyModulos()
  }
  
        if(resp.Diario==undefined){
          this.arrayDiario=[]
        }else{
        this.arrayDiario=resp.Diario
        }
      
        if(this.alumno.PlantillaCiclo == undefined){

        }else{

       this.arrayActividades = [];
        this.alumno.PlantillaCiclo.Modulos.forEach(element => {
        
          element.tareas.forEach(element2 => {
            element2.actividades.forEach(element3 => {
              var tarea={
                Fecha:element3.Fecha,
                Nombre:element3.Nombre,
                Modulo:element.Nombre,
                Horas:element3.Horas,
                Adjunto:element3.Adjunto,
                Autoevaluacion:element3.Autoevaluacion
              }
              this.arrayActividades.push(tarea)
             
            });
          });
        })};
      })
    })
  }
  
borrarDiario(diario){
    this.arrayDiario = this.arrayDiario.filter(function(dato){
      if(dato.Descripcion==diario.Descripcion && dato.Fecha==diario.Fecha){
        return false;
      }else{
          return true;
      }
  });
  
var alumno={
  Diario:this.arrayDiario
}
this.services.patchUsuarios(this.usuario.id,alumno).subscribe()
}

getAlumnos(){
  this.services.getUsuarios().subscribe(resp=>{
    this.arrayUsuarios=resp;
    this.arrayUsuarios.forEach(element => {
      var fecha,fecha2;
      if(element.Rol=="alumno"){
        /*fecha=element.FechaCreacion.split("T")
        fecha2=fecha[0].split("-")
        element.FechaCreacion=fecha2[2]+"-"+fecha2[1]+"-"+fecha2[0]
        console.log(element.FechaCreacion)*/
        this.arrayAlumnos.push(element)
      }
    });
  })
  
  }
  getArrayTareasyModulos(){
    Swal.fire({
      title: 'Espere',
      text: 'Puede tardar unos segundos...',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    this.route.params.subscribe(params => {
      this.arrayTareasyModulos=[]
      this.getAlumnos()
      setTimeout(() => {
        this.arrayAlumnos.forEach(element => {
          if(element.id==params['id']){
            this.alumno=element
            this.Plantillaciclo={}
            this.Plantillaciclo=this.alumno.PlantillaCiclo
          
            this.arrayTareasyModulos=[]
  for (let index1 = 0; index1 < this.alumno.PlantillaCiclo.Modulos.length; index1++) {
    for (let index2 = 0; index2 < this.alumno.PlantillaCiclo.Modulos[index1].tareas.length; index2++) {
      var modulo={
        Nombre:this.alumno.PlantillaCiclo.Modulos[index1].Nombre,
        tarea:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].Nombre,
        Horas:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].Horas,
        HorasRealizadas:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].HorasRealizadas,
        EvProfesor:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].EvProfesor,
        EvTutor:this.alumno.PlantillaCiclo.Modulos[index1].tareas[index2].EvTutor
      }      
      if(modulo.HorasRealizadas==undefined){
        modulo.HorasRealizadas=0
      }
      this.arrayTareasyModulos.push(modulo)
    }
    
  }
          }

        });
        Swal.close()
      }, 500);

    });
  }


abrirModal(modulo,lugar:boolean){
  this.Plantillaciclo.Modulos.forEach(element2 => {
    element2.tareas.forEach(element3 => {
      if(modulo.tarea==element3.Nombre){
    if(lugar){
      const modalRef = this.modalService.open(FormModalDetallesComponent,{size:"lg"});
    modalRef.componentInstance.PlantillaCiclo = this.Plantillaciclo;
    modalRef.componentInstance.Tarea = element3;
    modalRef.componentInstance.modulo = modulo;
    modalRef.componentInstance.id = this.alumno.id;
      modalRef.componentInstance.detalles = true;
      modalRef.result.then((result) => {
this.getArrayTareasyModulos()
      });
    }else{
      const modalRef = this.modalService.open(FormModalDetallesComponent);
    modalRef.componentInstance.PlantillaCiclo = this.Plantillaciclo;
    modalRef.componentInstance.Tarea = element3;
    modalRef.componentInstance.modulo = modulo;
    modalRef.componentInstance.id = this.alumno.id;
      modalRef.componentInstance.detalles = false;
      modalRef.result.then((result) => {
        this.getArrayTareasyModulos()
              });
    }
      }
    });
  });


}

crearDiario(){
  const modalRef = this.modalService.open(FormDiarioComponent);
  modalRef.componentInstance.arrayDiario = this.arrayDiario;
  modalRef.componentInstance.id = this.alumno.id;

    modalRef.componentInstance.detalles = false;
    modalRef.result.then((result) => {
      this.services.getUsuarioPorId(this.alumno.id).subscribe(resp=>{
        this.arrayDiario=resp.Diario
      })
            });
}


descargarPDF(){

  var doc = new jsPDF();
   
  var col = ["MODULO","DESCRIPCION","HORAS","HORAS REALIZADAS","EVALUACION PROFESOR","EVALUACION TUTOR",];
  var rows = [];
  var col2 = ["FECHA","MÓDULO","DESCRIPCIÓN DE LA TAREA","HORAS","AUTOEVALUACIÓN"]
  var rows2 = []
  this.arrayActividades.forEach(element => {
    var temp = [element.Fecha,element.Modulo,element.Nombre,element.Horas,element.Autoevaluacion]
    rows2.push(temp)
  });
    this.arrayTareasyModulos.forEach(element =>{
      var temp = [element.Nombre,element.tarea,element.Horas,element.HorasRealizadas,element.EvProfesor,element.EvTutor];
      rows.push(temp);
    }); 
    doc.page = 1; // use this as a counter.
    var totalPages = 10; // define total amount of pages
    //doc.setFont("helvetica");
    //doc.setFontType("bold");;
    doc.setFontSize(12);
    doc.autoTable(col, rows,{ startY: 120,margin:{top:50,bottom:20},
    styles:{
      font: 'italic'
    } })

    doc.autoTable(col2, rows2,{startY: 170, margin:{top:3000,bottom:50},
      styles:{
        font: 'italic'
      } })




    
    
 this.getBase64ImageFromURL(this.alumno.Foto).subscribe(base64data => {    
  
  // this is the image as dataUrl
  this.base64Image = 'data:image/jpg;base64,' + base64data;
  var idk = this.base64Image
  doc.addImage(idk,'PNG',120,40,50,50);






    doc.text(10,50,'DATOS DEL ALUMNO');
    doc.text(10,62,'Nombre: '+this.alumno.Nombre);
    doc.text(10,67,'Apellido: '+this.alumno.Apellido);
    doc.text(10,72,'Instructor: '+this.alumno.Instructor);
    doc.text(10,77,'Profesor: '+this.alumno.Colaborador);
    doc.text(10,82,'Ciclo Formativo: '+this.alumno.CicloFormativo);
    doc.text(10,87,'Empresa: '+this.alumno.Empresa);

    doc.text(10,doc.internal.pageSize.height - 40,'Firma Tutor');
    doc.text(10,doc.internal.pageSize.height - 20,'________________');
    doc.text(80,doc.internal.pageSize.height - 40,'Firma Profesor');
    doc.text(80,doc.internal.pageSize.height - 20,'________________');
    doc.text(160,doc.internal.pageSize.height - 40,'Firma Alumno');
    doc.text(160,doc.internal.pageSize.height - 20,'_______________');
   
var str = "Página " + doc.page;
        doc.setFontSize(10);// optional
        doc.text(str, 100, doc.internal.pageSize.height - 10);//key is the inte
    doc.save('Test.pdf');


  
  });

}


getBase64ImageFromURL(url: string) {
  return Observable.create((observer: Observer<string>) => {
    // create an image object
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
        observer.next(this.getBase64Image(img));
        observer.complete();
      };       img.onerror = (err) => {
         observer.error(err);
      };     } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
    }
  });
}

getBase64Image(img: HTMLImageElement) {
  // We create a HTML canvas object that will create a 2d image
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");   // This will draw image    
  ctx.drawImage(img, 0, 0);
  // Convert the drawn image to Data URL
  var dataURL = canvas.toDataURL("image/png");return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");}
}


