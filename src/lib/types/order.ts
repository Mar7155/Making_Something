import { OrderStatus } from '.';
import type { ShippingAddress } from '../schemas/shipping-schema';
import type { Cart } from './cart';

// Tipo base del producto dentro de un item
type ProductSummary = {
  name: string;
  preview_image_url: string | null;
};

// Item expandido con datos del producto
export type OrderItemWithProduct = {
  id: string;
  quantity: number;
  amount: number; // Precio unitario al momento de compra
  product: ProductSummary; // Join con tabla product
  customization_data?: any; // Tu JSONB
};

// Orden para usar en las interfaces
export interface CreateOrder {
  id: string;
  created_at: string;
  updated_at: string;
  total: number;
  subtotal: number;
  discount: number;  
  cart: Cart;  
  // Relaciones (Joins de Supabase)
}

// Orden completa con todas las relaciones
export interface OrderWithDetails {
  id: string;
  created_at: string;
  amount: number; // Total de la orden
  status: OrderStatus; // 1, 2, 3...
  
  // Relaciones (Joins de Supabase)
  items: OrderItemWithProduct[];
  shipping_address?: ShippingAddress; 
  shipment?: {
    tracking_number: string | null;
    status: string;
  }[]; // Puede ser array si la relación es one-to-many, asumimos array por defecto en supabase
}