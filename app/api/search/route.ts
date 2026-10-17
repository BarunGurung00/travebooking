import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { poiUrl } from "@/lib/geo";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  // ─── Search Geos ───
  const geos = await prisma.geo.findMany({
    where: {
      name: { contains: q },
    },
    take: 5,
    orderBy: { geoId: "asc" },
  });

  // ─── Search POIs ───
  const pois = await prisma.poi.findMany({
    where: {
      name: { contains: q },
    },
    take: 10,
    orderBy: { poiId: "asc" },
    include: {
      geo: {
        select: { geoId: true, name: true, slug: true, type: true },
      },
    },
  });

  // ─── Build unified results ───
  const results = [
    ...geos.map((g) => ({
      type: "geo" as const,
      id: g.geoId,
      name: g.name,
      type_detail: g.type,       // "country" | "province" | "district" | "city"
      slug: g.slug,
      url: `/Tourism-g${g.geoId}-${g.slug}`,
      subtitle: g.type,
    })),
    ...pois.map((p) => ({
      type: "poi" as const,
      id: p.poiId,
      name: p.name,
      type_detail: p.category,   // "trek" | "hotel" | ...
      slug: p.slug,
      url: poiUrl(p, p.geo),
      subtitle: `${p.category} · ${p.geo.name}`,
    })),
  ];

  return NextResponse.json({ results });
}