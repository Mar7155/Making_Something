import { defineAction } from "astro:actions";
import { userActions } from "./user";
import { orderActions } from "./order";

export const server = {
    action: defineAction({
        handler: () => {
            return 'action functions'
        }
    }),
    userActions,
    orderActions,
}
