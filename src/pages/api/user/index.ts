import { neon } from '@neondatabase/serverless';
const sql = neon(import.meta.env.DATABASE_URL);

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const users = await sql`SELECT * FROM users ORDER BY created_at DESC;`; 
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching users', details: error }), { status: 500 });
  }
};