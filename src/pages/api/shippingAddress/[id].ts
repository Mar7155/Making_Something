import type { APIRoute } from 'astro';
import { prisma } from '@/db/prisma';

export async function GET( params: { addressId: string } ) {
  try {
    const { addressId } = params;

    if (!addressId) {
      return new Response(JSON.stringify({ error: "addressId required" }), { status: 400 });
    }

    const address = await prisma.shippingAddress.findUnique({
      where: { id: addressId },
      include: { user: true, shipments: true },
    });

    if (!address) {
      return new Response(JSON.stringify({ error: 'Address not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(address), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Error fetching address', details: error.message }), { status: 500 });
  }
};

export async function DELETE( params: { addressId: string } ) {
  try {
    const { addressId } = params;

    if (!addressId) {
      return new Response(JSON.stringify({ error: "addressId required" }), { status: 400 });
    }

    const deletedAddress = await prisma.shippingAddress.delete({
      where: { id: addressId },
    });

    return new Response(JSON.stringify({ message: "Address deleted successfully", address: deletedAddress }), { status: 200 });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      // Prisma error when record not found
      return new Response(JSON.stringify({ error: "Address not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
