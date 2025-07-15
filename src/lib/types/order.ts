import type { Cart } from "./cart";
import type { ShippingAddress, User } from "./user";

export type Status_Type = 'pending' | 'completed' | 'cancelled';
export type Payment_Method_Type = 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';

export interface Order {
    id?: string;
    cart?: Cart;
    shipping_address?: ShippingAddress;
    total?: number;
    status?: Status_Type;
    created_at?: string;
    updated_at?: string;
    completed_at?: string | number | Date;
    payment_method?: Payment_Method_Type;
    tracking_number?: string;
}