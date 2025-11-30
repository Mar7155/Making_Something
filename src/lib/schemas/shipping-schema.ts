// schemas/shipping.ts
import { z } from 'zod';

// --- ZOD SCHEMA (Address Form) ---
export const shippingAddressSchema = z.object({
  profile_id: z.string().uuid(), // Ahora usamos profile_id
  fullname: z.string().min(5, "Full name required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be 10 digits").regex(/^\d+$/, "Numbers only"),
  company: z.string().optional(), // Antes 'empresa'
  street: z.string().min(1, "Street required"),
  ext_num: z.string().min(1, "Exterior number required"),
  int_num: z.string().optional(),
  district: z.string().min(1, "District required"),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),
  zip_code: z.string().length(5, "Zip code must be 5 digits"),
  country: z.string().default("Mexico"),
  is_default: z.boolean().default(false),
});

// Tipo para frontend
export type ShippingFormValues = z.infer<typeof shippingAddressSchema>

export type ShippingAddress = z.infer<typeof shippingAddressSchema> & {
  id: string;
};

export type Shipment = {
  id: string;
  order_id: string;
  address_id: string;
  tracking_number: string | null;
  shipment_date: string | null;
  delivery_date: string | null;
  status: 'preparing' | 'shipped' | 'delivered' | 'returned';
  // Join opcional
  address?: ShippingAddress;
};