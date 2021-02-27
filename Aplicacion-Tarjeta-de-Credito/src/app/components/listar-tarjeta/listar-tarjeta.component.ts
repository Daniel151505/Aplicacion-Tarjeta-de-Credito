import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Subject } from 'rxjs';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {
  private tarjet$ = new Subject<any>()
  listarTarjetas: TarjetaCredito[] = []

  constructor(private tarjetaService: TarjetaService,
    private toastr: ToastrService) { }

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

  eliminarTarjeta(id:any){
    this.tarjetaService.eliminarTarjeta(id).then(()=> {
        this.toastr.error('La Tarjeta fue eliminada con éxito','Registro Eliminado')
    }, error => {
        this.toastr.error('Lo siento... ocurrio un error', 'Error')
    })
  }

  editarTarjeta(tarjeta: TarjetaCredito){
    this.tarjetaService.addeditarTarjeta(tarjeta)
  }


}
