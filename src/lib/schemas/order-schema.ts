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
