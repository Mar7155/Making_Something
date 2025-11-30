// Helper para columnas JSONB
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

// Enum para status (Mapeo de tu DB: 1, 2, 3...)
export enum OrderStatus {
  PENDING = 1,
  PAID = 2,
  PROCESSING = 3,
  SHIPPED = 4,
  COMPLETED = 5,
  CANCELLED = 99,
}