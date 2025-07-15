export type Wholesale_Discount_Type = ""

export interface Product {
    id: string;
    product_id?: string;
    name: string;
    quantity: number;
    product_images?: File[];
    product_image_preview?: string;
    price?: number;
    discount?: number;
    unit_price?: number;
};