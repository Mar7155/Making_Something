import type { Order } from "@/lib/types/order";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:content";
import { API_URL } from "astro:env/server";

export const orderActions = {
    getOrders: defineAction({
        handler: async () => {
            fetch(API_URL + `order/`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                }
            )
                .then(response => response.json())
                .then(data => {
                    console.log('orders data:', data)
                })
                .catch(error => {
                    console.error('Error fetching orders:', error)
                })
        }
    }),
    getUserOrders: defineAction({
        input: z.object({
            userId: z.string(),
        }),
        handler: async (input) => {
            try {

                const response = await fetch(`${API_URL}user/orders/${input.userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch orders: ${response.status}`);
                }

                const data = await response.json();
                console.log("data: ", data.orders);

                return data;
            } catch (error) {
                console.error("Error fetching user orders:", error);
                return [];
            }
        },
    }),
    createOrder: defineAction({
        input: z.object({
            order: z.any(),
            userId: z.string(),
        }),
        handler: async (input) => {
            try {
                const response = await fetch(`${API_URL}order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",                        
                    },
                    body: JSON.stringify({
                        userId: input.userId,
                        order: input.order 
                    }),
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error("Error creating order:", error);
                throw new ActionError({ code: "BAD_REQUEST" });
            }
        }
    }),
}