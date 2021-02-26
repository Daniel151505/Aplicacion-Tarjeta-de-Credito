import { THIS_EXPR } from "@angular/compiler/src/output/output_ast"

export class TarjetaCredito {
    constructor(titular: string, numeroTarjeta:string,fechaExpiracion: string, cvv:number) { 
        this.titular= titular
        this.numeroTarjeta = numeroTarjeta
        this.fechaExpiracion = fechaExpiracion
        this.cvv = cvv
        this.fechaCreacion= new Date()
        this.fechaActualizacion = new Date()
    }

    id?: string
    titular: string
    numeroTarjeta: string
    fechaExpiracion: string
    cvv: number
    fechaCreacion: Date
    fechaActualizacion: Date

}