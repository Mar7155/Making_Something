
import { atom } from "nanostores";
import type { OrderWithDetails } from "../types/order";

export const $userOrders = atom<OrderWithDetails[]>([])

export const $loadingOrders = atom(true)