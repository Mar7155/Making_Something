import type { Order } from "./order"

export interface Address {
  street?: string
  no_ext?: string
  no_int?: string
  district?: string
  zip_code?: number
  city?: string
  state?: string
}

export interface User {
  id?: string         // UUID local
  clerk_id: string   // ID de Clerk
  username: string;
  email: string
  has_address: boolean
  stripe_customer_id?: string // ID de Stripe 
  address?: ShippingAddress[]
  orders?: Order[]
}

export interface ShippingAddress extends Address {
  id?:string
  full_name?: string
  email?: string
  phone?: string
}