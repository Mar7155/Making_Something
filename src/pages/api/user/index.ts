import { prisma } from "@/db/prisma";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const users = await prisma.user.findMany({
      include: { shippingAddresses: true, orders: true },
    });
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error fetching users', details: error }), { status: 500 });
  }
};