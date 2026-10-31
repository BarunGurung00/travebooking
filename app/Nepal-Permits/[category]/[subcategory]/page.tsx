import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, FileText, MapPin, Shield, Mountain } from "lucide-react";
import { prisma } from "@/lib/prisma";
import PermitListCard from "@/app/components/permits/PermitListCard";

const SUBCATEGORY_ICONS: Record<string, any> = {
  tims: FileText,
  "protected-area": Mountain,
  "restricted-area": Shield,
  "local-municipality": MapPin,
  "trekking-peaks": Mountain,
  "expedition-peaks": Mountain,
  drone: Shield,
  filming: FileText,
  heritage: MapPin,
  adventure: Mountain,
};

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;

  const category = await prisma.permit.findFirst({
    where: { slug: categorySlug, type: "category", parentId: null },
  });
  if (!category) notFound();

  const subcategory = await prisma.permit.findFirst({
    where: {
      slug: subcategorySlug,
      type: "subcategory",
      parentId: category.id,
    },
  });
  if (!subcategory) notFound();

  const permits = await prisma.permit.findMany({
    where: { parentId: subcategory.id, type: "permit" },
    orderBy: { displayOrder: "asc" },
  });

  const Icon = SUBCATEGORY_ICONS[subcategory.slug] ?? FileText;

  // Build a quick-pick guide from permit names
  const quickPicks = permits.slice(0, 6).map((p) => {
    const summary = p.quickSummary as Array<{ label: string; value: string }> | null;
    return {
      name: p.name,
      slug: p.slug,
      hint:
        Array.isArray(summary) && summary[0]?.value
          ? summary[0].value
          : p.description || "",
    };
  });

  return (
    <div className="max-w-5xl mx-auto px-4 pb-12 pt-3">
      {/* Breadcrumb */}
      <nav className="text-xs flex flex-wrap items-center gap-2 text-slate-500 mb-6">
        <Link href="/" className="hover:text-sky-600">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/Nepal-Permits" className="hover:text-sky-600">
          Nepal Permits
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link
          href={`/Nepal-Permits/${category.slug}`}
          className="hover:text-sky-600"
        >
          {category.name}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-bold text-slate-800">{subcategory.name}</span>
      </nav>

      {/* Hero header */}
      <div className="bg-gradient-to-br from-sky-50 to-slate-50 rounded-3xl border border-slate-200 p-8 mb-8">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-sky-600 flex items-center justify-center shrink-0">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {subcategory.name}
            </h1>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              {subcategory.description ?? ""}
            </p>
            <div className="flex flex-wrap gap-3 mt-4 text-xs font-bold text-slate-600">
              <span className="bg-white px-3 py-1.5 rounded-full border border-slate-200">
                {permits.length} permit{permits.length === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick-pick guide */}
      {quickPicks.length >= 2 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-black uppercase tracking-wider text-sky-700 mb-3">
            Which one do I need?
          </h2>
          <p className="text-sm text-slate-500 mb-3">
            Pick the region or situation that applies to you:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickPicks.map((pick) => (
              <Link
                key={pick.slug}
                href={`/Nepal-Permits/${category.slug}/${subcategory.slug}/${pick.slug}`}
                className="text-sm text-slate-700 hover:bg-sky-50 hover:text-sky-700 px-3 py-2 rounded-lg transition-colors border border-slate-100"
              >
                <span className="font-bold">{pick.name}</span>
                {pick.hint && (
                  <span className="block text-xs text-slate-500 mt-0.5">
                    {pick.hint}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Permit list */}
      <div>
        <h2 className="text-sm font-black uppercase tracking-wider text-sky-700 mb-4">
          All permits in this category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {permits.map((permit) => (
            <PermitListCard
              key={permit.id}
              categorySlug={category.slug}
              subcategorySlug={subcategory.slug}
              permit={permit}
            />
          ))}
        </div>

        {permits.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No permits in this subcategory yet.
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="mt-12 pt-6 border-t border-slate-200">
        <Link
          href={`/Nepal-Permits/${category.slug}`}
          className="text-sm font-bold text-sky-600 hover:text-sky-800 hover:underline"
        >
          ← Back to {category.name}
        </Link>
      </div>
    </div>
  );
}