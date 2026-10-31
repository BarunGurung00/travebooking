import { prisma } from "@/lib/prisma";
import { FileText, AlertCircle, MapPin, Check } from "lucide-react";
import Link from "next/link";
import PermitMatrix from "@/app/components/permits/PermitMatrix";
import PermitLocationCard from "@/app/components/permits/PermitLocationCard";
import PermitImageCard from "@/app/components/permits/PermitImageCard";
import PoiCard from "@/app/components/poi/PoiCard";
import DecisionGuide from "@/app/components/permits/DecisionGuide";
import PermitCategoryCard from "@/app/components/permits/PermitCategoryCard";
import SubcategoryCard from "@/app/components/permits/SubcategoryCard";

import {
  TREK_PERMIT_ROWS,
  LOCATIONS,
  DOCUMENTS,
  CHANGES_2026,
  PERMIT_IMAGES,
  DECISION_GUIDE,
} from "./content";

export const metadata = {
  title: "Nepal Permits — Complete Guide (2026)",
  description:
    "Everything you need to know about Nepal permits: TIMS, ACAP, Sagarmatha NP, Restricted Area Permits, and tourist visas.",
};

type TocChild = {
  id: string;
  label: string;
  href: string;
  isExternal: boolean;
  indent: boolean;
};

type TocItem = {
  id: string;
  label: string;
  href?: string;
  children?: TocChild[];
};

