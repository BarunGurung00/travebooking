import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PermitDetail from "@/app/components/permits/PermitDetail";

export default async function PermitDetailPage({
  params,
}: {
  params: Promise<{
    category: string;
    subcategory: string;
    slug: string;
  }>;
}) {
  const {
    category: categorySlug,
    subcategory: subcategorySlug,
    slug: permitSlug,
  } = await params;

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

  const permit = await prisma.permit.findFirst({
    where: { slug: permitSlug, type: "permit", parentId: subcategory.id },
  });
  if (!permit) notFound();

  const relatedSlugs = (permit.relatedSlugs as string[]) ?? [];
  const relatedPermits =
    relatedSlugs.length > 0
      ? await prisma.permit.findMany({
          where: { slug: { in: relatedSlugs }, type: "permit" },
          select: { name: true, slug: true },
        })
      : [];
   
  return (
    <div className="max-w-5xl mx-auto px-4 pb-12 pt-24">
      <div className="mb-6 text-xs flex flex-wrap items-center gap-2 text-slate-500">
        <Link href="/Nepal-Permits" className="hover:text-sky-600">
          Nepal Permits
        </Link>
        <span>›</span>
        <Link
          href={`/Nepal-Permits/${category.slug}`}
          className="hover:text-sky-600"
        >
          {category.name}
        </Link>
        <span>›</span>
        <Link
          href={`/Nepal-Permits/${category.slug}/${subcategory.slug}`}
          className="hover:text-sky-600"
        >
          {subcategory.name}
        </Link>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
        {permit.name}
      </h1>
      {permit.description && (
        <p className="text-base text-slate-600 mt-3 max-w-2xl">
          {permit.description}
        </p>
      )}

      {Array.isArray(permit.quickSummary) &&
        (permit.quickSummary as any[]).length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {(permit.quickSummary as any[]).map((s, i) => (
              <span
                key={i}
                className="bg-sky-50 text-sky-800 px-3 py-1.5 rounded-lg text-sm font-bold"
              >
                <span className="text-xs text-sky-600 uppercase mr-1">
                  {s.label}:
                </span>
                {s.value}
              </span>
            ))}
          </div>
        )}

      <div className="mt-10">
        <PermitDetail permit={permit} relatedPermits={relatedPermits} />
      </div>
    </div>
  );
}