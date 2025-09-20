import { prisma } from "@/db/prisma";
import type { APIRoute } from "astro";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { orderItems: true, shipment: true, payments: true }
    })
    if (!orders) {
        return new Response(JSON.stringify({ error: "No orders found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ orders: orders}), { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    }
  }
}

export const PUT:APIRoute = async ({ request }) => {
  try {
    
    const body = await request.json();
    const { orderId, subtotal, discount, shipping, total, status } = body;

    if (!orderId) {
      return new Response(JSON.stringify({ error: "orderId required" }), { status: 400 });
    }


    if (!subtotal && !discount && !shipping && !total && !status) {
      return new Response(
        JSON.stringify({ error: "At least one field required to update" }),
        { status: 400 }
      );
    }

    // Validar enum
    const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"];
    if (status && !validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }),
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { subtotal, discount, shipping, total, status },
    });

    return new Response(JSON.stringify({ order: updatedOrder }), { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      return new Response(JSON.stringify({ error: "Order not found" }), { status: 404 });
    }
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}

export const POST:APIRoute = async ({ request }) => {
  try {
    
    const body = await request.json();
    
    const { userId, order } = body;
    const orderItems = order.cart?.products || [];    

    if (!userId || !order.subtotal || !order.total || orderItems.length === 0) {
      
      return new Response(
        JSON.stringify({ error: "userId, subtotal, total and cart are required" }),
        { status: 400 }
      );
    }

    // Validar enum
    const validStatuses = ["pending", "paid", "shipped", "delivered", "cancelled"];
    if (order.status && !validStatuses.includes(order.status)) {
      return new Response(
        JSON.stringify({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` }),
        { status: 400 }
      );
    }

    const newOrder = await prisma.order.create({
      data: {
        userId,
        subtotal: order.subtotal,
        orderItems: {
          create: orderItems.map(item => ({
            productId: item.product_id,
            quantity: item.quantity,
            price: item.price,
            discount: item.discount ?? 0,
            unitPrice: item.unit_price
          }))
        },
        discount: order.discount ?? 0,
        shipping: order.shipping ?? 0,
        total: order.total,
        status: order.status || "pending",
      },
      include: { orderItems:true }
    });

    return new Response(JSON.stringify({ newOrder }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
