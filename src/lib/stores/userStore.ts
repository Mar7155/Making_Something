import { atom } from "nanostores";
import { $userStore } from "@clerk/astro/client";
import type { ShippingAddress, User } from "../types/user";
import type { Cart } from "../types/cart";
import type { Order } from "../types/order";
import type { Product } from "../types/product";
import { useEffect, useSyncExternalStore } from "react";

// ----- Atoms -----

export const $user = atom<User>({
    clerk_id: "",
    username: "",
    email: "",
    has_address: false,
});

export const $loading = atom(false)


// ----- Datos de ejemplo -----

const products_sample: Product[] = [
    {
        id: "1",
        name: "Pin 5.6cm",
        price: 250.0,
        quantity: 10,
        product_id: "1",
        unit_price: 25.0,
        product_image_preview: "/images/pin-frontal-5.6cm.webp",
    },
    {
        id: "2",
        name: "Pin 3.2cm",
        price: 150.0,
        quantity: 10,
        product_id: "2",
        unit_price: 15.0,
        product_image_preview: "/images/pin-frontal-3.2cm.webp",
    },
    {
        id: "3",
        name: "Pin 5.6cm magnético destapador",
        price: 400.0,
        quantity: 10,
        product_id: "3",
        unit_price: 40.0,
        product_image_preview: "/images/pin-frontal-5.6cm.webp",
    },
];

const shipping_address: ShippingAddress[] = [
    {
        id: "1",
        email: "john.doe@example.com",
        full_name: "John Doe",
        phone: "+1 1234567890",
        street: "Av. Independiente",
        no_ext: "999",
        no_int: "999",
        district: "Poniente",
        zip_code: 99999,
        city: "Tulancingo",
        state: "Hidalgo",
    },
    {
        id: "2",
        email: "christine.doe@example.com",
        full_name: "Christine Doe",
        phone: "+1 1234527180",
        street: "Blv. San Cristóbal",
        no_ext: "999",
        no_int: "999",
        district: "Centro",
        zip_code: 99999,
        city: "Mexicali",
        state: "Baja California",
    },
];

const carts_sample: Cart[] = [
    {
        id: "1",
        user_id: "1",
        products: [products_sample[1], products_sample[2]],
        sub_total: 400,
        tax: 0,
        total: 400,
    },
];

const orders_sample: Order[] = [
    {
        id: "ORD-2024-001",
        cart: carts_sample[0],
        total: carts_sample[0].total || 0,
        payment_method: "credit_card",
        shipping_address: shipping_address[1],
        status: "pending",
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-02-15T10:30:00Z",
    },
];

// ----- Hook: useUserData -----

export function useUserData() {
    $loading.set(true);
    const clerkUser = useSyncExternalStore(
        $userStore.listen,
        $userStore.get,
        $userStore.get
    );

    if (!clerkUser) return;


    $user.set({
        id: clerkUser.id,
        clerk_id: clerkUser.id,
        username: clerkUser.username || "",
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        has_address: true,
        stripe_customer_id: "",
        address: [shipping_address[0]],
        orders: [],
    });

    $loading.set(false);

    return $user.get();
}

// ----- Función segura para obtener órdenes -----

export function getOrders(): Order[] {
    const userInfo = $user.get();

    return userInfo.orders ?? [];
}

// ----- Agregar orden -----

export function addOrder(order: Order) {
    const currentUser = $user.get();
    const updatedOrders = [...(currentUser.orders ?? []), order];

    $user.set({
        ...currentUser,
        orders: updatedOrders,
    });
}
