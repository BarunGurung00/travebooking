import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSectionByKey } from "@/lib/sections";
import { buildBreadcrumb, type GeoRow } from "@/lib/geo";
import Breadcrumb from "@/app/components/Breadcrumb";
import SectionTabs from "@/app/components/SectionTabs";
import PoiCard from "@/app/components/PoiCard";
import EmptySection from "@/app/components/EmptySection";

export default async function GeoPage({
    params,
}: {
    params: Promise<{ geo: string }>;
}) {
    // The URL segment is like "Tourism-g97740501-pokhara"
    const { geo: raw } = await params;

    // Parse it: <Section>-g<geoId>-<slug>
    const match = raw.match(/^([A-Za-z]+)-g(\d+)-(.+)$/);
    if (!match) notFound();

    const [, sectionKey, geoIdStr, slug] = match;
    const geoIdNum = Number(geoIdStr);
    if (!Number.isFinite(geoIdNum)) notFound();

    // Validate section
    const sectionConfig = getSectionByKey(sectionKey);
    if (!sectionConfig) notFound();

    // Fetch geo
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

    // Canonical slug redirect
    if (geo.slug !== slug) {
        redirect(`/${sectionConfig.key}-g${geo.geoId}-${geo.slug}`);
    }

    // Counts per category
    const grouped = await prisma.poi.groupBy({
        by: ["category"],
        where: { geoId: geoIdNum },
        _count: { _all: true },
    });
    const counts: Record<string, number> = {};
    for (const g of grouped) {
        counts[g.category] = g._count._all;
    }

    // Fetch POIs for this section
    const pois = await prisma.poi.findMany({
        where: {
            geoId: geoIdNum,
            ...(sectionConfig.category ? { category: sectionConfig.category } : {}),
        },
        include: { geo: true },
        orderBy: [{ rating: "desc" }, { poiId: "asc" }],
    });

    // Breadcrumb
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