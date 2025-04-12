

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_URL = import.meta.env.BASE_URL || "https://example.com"


export interface Product {
  id: string
  slug: string
  data:{
    name: string
    description: string
    price: number
    imageUrl: string 
  }
}
