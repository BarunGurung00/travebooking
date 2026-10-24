import { prisma } from "@/lib/prisma";
import { FileText, AlertCircle } from "lucide-react";
import Link from "next/link";
import PermitMatrix from "@/app/components/permits/PermitMatrix";
import PermitLocationCard from "@/app/components/permits/PermitLocationCard";
import PermitImageCard from "@/app/components/permits/PermitImageCard";
import PoiCard from "@/app/components/poi/PoiCard";
import DecisionGuide from "@/app/components/permits/DecisionGuide";
import PermitCategoryCard from "@/app/components/permits/PermitCategoryCard";

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

  const TOC: TocItem[] = [
    {
      id: "permit-types",
      label: "1. Permit Categories",
      children: categories.flatMap((cat) => [
        {
          id: `cat-${cat.slug}`,
          label: cat.name,
          href: `/Nepal-Permits/${cat.slug}`,
          isExternal: true,
          indent: false,
        },
        ...cat.children.map((sub) => ({
          id: `sub-${sub.slug}`,
          label: `${sub.name} (${sub._count.children})`,
          href: `/Nepal-Permits/${cat.slug}/${sub.slug}`,
          isExternal: true,
          indent: true,
        })),
      ]),
    },
    {
      id: "decision-guide",
      label: "Which permits for your trip?",
    },
    {
      id: "what-permits-look-like",
      label: "2. What Permits Look Like",
    },
    {
      id: "trek-matrix",
      label: "3. Trek-by-Trek Matrix",
    },
    {
      id: "where-to-get",
      label: "4. Where to Get Permits",
    },
    {
      id: "documents",
      label: "5. Documents Checklist",
    },
    {
      id: "changes-2026",
      label: "6. 2026 Changes",
    },
    {
      id: "directory",
      label: "7. Permits in Our Directory",
    },
  ];

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="bg-gradient-to-br from-sky-600 to-sky-800 text-white py-12 mt-6">
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
                                className={`block text-xs font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded px-2 py-1 -mx-2 transition-colors ${
                                  child.indent ? "ml-2" : ""
                                }`}
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
            {/* SECTION 1 — PERMIT CATEGORIES */}
            <section id="permit-types" className="scroll-mt-24">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                1. Permit Categories
              </h2>
              <p className="text-sm text-slate-500 mb-8 max-w-2xl">
                Nepal uses four main permit categories. Choose one to explore
                the specific permits within.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categories.map((cat) => (
                  <PermitCategoryCard
                    key={cat.id}
                    category={cat}
                    childCount={cat._count.children}
                  />
                ))}
              </div>

              <div id="decision-guide" className="mt-10 scroll-mt-24">
                <h3 className="text-sm font-black uppercase tracking-wider text-sky-700 mb-3">
                  Which permits for your trip?
                </h3>
                <DecisionGuide guide={DECISION_GUIDE} />
              </div>
            </section>

            {/* SECTION 2 — WHAT PERMITS LOOK LIKE */}
            <section id="what-permits-look-like" className="scroll-mt-24">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                2. What Permits Look Like
              </h2>
              <p className="text-sm text-slate-500 mb-6 max-w-2xl">
                Real permit documents from Nepal. When you buy a permit,
                you&apos;ll get a paper card (or a sticker for some park
                permits) — not a digital pass.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {PERMIT_IMAGES.map((permit) => (
                  <PermitImageCard key={permit.name} data={permit} />
                ))}
              </div>
            </section>

            {/* SECTION 3 — TREK MATRIX */}
            <section id="trek-matrix" className="scroll-mt-24">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                3. Which Permits for Which Trek?
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Pick your trek and see exactly what you need.
              </p>
              <PermitMatrix rows={TREK_PERMIT_ROWS} />
            </section>

            {/* SECTION 4 — WHERE TO GET */}
            <section id="where-to-get" className="scroll-mt-24">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                4. Where to Get Permits
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Most permits are issued in Kathmandu or Pokhara. A few are
                available on the trail.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {LOCATIONS.map((loc, i) => (
                  <PermitLocationCard key={i} {...loc} />
                ))}
              </div>
            </section>

            {/* SECTION 5 — DOCUMENTS */}
            <section id="documents" className="scroll-mt-24">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                5. Documents Checklist
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Bring these to every permit office.
              </p>
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

            {/* SECTION 6 — 2026 CHANGES */}
            <section id="changes-2026" className="scroll-mt-24">
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-slate-900 mb-4">
                      6. 2026 Changes
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

            {/* SECTION 7 — DATABASE PERMITS */}
            <section id="directory" className="scroll-mt-24">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                7. Permits in Our Directory
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