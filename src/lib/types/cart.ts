import type { Product } from "./product";

export interface Cart {
    id?: string;
    user_id?: string;
    products?: Product[];
    sub_total?: number;
    tax?: number;
    discount?: number;
    total?: number;
}