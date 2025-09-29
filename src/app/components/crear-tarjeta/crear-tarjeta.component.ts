import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent {
  form:FormGroup;
  constructor(private fb:FormBuilder,private _tarjetaService:TarjetaService,private toastr: ToastrService){
    this.form=this.fb.group({ 
      titular:['',Validators.required], 
      numeroTarjeta:['', [Validators.required,Validators.minLength(16),Validators.maxLength(16)]], 
      fechaExpiracion:['', [Validators.required,Validators.minLength(5),Validators.maxLength(5)]], 
      cvv:['',[Validators.required,Validators.minLength(3),Validators.maxLength(3)]] 
    })
  }
crearTarjeta(){
  const TARJETA:TarjetaCredito={
    titular:this.form.value.titular,
    numeroTarjeta:this.form.value.numeroTarjeta,
    fechaExpiracion:this.form.value.fechaExpiracion,
    cvv:this.form.value.cvv,
    fechaCreacion:new Date(),
    fechaActualizacion:new Date()
  }
  //console.log(TARJETA);
  this._tarjetaService.guardarTarjeta(TARJETA).then(()=>{
    console.log("Tarjeta Registrada");
    this.toastr.success('La tarjeta fue registrada con exito!', 'Tarjeta Registrada');
    this.form.reset();
  },error=>{
    this.toastr.error('Opss ocurrio un error','error');
    console.log(error);
  });
}
}

