import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit{
  form:FormGroup;
  loading:boolean=false;
  titulo:string='AGREGAR TARJETA';
  id:string | undefined;
  constructor(private fb:FormBuilder,private _tarjetaService:TarjetaService,private toastr: ToastrService){
    this.form=this.fb.group({ 
      titular:['',Validators.required], 
      numeroTarjeta:['', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]], 
      fechaExpiracion:['', [Validators.required,Validators.minLength(5),Validators.maxLength(5)]], 
      cvv:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]] 
    })
  }
  ngOnInit(): void {
    this._tarjetaService.getTarjetaEdit().subscribe(data=>{
      this.titulo='Editar Tarjeta'
      this.id=data.id;
      console.log(data);
      this.form.patchValue({
        titular:data.titular,
        numeroTarjeta:data.numeroTarjeta,
        fechaExpiracion:data.fechaExpiracion,
        cvv:data.cvv,
      })
    })
  }
guardarTarjeta(){
  alert(this.id);
  if(this.id === undefined){
    this.agregarTarjeta()
  }else{
    this.editarTarjeta(this.id)
  }
  
}
agregarTarjeta(){
  this.loading=true;
  const TARJETA:TarjetaCredito={
    titular:this.form.value.titular,
    numeroTarjeta:this.form.value.numeroTarjeta,
    fechaExpiracion:this.form.value.fechaExpiracion,
    cvv:this.form.value.cvv,
    fechaCreacion:new Date(),
    fechaActualizacion:new Date()
  }
  this._tarjetaService.guardarTarjeta(TARJETA).then(()=>{    
    this.toastr.success('La tarjeta fue registrada con exito!', 'Tarjeta Registrada');
    this.form.reset();
    this.loading=false;
  },error=>{
    this.toastr.error('Opss ocurrio un error',error);
    this.loading=false;
  });
}
editarTarjeta(id:string){
  const TARJETA:any={
    titular:this.form.value.titular,
    numeroTarjeta:this.form.value.numeroTarjeta,
    fechaExpiracion:this.form.value.fechaExpiracion,
    cvv:this.form.value.cvv,
    fechaActualizacion:new Date()
  }
  this.loading=true;
  this._tarjetaService.editarTarjeta(id,TARJETA).then(()=>{
    this.loading=false;
    this.titulo='Agregar Tarjeta';
    this.form.reset();
    this.id = undefined;
    this.toastr.info('La tarjeta fue actualizada con exito','Registro Actualizado')
  },error=>{
    console.log(error);
  })
}
}

