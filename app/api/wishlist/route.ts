import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// GET /api/wishlist — full list with POI details
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const items = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      poi: {
        include: {
          geo: {
            select: { geoId: true, name: true, slug: true },
          },
        },
      },
    },
  });

  const results = items.map((w) => {
    const catTitle =
      w.poi.category.charAt(0).toUpperCase() + w.poi.category.slice(1);
    return {
      id: w.id,
      poiId: w.poi.poiId,
      name: w.poi.name,
      slug: w.poi.slug,
      category: w.poi.category,
      price: w.poi.price,
      rating: w.poi.rating,
      geoName: w.poi.geo.name,
      url: `/${catTitle}_Review-g${w.poi.geo.geoId}-d${w.poi.poiId}-${w.poi.slug}`,
      savedAt: w.createdAt.toISOString(),
    };
  });

  return NextResponse.json({ items: results });
}

// POST /api/wishlist — save a POI
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const body = await req.json();
  const poiId = Number(body.poiId);
  if (!Number.isFinite(poiId)) {
    return NextResponse.json({ error: "Invalid poiId" }, { status: 400 });
  }

  // Check POI exists
  const poi = await prisma.poi.findUnique({
    where: { poiId },
    select: { poiId: true },
  });
  if (!poi) {
    return NextResponse.json({ error: "POI not found" }, { status: 404 });
  }

  // Upsert (idempotent)
  await prisma.wishlist.upsert({
    where: {
      userId_poiId: {
        userId: session.user.id,
        poiId,
      },
    },
    update: {},
    create: {
      userId: session.user.id,
      poiId,
    },
  });

  return NextResponse.json({ success: true });
}