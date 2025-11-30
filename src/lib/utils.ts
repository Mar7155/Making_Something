

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = import.meta.env.API_URL || "https://example.com"
export const USERS_API_URL = API_URL + "/user" || "https://example.com"
export const ORDERS_API_URL = API_URL + "/order" || "https://example.com"
export const ADDRESS_API_URL= API_URL + "/address" || "https://example.com"

export const PUBLIC_SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL as string;
export const PUBLIC_SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;
