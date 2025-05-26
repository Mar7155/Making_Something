export interface Address {
  street?: string
  no_ext?: number
  no_int?: number
  cologne?: string
  zip_code?: number
  city?: string
  state?: string
}

export interface User {
  id: string         // UUID local
  clerk_id: string   // ID de Clerk 
  name: string
  lastname: string
  email?: string
  phone?: string
  has_address: boolean
  stripe_customer_id?: string // ID de Stripe 
  address?: Address
}
