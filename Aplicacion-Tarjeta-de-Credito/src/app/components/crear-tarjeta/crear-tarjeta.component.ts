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
      this.agregarTarjeta()
    }else {
      this.editarTarjeta(this.id)
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
      this.form.reset();
    }, error => {
      this.loading=false
      this.toastr.error('Lo siento... ocurrio un error', 'Error');
      console.log(error);
    })
  }

  editarTarjeta(id:string){
    const TARJETA:any = {
      titular: this.form.value.titular,
      numeroTarjeta: this.form.value.numeroTarjeta,
      fechaExpiracion: this.form.value.fechaExpiracion,
      cvv: this.form.value.cvv,
      fechaActualizacion: new Date()
    }
      this.loading=true
      this.tarjetaServicio.editarTarjeta(id,TARJETA).then(() =>{
      this.loading = false
      this.titulo = 'Agregar Tarjeta'
      this.form.reset()
      this.id = undefined
      this.toastr.info('La tarjeta fue actualizad con éxito', "Registro Actualizado" )
      }, error => {
        console.log(error);
      })
    
  }

}
