export interface User {
    name: string
    lastname: string
    email: string
    phone: string
    direccion?: {
      calle: string
      numeroExterior: number
      numeroInterior: number
      colonia: string
      codigoPostal: number
      ciudad: string
      estado: string
    }
  }