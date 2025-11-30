import { z } from 'zod';
import type { ShippingAddress } from './shipping-schema';

export const shipmentSchema = z.object({
  order_id: z.string().uuid(), // FK a Order
  address_id: z.string().uuid(), // FK a ShippingAddress
  tracking_number: z.string().nullable().optional(),
  shipment_status_id: z.number().int().default(1),
  // Las fechas son strings en JSON/API
  shipment_date: z.string().datetime().nullable().optional(),
  delivery_date: z.string().datetime().nullable().optional(),
});

export type Shipment = z.infer<typeof shipmentSchema> & {
  id: string;
  // Join opcional
  address?: ShippingAddress;
};