import { prisma } from "@/lib/prisma";

export type GeoRow = {
  geoId: number;
  parentId: number | null;
  name: string;
  type: string;
  slug: string;
};

/**
 * Walk up the parentId chain to build the breadcrumb.
 * Returns [Nepal, Koshi, Solukhumbu, Namche Bazaar]
 */
export async function buildBreadcrumb(geo: GeoRow): Promise<GeoRow[]> {
  const chain: GeoRow[] = [geo];
  let current = geo;

  while (current.parentId) {
    const parent = await prisma.geo.findUnique({
      where: { geoId: current.parentId },
      select: { geoId: true, parentId: true, name: true, type: true, slug: true },
    });
    if (!parent) break;
    chain.unshift(parent);
    current = parent;
  }

  return chain;
}

/**
 * Build a section URL: "/Hotels-g97740501-pokhara"
 */
export function sectionUrl(sectionKey: string, geo: GeoRow): string {
  return `/${sectionKey}-g${geo.geoId}-${geo.slug}`;
}

/**
 * Build a POI detail URL: "/Poi_Review-g97740501-d100002-annapurna-circuit-trek"
 */
export function poiUrl(poi: { poiId: number; slug: string }, geo: GeoRow): string {
  return `/Poi_Review-g${geo.geoId}-d${poi.poiId}-${poi.slug}`;
}