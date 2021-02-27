import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/TarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {
  titulo='Agregar Tarjeta'
  form: FormGroup
  loading= false
  id: string | undefined

  constructor( private fb:FormBuilder,
               private tarjetaServicio: TarjetaService,
               private toastr: ToastrService ) { 
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    })
  }

  ngOnInit(): void {
    this.tarjetaServicio.getTarjetaEditar().subscribe(data => {
        this.titulo = 'Editar Tarjeta'
        this.form.patchValue({
          titular: data.titular,
          numeroTarjeta: data.numeroTarjeta,
          fechaExpiracion: data.fechaExpiracion,
          cvv: data.cvv
        })
    })
  }

  guardarTarjeta() {

    if (this.id === undefined) {
      
    }else {

    }
  }

  agregarTarjeta(){
    const TARJETA: TarjetaCredito = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this.loading=true
    this.tarjetaServicio.guardarTarjeta(TARJETA).then(() => {
      this.loading=false
      console.log('tarjeta registrado');
      this.toastr.success('La tarjete fue registrada con exito!', 'Tarjeta registrada');
      this.form.reset();
    }, error => {
      this.loading=false
      this.toastr.error('Opps.. ocurrio un error', 'Error');
      console.log(error);
    })
  }

}
