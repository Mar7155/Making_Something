import { atom } from "nanostores";
import type { User } from "../types/user";
import type { Order } from "../types/order";

// ----- Atoms -----

export const $user = atom<User | null>(null);

export const $loading = atom(true)


// ----- Función segura para obtener órdenes -----


// ----- Agregar orden -----

export function addOrder(order: Order) {
    const currentUser = $user.get();
    const updatedOrders = [...(currentUser.orders ?? []), order];

    $user.set({
        ...currentUser,
        orders: updatedOrders,
    });
}
