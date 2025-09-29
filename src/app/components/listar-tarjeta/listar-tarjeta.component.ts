import { Component, OnInit } from '@angular/core';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit{
  listadoTarjetas:TarjetaCredito[]=[];
  constructor(private _tarjetaServices:TarjetaService){}
  ngOnInit(): void {
    this.listarTarjetas();
  }
  listarTarjetas(){
    this._tarjetaServices.obtenerTarjetas().subscribe(doc=>{
      doc.forEach((element:any) => {

        console.log(element.payload.doc.data());
        this.listadoTarjetas.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
  }

}
