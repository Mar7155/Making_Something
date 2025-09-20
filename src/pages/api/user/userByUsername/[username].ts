import { prisma } from "@/db/prisma";

export async function GET({ params }: { params: { username: string } }) {
  try {
    const username = params.username;
    if (!username) {
      return new Response(JSON.stringify({ error: "username required" }), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username: username },
      include: { orders: true, shippingAddresses: true},
    });

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
