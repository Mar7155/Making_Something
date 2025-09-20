import { prisma } from "@/db/prisma";
import type { APIRoute } from "astro";

export async function GET( params: { orderId: string } ) {
  try {
    const { orderId } = params;
    if (!orderId) {
      return new Response(JSON.stringify({ error: "orderId required" }), { status: 400 });
    } 
    const order = await prisma.order.findUnique({
      where: { id: orderId},
      include: { orderItems: true, shipment: true, payments: true }
    })
    if (!order) {
      return new Response(JSON.stringify({ error: "No order found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ order: order }), { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    }
  }
}

export async function DELETE( params: { orderId: string } ) {
  try {
    const { orderId } = params;
    if (!orderId) {
      return new Response(JSON.stringify({ error: "orderId required" }), { status: 400 });
    }

    const deletedOrder = await prisma.order.delete({
      where: { id: orderId },
    });

    return new Response(
      JSON.stringify({ message: "Order deleted successfully", order: deletedOrder }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}