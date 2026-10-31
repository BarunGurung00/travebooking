import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Mountain, Globe, Lock, Camera } from "lucide-react";
import { prisma } from "@/lib/prisma";
import PermitSubCategoryCard from "@/app/components/permits/PermitSubCategoryCard";

const CATEGORY_ICONS: Record<string, any> = {
  entry: Globe,
  trekking: Mountain,
  climbing: Mountain,
  special: Lock,
};

const CATEGORY_BLURBS: Record<string, string> = {
  entry:
    "The first permit every visitor needs. Covers tourist visas and basic entry clearances.",
  trekking:
    "Required for almost every multi-day trek in Nepal. Includes park permits, TIMS, RAP, and local municipality fees.",
  climbing:
    "For peak climbing and mountaineering. Licensed by NMA (trekking peaks) or MoCTCA (expedition peaks).",
  special:
    "Activity-specific permits. Only needed for drone flights, professional filming, heritage sites, and adventure sports.",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;

  const category = await prisma.permit.findFirst({
    where: { slug: categorySlug, type: "category", parentId: null },
  });
  if (!category) notFound();

  const subcategories = await prisma.permit.findMany({
    where: { parentId: category.id, type: "subcategory" },
    orderBy: { displayOrder: "asc" },
    include: { _count: { select: { children: true } } },
  });

  const totalPermits = subcategories.reduce(
    (sum, sub) => sum + sub._count.children,
    0
  );

  const Icon = CATEGORY_ICONS[category.slug] ?? Mountain;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-12 pt-3">
      {/* Breadcrumb */}
      <nav className="text-xs flex items-center gap-2 text-slate-500 mb-6">
        <Link href="/" className="hover:text-sky-600">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/Nepal-Permits" className="hover:text-sky-600">
          Nepal Permits
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="font-bold text-slate-800">{category.name}</span>
      </nav>

      {/* Hero header */}
      <div className="bg-gradient-to-br from-sky-50 to-slate-50 rounded-3xl border border-slate-200 p-8 mb-8">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-sky-600 flex items-center justify-center shrink-0">
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {category.name}
            </h1>
            <p className="text-base text-slate-600 mt-2 max-w-2xl">
              {category.description ?? CATEGORY_BLURBS[category.slug] ?? ""}
            </p>
            <div className="flex flex-wrap gap-3 mt-4 text-xs font-bold text-slate-600">
              <span className="bg-white px-3 py-1.5 rounded-full border border-slate-200">
                {subcategories.length} subcategor
                {subcategories.length === 1 ? "y" : "ies"}
              </span>
              <span className="bg-white px-3 py-1.5 rounded-full border border-slate-200">
                {totalPermits} total permit{totalPermits === 1 ? "" : "s"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory list */}
      <div>
        <h2 className="text-sm font-black uppercase tracking-wider text-sky-700 mb-4">
          Browse by subcategory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {subcategories.map((sub) => (
            <PermitSubCategoryCard
              key={sub.id}
              categorySlug={category.slug}
              subcategory={sub}
              permitCount={sub._count.children}
            />
          ))}
        </div>

        {subcategories.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No subcategories yet.
          </div>
        )}
      </div>

      {/* Back link */}
      <div className="mt-12 pt-6 border-t border-slate-200">
        <Link
          href="/Nepal-Permits"
          className="text-sm font-bold text-sky-600 hover:text-sky-800 hover:underline"
        >
          ← Back to all permit categories
        </Link>
      </div>
    </div>
  );
}