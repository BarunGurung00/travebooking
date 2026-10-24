import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET /api/wishlist/ids — just the saved POI IDs for the current user
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ids: [] });
  }

  const rows = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    select: { poiId: true },
  });

  return NextResponse.json({ ids: rows.map((r) => r.poiId) });
}