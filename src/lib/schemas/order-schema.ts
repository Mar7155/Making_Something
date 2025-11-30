import { z } from "zod";

// Status
export const StatusSchema = z.enum(["pending", "completed", "cancelled"]);

// Payment Method
export const PaymentMethodSchema = z.enum([
  "credit_card",
  "paypal",
  "bank_transfer",
  "cash"
]);

// Product
export const ProductSchema = z.object({
  id: z.string(),
  product_id: z.string().optional(),
  name: z.string(),
  quantity: z.number().min(1),
  product_images: z.array(z.instanceof(File)).optional(),
  product_image_preview: z.string().url().optional(),
  price: z.number().nonnegative().optional(),
  discount: z.number().nonnegative().optional(),
  unit_price: z.number().nonnegative().optional(),
});

// Cart
export const CartSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().optional(),
  products: z.array(ProductSchema).optional(),
  sub_total: z.number().nonnegative().optional(),
  tax: z.number().nonnegative().optional(),
  discount: z.number().nonnegative().optional(),
  total: z.number().nonnegative().optional(),
});

// Shipping Address (placeholder, ajústalo según tu modelo real)
export const ShippingAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
});

// Order
export const OrderSchema = z.object({
  id: z.string().uuid().optional(),
  cart: CartSchema.optional(),
  shipping_address: ShippingAddressSchema.optional(),
  total: z.number().nonnegative().optional(),
  status: StatusSchema.optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  completed_at: z.union([z.string().datetime(), z.number(), z.date()]).optional(),
  payment_method: PaymentMethodSchema.optional(),
  tracking_number: z.string().optional(),
});

import { OrderStatus } from '@/lib/types';

// --- SCHEMA DE PERSONALIZACIÓN (JSONB) ---
// Validamos lo que guardamos en 'customization_data'
export const customizationSchema = z.object({
  file_path: z.string().min(1, "File path is required").optional(), 
  instructions: z.string().max(500).optional(),
  
  // Campos específicos para impresión 3D/Pines
  layer_height: z.string().optional(),
  infill: z.string().optional(),
  finish: z.enum(['matte', 'glossy', 'standard']).optional(),
});

// Schema para un Item
export const orderItemSchema = z.object({
  product_id: z.string().uuid(),
  quantity: z.number().int().positive().min(1),
  amount: z.number().positive(), // Precio unitario al momento de compra
  discount: z.number().default(0),
  
  // Validamos que el JSON cumpla la estructura
  customization_data: customizationSchema.optional(), 
});

// Schema para crear la Orden (Checkout)
export const createOrderSchema = z.object({
  profile_id: z.string().uuid(), // Reference to profile
  amount: z.number().positive(), // Total de la orden
  items: z.array(orderItemSchema).min(1, "Cart is empty"),
});

// --- TIPOS DE RESPUESTA (DB) ---
export type OrderItem = z.infer<typeof orderItemSchema> & {
  id: string;
  order_id: string;
};

export type Order = {
  id: string;
  profile_id: string;
  amount: number;
  status: OrderStatus; // Usamos el Enum (1, 2, 3...)
  created_at: string;
  updated_at: string;
  // Relaciones opcionales (Joins)
  items?: OrderItem[]; 
  shipment?: any; 
};