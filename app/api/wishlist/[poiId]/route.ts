import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ poiId: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const { poiId: poiIdStr } = await params;
  const poiId = Number(poiIdStr);
  if (!Number.isFinite(poiId)) {
    return NextResponse.json({ error: "Invalid poiId" }, { status: 400 });
  }

  await prisma.wishlist.deleteMany({
    where: {
      userId: session.user.id,
      poiId,
    },
  });

  return NextResponse.json({ success: true });
}