import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSectionByKey } from "@/lib/sections";
import { buildBreadcrumb, poiCategoryKey, type GeoRow } from "@/lib/geo";
import Breadcrumb from "@/app/components/Breadcrumb";
import SectionTabs from "@/app/components/SectionTabs";
import PoiCard from "@/app/components/PoiCard";
import EmptySection from "@/app/components/EmptySection";
import PoiHero from "@/app/components/PoiHero";
import PoiInfo from "@/app/components/PoiInfo";
import ReviewForm from "@/app/components/ReviewForm";
import ReviewList, { type ReviewWithUser } from "@/app/components/ReviewList";

export default async function CatchAllPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: raw } = await params;

  // ─── Format 1: POI page ───
  // "Trek_Review-g97710301-d100001-everest-base-camp-trek"
  const poiMatch = raw.match(/^([A-Za-z]+)_Review-g(\d+)-d(\d+)-(.+)$/);
  if (poiMatch) {
    return renderPoiPage(poiMatch);
  }

  // ─── Format 2: Geo section page ───
  // "Tourism-g97740501-pokhara"
  const geoMatch = raw.match(/^([A-Za-z]+)-g(\d+)-(.+)$/);
  if (geoMatch) {
    return renderGeoPage(geoMatch);
  }

  // Neither format
  notFound();
}

// ═══════════════════════════════════════════════════
// GEO PAGE
// ═══════════════════════════════════════════════════

async function renderGeoPage(match: RegExpMatchArray) {
  const [, sectionKey, geoIdStr, slug] = match;
  const geoIdNum = Number(geoIdStr);
  if (!Number.isFinite(geoIdNum)) notFound();

  const sectionConfig = getSectionByKey(sectionKey);
  if (!sectionConfig) notFound();

  const geo = await prisma.geo.findUnique({
    where: { geoId: geoIdNum },
    select: {
      geoId: true,
      parentId: true,
      name: true,
      type: true,
      slug: true,
    },
  });
  if (!geo) notFound();

  if (geo.slug !== slug) {
    redirect(`/${sectionConfig.key}-g${geo.geoId}-${geo.slug}`);
  }

  const grouped = await prisma.poi.groupBy({
    by: ["category"],
    where: { geoId: geoIdNum },
    _count: { _all: true },
  });
  const counts: Record<string, number> = {};
  for (const g of grouped) {
    counts[g.category] = g._count._all;
  }

  const pois = await prisma.poi.findMany({
    where: {
      geoId: geoIdNum,
      ...(sectionConfig.category ? { category: sectionConfig.category } : {}),
    },
    include: { geo: true },
    orderBy: [{ rating: "desc" }, { poiId: "asc" }],
  });

  const breadcrumb = await buildBreadcrumb(geo as GeoRow);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      <Breadcrumb items={breadcrumb} />

      <div className="mt-2 mb-6">
        <h1 className="text-3xl font-black text-slate-900">
          {sectionConfig.category === null
            ? geo.name
            : `${sectionConfig.label} in ${geo.name}`}
        </h1>
        <p className="text-sm text-slate-500 mt-1 capitalize">
          {geo.type} · {pois.length} {pois.length === 1 ? "result" : "results"}
        </p>
      </div>

      <SectionTabs
        geo={geo as GeoRow}
        activeSection={sectionConfig.key}
        counts={counts}
      />

      <div className="mt-8">
        {pois.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pois.map((poi) => (
              <PoiCard key={poi.poiId} poi={poi} />
            ))}
          </div>
        ) : (
          <EmptySection section={sectionConfig.key} geo={geo as GeoRow} />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// POI PAGE
// ═══════════════════════════════════════════════════

async function renderPoiPage(match: RegExpMatchArray) {
  const [, categoryKey, geoIdStr, poiIdStr, slug] = match;
  const geoIdNum = Number(geoIdStr);
  const poiIdNum = Number(poiIdStr);
  if (!Number.isFinite(geoIdNum) || !Number.isFinite(poiIdNum)) notFound();

  const poi = await prisma.poi.findUnique({
    where: { poiId: poiIdNum },
    include: { geo: true },
  });
  if (!poi) notFound();

  const reviews = await prisma.review.findMany({
    where: { poiId: poiIdNum },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { id: true, name: true, image: true },
      },
    },
  });

  if (poi.slug !== slug) {
    const catTitle = poiCategoryKey(poi.category);
    redirect(`/${catTitle}_Review-g${poi.geo.geoId}-d${poi.poiId}-${poi.slug}`);
  }

  const geo = {
    geoId: poi.geo.geoId,
    parentId: poi.geo.parentId,
    name: poi.geo.name,
    type: poi.geo.type,
    slug: poi.geo.slug,
  };
  const geoChain = await buildBreadcrumb(geo as GeoRow);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      <Breadcrumb
        items={[
          ...geoChain,
          {
            geoId: -1,
            parentId: null,
            name: poi.name,
            type: poi.category,
            slug: poi.slug,
          },
        ]}
      />

      <div className="mt-2">
        <PoiHero poi={poi} />
      </div>

      <div className="mt-6">
        <PoiInfo poi={poi} />
      </div>

      {poi.description && (
        <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-6">
          <h2 className="text-lg font-black text-slate-900 mb-3">About</h2>
          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {poi.description}
          </p>
        </div>
      )}

      <div className="mt-8 space-y-6">
        <ReviewForm poiId={poi.poiId} />
        <ReviewList reviews={reviews as ReviewWithUser[]} />
      </div>
    </div>
  );
}