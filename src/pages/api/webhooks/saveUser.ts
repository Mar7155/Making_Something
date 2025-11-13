import { neon } from '@neondatabase/serverless';
const sql = neon(import.meta.env.DATABASE_URL);

import { verifyWebhook } from '@clerk/astro/webhooks'
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
    try {
        const CLERK_WEBHOOK_SIGNING_SECRET = import.meta.env.CLERK_WEBHOOK_SIGNING_SECRET
        const evt = await verifyWebhook(request, {
            signingSecret: CLERK_WEBHOOK_SIGNING_SECRET,
        })

        const { id } = evt.data
        const eventType = evt.type
        const data = evt.data
        

        // Only proceed if the event is a user event and data has username and email_addresses
        if (evt.type === 'user.created') {
            const { username, email_addresses } = data as { username: string; email_addresses: Array<{ email_address: string }> };

            const email = Array.isArray(email_addresses) && email_addresses.length > 0 ? email_addresses[0].email_address : null;
            
            if (!username || !email) {
                return new Response(JSON.stringify({ error: 'username and email required' }), { status: 400 });
            }

            const newUser = await sql`INSERT INTO users (clerk_id, username, email) 
                VALUES (${id}, ${username}, ${email}) RETURNING *;`;

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