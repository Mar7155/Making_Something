

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_URL = import.meta.env.BASE_URL || "https://example.com"
export const USERS_API_URL = BASE_URL + "/users" || "https://example.com"
export const ADDRESS_API_URL= BASE_URL + "/address" || "https://example.com"
