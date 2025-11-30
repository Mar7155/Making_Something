import { z } from 'zod';

// Schema para Payment Status
export const paymentStatusSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string().optional(),
});

// Schema para Payment
export const paymentSchema = z.object({
  order_id: z.string().uuid(),
  amount: z.number().positive(),
  payment_method_id: z.number().int(),
  payment_status_id: z.number().int().default(1), // Nuevo campo
  payment_date: z.string().datetime().optional(),
});

// Tipos inferidos
export type PaymentStatus = z.infer<typeof paymentStatusSchema>;
export type Payment = z.infer<typeof paymentSchema> & {
  id: string;
};