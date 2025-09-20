import { atom } from "nanostores";
import type { User } from "../types/user";
import type { Order } from "../types/order";
import { actions } from "astro:actions";

// ----- Atoms -----

export const $user = atom<User>({
    id: "",
    clerk_id: "",
    username: "kitty",
    email: "",
    has_address: false,
});

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