export default async function NepalPermitsPage() {
  const permitPois = await prisma.poi.findMany({
    where: { category: "permit" },
    include: { geo: true },
    orderBy: { poiId: "asc" },
  });

  const categories = await prisma.permit.findMany({
    where: { type: "category", parentId: null },
    orderBy: { displayOrder: "asc" },
    include: {
      _count: { select: { children: true } },
      children: {
        where: { type: "subcategory" },
        orderBy: { displayOrder: "asc" },
        include: {
          _count: { select: { children: true } },
        },
      },
    },
  });

  // Find category by slug for section rendering
  const getCat = (slug: string) => categories.find((c) => c.slug === slug);

  const TOC: TocItem[] = [
    { id: "overview", label: "1. Different Types of Permits" },
    {
      id: "entry",
      label: "2. Entry Permit",
      children: [
        {
          id: "entry-tourist-visa",
          label: "2.1 Tourist Visa",
          href: "/Nepal-Permits/entry/tourist-visa",
          isExternal: true,
          indent: true,
        },
      ],
    },
    {
      id: "trekking",
      label: "3. Trekking Permits",
      children: [
        { id: "trekking-tims", label: "3.1 TIMS Card", href: "/Nepal-Permits/trekking/tims", isExternal: true, indent: true },
        { id: "trekking-protected-area", label: "3.2 National Park & Conservation", href: "/Nepal-Permits/trekking/protected-area", isExternal: true, indent: true },
        { id: "trekking-restricted-area", label: "3.3 Restricted Area (RAP)", href: "/Nepal-Permits/trekking/restricted-area", isExternal: true, indent: true },
        { id: "trekking-local-municipality", label: "3.4 Local Municipality Fees", href: "/Nepal-Permits/trekking/local-municipality", isExternal: true, indent: true },
      ],
    },
    {
      id: "climbing",
      label: "4. Climbing Permits",
      children: [
        { id: "climbing-trekking-peaks", label: "4.1 NMA Trekking Peaks", href: "/Nepal-Permits/climbing/trekking-peaks", isExternal: true, indent: true },
        { id: "climbing-expedition-peaks", label: "4.2 MoCTCA Expedition Peaks", href: "/Nepal-Permits/climbing/expedition-peaks", isExternal: true, indent: true },
      ],
    },
    {
      id: "special",
      label: "5. Special Clearances",
      children: [
        { id: "special-drone", label: "5.1 Drone Clearances", href: "/Nepal-Permits/special/drone", isExternal: true, indent: true },
        { id: "special-filming", label: "5.2 Filming & Media", href: "/Nepal-Permits/special/filming", isExternal: true, indent: true },
        { id: "special-heritage", label: "5.3 Heritage Site Entry", href: "/Nepal-Permits/special/heritage", isExternal: true, indent: true },
        { id: "special-adventure", label: "5.4 Adventure Sports", href: "/Nepal-Permits/special/adventure", isExternal: true, indent: true },
      ],
    },
    { id: "trek-matrix", label: "6. Trek-by-Trek Matrix" },
    { id: "documents", label: "7. What to Bring to Permit Offices" },
    { id: "changes-2026", label: "8. 2026 Changes" },
    { id: "directory", label: "9. Permits in Our Directory" },
  ];

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-600 to-sky-800 text-white py-10 mt-1">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-white/15 border border-white/20 mb-3">
            <FileText className="w-3.5 h-3.5" />
            Updated for 2026
          </span>
          <h1 className="text-2xl sm:text-5xl font-black tracking-tight">
            Nepal Permits & Clearances: The Complete 2026 Guide
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Navigating visas, trekking permits, RAPs, and activity clearances
            without the confusion.
          </p>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* INTRO */}
        <section className="py-8 px-3">
          <p className="text-base text-slate-700 leading-relaxed">
            Permits are required for almost every trek in Nepal. They fund
            conservation, register trekkers for safety, and regulate restricted
            areas. The rules are complex and change year to year — this page
            explains everything you need to know for 2026, from costs to where
            to get them.
          </p>
          <p className="text-base text-slate-700 leading-relaxed mt-4">
            Most travelers need <strong>2–3 permits</strong> for a typical
            trek. Costs range from NPR 2,000 (TIMS) to over $400 (Upper Mustang
            RAP). Some permits require a guide; others don&apos;t.
          </p>
        </section>

        {/* GRID — TOC + CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 pb-20">
          {/* STICKY TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-40">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-h-[calc(100vh-11rem)] overflow-y-auto">
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
                  Table of Contents
                </h2>
                <ul className="space-y-1">
                  {TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block text-sm font-bold text-sky-700 hover:text-sky-900 hover:bg-sky-50 rounded-md px-2 py-1.5 -mx-2 transition-colors"
                      >
                        {item.label}
                      </a>
                      {item.children && (
                        <ul className="ml-3 mt-1 space-y-0.5 border-l border-slate-200 pl-2">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                className="block text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded px-2 py-1 -mx-2 transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <main className="space-y-16 min-w-0">
            {/* SECTION 1 — DIFFERENT TYPES */}
            <section id="overview" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                1. Different Types of Permits and Clearances
              </h2>

              <div className="prose prose-slate max-w-3xl mb-8">
                <p className="text-base text-slate-700 leading-relaxed">
                  Nepal requires several types of permits for travel, trekking, and
                  special activities. Most travelers need <strong>2–3 permits</strong>{" "}
                  for a typical trek — usually one entry permit, one regional permit,
                  and possibly one activity-specific permit.
                </p>
                <p className="text-base text-slate-700 leading-relaxed mt-3">
                  Permits fall into four broad categories. Choose one below to explore
                  the specific permits within.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categories.map((cat) => (
                  <PermitCategoryCard
                    key={cat.id}
                    category={cat}
                    childCount={cat._count.children}
                  />
                ))}
              </div>

              <div className="mt-8 bg-sky-50 border border-sky-200 rounded-2xl p-5">
                <p className="text-sm text-slate-700">
                  <strong className="text-sky-800">Not sure which you need?</strong>{" "}
                  Jump to the{" "}
                  <a href="#decision-guide" className="text-sky-700 font-bold hover:underline">
                    decision guide
                  </a>{" "}
                  below.
                </p>
              </div>

              <div id="decision-guide" className="mt-12 scroll-mt-32">
                <h3 className="text-xl font-black text-slate-900 mb-2">
                  Which permits for your trip?
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Pick your trip type and see exactly what you need.
                </p>
                <DecisionGuide guide={DECISION_GUIDE} />
              </div>
            </section>

            {/* SECTION 2 — ENTRY PERMIT */}
            <section id="entry" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                2. Entry Permit
              </h2>
              <p className="text-sm text-slate-500 mb-6 max-w-2xl">
                {getCat("entry")?.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getCat("entry")?.children.map((sub, i) => (
                  <SubcategoryCard
                    key={sub.id}
                    number={`2.${i + 1}`}
                    name={sub.name}
                    description={sub.description}
                    href={`/Nepal-Permits/entry/${sub.slug}`}
                    permitCount={sub._count.children}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 3 — TREKKING PERMITS */}
            <section id="trekking" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                3. Trekking Permits
              </h2>
              <p className="text-sm text-slate-500 mb-6 max-w-2xl">
                {getCat("trekking")?.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getCat("trekking")?.children.map((sub, i) => (
                  <SubcategoryCard
                    key={sub.id}
                    number={`3.${i + 1}`}
                    name={sub.name}
                    description={sub.description}
                    href={`/Nepal-Permits/trekking/${sub.slug}`}
                    permitCount={sub._count.children}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 4 — CLIMBING PERMITS */}
            <section id="climbing" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                4. Climbing Permits
              </h2>
              <p className="text-sm text-slate-500 mb-6 max-w-2xl">
                {getCat("climbing")?.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getCat("climbing")?.children.map((sub, i) => (
                  <SubcategoryCard
                    key={sub.id}
                    number={`4.${i + 1}`}
                    name={sub.name}
                    description={sub.description}
                    href={`/Nepal-Permits/climbing/${sub.slug}`}
                    permitCount={sub._count.children}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 5 — SPECIAL CLEARANCES */}
            <section id="special" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                5. Special Clearances
              </h2>
              <p className="text-sm text-slate-500 mb-6 max-w-2xl">
                {getCat("special")?.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {getCat("special")?.children.map((sub, i) => (
                  <SubcategoryCard
                    key={sub.id}
                    number={`5.${i + 1}`}
                    name={sub.name}
                    description={sub.description}
                    href={`/Nepal-Permits/special/${sub.slug}`}
                    permitCount={sub._count.children}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 6 — TREK MATRIX */}
            <section id="trek-matrix" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                6. Which Permits for Which Trek?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Pick your trek and see exactly what you need.
              </p>
              <PermitMatrix rows={TREK_PERMIT_ROWS} />
            </section>

            {/* SECTION 7 — WHAT TO BRING */}
            <section id="documents" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                7. Where to Get Permits & What to Bring
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Most permits are issued in Kathmandu or Pokhara. A few are
                available on the trail.
              </p>

              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-sky-600" />
                Where to get permits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {LOCATIONS.map((loc, i) => (
                  <PermitLocationCard key={i} {...loc} />
                ))}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-sky-600" />
                What to bring to permit offices
              </h3>
              <ul className="space-y-3">
                {DOCUMENTS.map((item) => (
                  <li
                    key={item.doc}
                    className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-2"
                  >
                    <span className="font-bold text-sm text-slate-900 sm:w-56 shrink-0">
                      {item.doc}
                    </span>
                    <span className="text-sm text-slate-600">{item.why}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* SECTION 8 — 2026 CHANGES */}
            <section id="changes-2026" className="scroll-mt-32">
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">
                      8. 2026 Changes
                    </h2>
                    <ul className="space-y-4">
                      {CHANGES_2026.map((change) => (
                        <li key={change.title}>
                          <div className="font-bold text-slate-900">
                            {change.title}
                          </div>
                          <div className="text-sm text-slate-700 mt-1">
                            {change.detail}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 9 — DATABASE PERMITS */}
            <section id="directory" className="scroll-mt-32">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                9. Permits in Our Directory
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Browse detailed pages for each permit.
              </p>
              {permitPois.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {permitPois.map((poi) => (
                    <PoiCard key={poi.poiId} poi={poi} />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500 text-center py-8">
                  No permits in the directory yet.
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}