import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { prisma } from "@/lib/prisma";
import PermitDetail from "@/app/components/permits/PermitDetail";
import PermitPhoto from "@/app/components/permits/PermitPhoto";
import PermitWhoNeeds from "@/app/components/permits/PermitWhoNeeds";
import PermitCheckpoints from "@/app/components/permits/PermitCheckpoints";
import PermitFAQs from "@/app/components/permits/PermitFAQs";

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

  // Fetch related permits with parent info to build URLs
  const relatedSlugs = (permit.relatedSlugs as string[]) ?? [];
  const relatedPermits = relatedSlugs.length > 0
    ? await prisma.permit.findMany({
      where: { slug: { in: relatedSlugs }, type: "permit" },
      include: {
        parent: {
          include: {
            parent: { select: { slug: true } },
          },
        },
      },
    })
    : [];

  // Parse new JSON fields
  const whoNeeds = (permit.whoNeeds as string[]) ?? [];
  const whoDoesnt = (permit.whoDoesnt as string[]) ?? [];
  const checkpoints = (permit.checkedAt as string[]) ?? [];
  const faqs = (permit.faqs as Array<{ q: string; a: string }>) ?? [];

  const displayDate = permit.lastVerified ?? permit.updatedAt;

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16 pt-3">
      {/* Breadcrumb */}
      <nav className="text-xs flex flex-wrap items-center gap-2 text-slate-500 mb-3">
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
        <span>›</span>
        <span className="font-bold text-slate-800">{permit.name}</span>
      </nav>

      {/* Header */}
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
        {permit.name}
      </h1>

      {/* Last updated */}
      <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        Last updated{" "}
        {new Date(displayDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      {permit.description && (
        <p className="text-base text-slate-600 mt-3 max-w-2xl">
          {permit.description}
        </p>
      )}

      {/* Quick summary badges */}
      {Array.isArray(permit.quickSummary) &&
        (permit.quickSummary as any[]).length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {(permit.quickSummary as any[]).map((s: any, i: number) => (
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

      {/* Photo */}
      <PermitPhoto
        name={permit.name}
        imageSrc={permit.imageSrc}
        caption={permit.imageCaption ?? undefined}
      />

      {/* Detail blocks */}
      <div className="mt-10">
        <PermitDetail
          permit={permit}
          relatedPermits={relatedPermits.map((rp) => ({
            name: rp.name,
            slug: rp.slug,
            categorySlug: rp.parent?.parent?.slug ?? "",
            subcategorySlug: rp.parent?.slug ?? "",
          }))}
        />
      </div>

      {/* Who needs it */}
      <PermitWhoNeeds whoNeeds={whoNeeds} whoDoesnt={whoDoesnt} />

      {/* Checkpoints */}
      <PermitCheckpoints checkpoints={checkpoints} />

      {/* FAQs */}
      <PermitFAQs faqs={faqs} />
    </div>
  );
}