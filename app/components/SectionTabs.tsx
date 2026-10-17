import Link from "next/link";
import { SECTIONS } from "@/lib/sections";
import type { GeoRow } from "@/lib/geo";
import { sectionUrl } from "@/lib/geo";

type Counts = Record<string, number>;

export default function SectionTabs({
  geo,
  activeSection,
  counts,
}: {
  geo: GeoRow;
  activeSection: string;
  counts: Counts;
}) {
  return (
    <div className="border-b border-slate-200 overflow-x-auto">
      <div className="flex gap-1 min-w-max">
        {SECTIONS.map((section) => {
          const isActive =
            section.key.toLowerCase() === activeSection.toLowerCase();

          const count =
            section.category === null
              ? Object.values(counts).reduce((a, b) => a + b, 0)
              : counts[section.category] ?? 0;

          const Icon = section.icon;

          // Tourism tab shows the geo's own name (e.g. "Pokhara")
          const displayLabel =
            section.key === "Tourism" ? geo.name : section.label;

          return (
            <Link
              key={section.key}
              href={sectionUrl(section.key, geo)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-all ${
                isActive
                  ? "border-sky-600 text-sky-600"
                  : "border-transparent text-slate-600 hover:text-sky-600 hover:border-slate-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{displayLabel}</span>
              {count > 0 && (
                <span
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-sky-600 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}