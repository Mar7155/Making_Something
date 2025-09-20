import { prisma } from "@/db/prisma";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
    try {
        const addresses = await prisma.shippingAddress.findMany({
            include: { user: true, shipments: true },
        });

        return new Response(JSON.stringify(addresses), { status: 200 });

    } catch (error: any) {
        return new Response(JSON.stringify({ error: 'Error fetching address', details: error.message }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { userId, extNum, intNum, street, district, city, state, zipCode, country, isDefault } = data;

    if (!userId || !extNum || !street || !city || !state || !zipCode) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const newAddress = await prisma.shippingAddress.create({
      data: {
        userId,
        extNum,
        intNum,
        street,
        district,
        city,
        state,
        zipCode,
        country: country || 'Mexico',
        isDefault: isDefault ?? false,
      },
    });

    return new Response(JSON.stringify(newAddress), { status: 201 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Error creating address', details: error.message }), { status: 500 });
  }
};

export const PUT:APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { addressId, street, city, state, country, zipCode, isDefault } = body;
    console.log(addressId);
    
    if (!addressId) {
      return new Response(JSON.stringify({ error: "addressId required" }), { status: 400 });
    }

    if (!street && !city && !state && !country && !zipCode) {
      return new Response(JSON.stringify({ error: "At least one field is required to update" }), { status: 400 });
    }

    const updatedAddress = await prisma.shippingAddress.update({
      where: { id: addressId },
      data: { street, city, state, country, zipCode, isDefault},
    });

    return new Response(JSON.stringify({ address: updatedAddress }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}