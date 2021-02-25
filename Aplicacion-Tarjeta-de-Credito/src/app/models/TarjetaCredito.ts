export class TarjetaCredito {
    constructor(titular: string, numeroTarjeta:string,fechaExpiracion: string, cvv:number) { }

    id?: string
    titular: string
    numeroTarjeta: string
    fechaExpiracion: string
    cvv: number
    fechaCreacion: Date
    fechaActualizacion: Date


}