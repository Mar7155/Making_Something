import { prisma } from "@/db/prisma";

export async function GET({ params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    if (!userId) {
      return new Response(JSON.stringify({ error: "userId required" }), { status: 400 });
    }

    const addresses = await prisma.shippingAddress.findMany({
      where: { userId },
    });

    if (!addresses || addresses.length === 0) {
      return new Response(JSON.stringify({ error: "No addresses found for this user" }), { status: 404 });
    }

    return new Response(JSON.stringify({ addresses }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}