import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit{
  listadoTarjetas:TarjetaCredito[]=[];
  constructor(private _tarjetaServices:TarjetaService,private toastr: ToastrService){}
  ngOnInit(): void {
    this.listarTarjetas();
  }
  listarTarjetas(){
    
    this._tarjetaServices.obtenerTarjetas().subscribe(doc=>{
      this.listadoTarjetas=[];
      doc.forEach((element:any) => {

        console.log(element.payload.doc.data());
        this.listadoTarjetas.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }
  eliminarTarjeta(id:any){
    this._tarjetaServices.eliminarTarjeta(id).then(()=>{
      this.toastr.error("Se elimino correctamente",'Alerta de Eliminación');
    },error =>{
      this.toastr.error("Error al eliminar registro","Error")
      console.log(error)
    });
  }
  editarTarjeta(tarjeta:TarjetaCredito){
    this._tarjetaServices.addTarjetaEdit(tarjeta);
  }
}
