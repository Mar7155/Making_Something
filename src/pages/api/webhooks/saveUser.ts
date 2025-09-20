import { prisma } from '@/db/prisma'
import { API_URL } from '@/lib/utils'
import { verifyWebhook } from '@clerk/astro/webhooks'
import type { APIRoute } from 'astro'
import { CLERK_WEBHOOK_SIGNING_SECRET } from 'astro:env/server'

export const POST: APIRoute = async ({ request }) => {
    try {
        console.log('webhook secret: ', CLERK_WEBHOOK_SIGNING_SECRET);

        const evt = await verifyWebhook(request, {
            signingSecret: CLERK_WEBHOOK_SIGNING_SECRET,
        })

        // Do something with payload
        // For this guide, log payload to console
        const { id } = evt.data
        const eventType = evt.type
        console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
        console.log('Webhook payload:', evt.data)
        const data = evt.data
        

        // Only proceed if the event is a user event and data has username and email_addresses
        if (evt.type === 'user.created') {
            const { username, email_addresses } = data as { username: string; email_addresses: Array<{ email_address: string }> };

            const email = Array.isArray(email_addresses) && email_addresses.length > 0 ? email_addresses[0].email_address : null;

            console.log('user', username, ' email', email);
            
            if (!username || !email) {
                return new Response(JSON.stringify({ error: 'username and email required' }), { status: 400 });
            }

            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                },
            });

            return new Response(JSON.stringify({ user_created: newUser }), { status: 201, headers: { "Content-Type": "application/json" } });
        } else {
            return new Response(JSON.stringify({ error: 'Invalid event type or missing user data' }), { status: 400 });
        }

    } catch (err: any) {
        if (err.code === 'P2002') {
            return new Response(JSON.stringify({ error: 'Username or email already exists', details: err }), { status: 409 });
        }
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', { status: 400 })
    }
}