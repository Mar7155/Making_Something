import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:content";

export const orderActions = {
    getOrders: defineAction({
        handler: async () => {
            
        }
    }),
    getUserOrders: defineAction({
        input: z.object({
            userId: z.string(),
        }),
        handler: async (input) => {
            try {

            } catch (error) {

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
                
            } catch (error) {
            }
        }
    }),
}