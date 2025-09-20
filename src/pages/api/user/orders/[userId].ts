import { prisma } from "@/db/prisma";

export async function GET({ params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;
    
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId required" }), { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { orderItems: true, payments: true, shipment: true },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ orders }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
