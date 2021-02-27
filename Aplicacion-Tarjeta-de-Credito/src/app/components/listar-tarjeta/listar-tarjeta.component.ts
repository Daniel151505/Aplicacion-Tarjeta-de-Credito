import { Component, OnInit } from '@angular/core';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent implements OnInit {

  constructor(private tarjetaService: TarjetaService) { }

  ngOnInit(): void {
  }


}
