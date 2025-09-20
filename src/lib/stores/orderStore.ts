
import { atom } from "nanostores";
import type { Order } from "../types/order";

export const $userOrders = atom<Order[]>([])

export const $loadingOrders = atom(true)