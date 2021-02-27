import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {

  listarTarjetas: TarjetaCredito[] = []

  constructor(private tarjetaService: TarjetaService) { }

  ngOnInit(): void {
    this.obtenerTajetas()
  }

  obtenerTajetas(){
    this.tarjetaService.obtenerTarjetas().subscribe(doc => {
      this.listarTarjetas = []
      doc.forEach(element => {
        this.listarTarjetas.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      })
    })
  }


}
