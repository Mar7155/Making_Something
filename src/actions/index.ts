import { defineAction } from "astro:actions";
import { userActions } from "./user";

export const server = {
    action: defineAction({
        handler: () => {
            return 'action functions'
        }
    }),
    userActions
}
