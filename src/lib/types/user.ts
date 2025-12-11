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
  id?: string
  username?: string;
  email?: string
  has_address?: boolean
  stripe_customer_id?: string
  address?: ShippingAddress[]
}

export interface UserResponse {
  id?: string,
  username?: string,
  email?: string,
  fullnaeme?: string,
}

export interface ShippingAddress extends Address {
  id?: string
  full_name?: string
  email?: string
  phone?: string
}