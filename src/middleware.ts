import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server'

const protectedRoutes = createRouteMatcher(["/Profile(.*)"])

export const onRequest = clerkMiddleware((auth, context) => {
    const { userId } = auth()

    if (protectedRoutes(context.request) && !userId) {
        return Response.redirect(new URL("/", context.request.url))
    }
})