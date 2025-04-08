export interface UserWithOutAddress {
    name: string
    lastname: string
    email: string
    phone: string
    profileimg: string
  }

export interface UserWithAddress {
  name: string
  lastname: string
  email: string
  phone: string
  profileimg: string
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
