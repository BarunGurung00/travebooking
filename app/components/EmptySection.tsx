import Link from "next/link";
import type { GeoRow } from "@/lib/geo";

const MESSAGES: Record<string, (geo: GeoRow) => string> = {
  Hotels: (geo) => `No hotels are listed in ${geo.name} yet.`,
  Treks: (geo) => `No treks are listed in ${geo.name} yet.`,
  Transports: (geo) => `No transport routes are listed for ${geo.name} yet.`,
  Guides: (geo) => `No guides are based in ${geo.name} yet.`,
  Permits: (geo) =>
    `No permits are required for ${geo.name}. National permits are listed on the Nepal page.`,
  Tourism: (geo) => `Nothing to show for ${geo.name} yet.`,
};

const HINTS: Record<string, string> = {
  Hotels: "Try looking at nearby cities.",
  Treks: "Nearest treks may be in a broader region.",
  Transports: "Most travelers fly or take a jeep — check nearby cities.",
  Guides: "Guides usually operate from larger hubs.",
  Permits: "See Nepal-wide permits for trekking and national parks.",
};

export default function EmptySection({
  section,
  geo,
}: {
  section: string;
  geo: GeoRow;
}) {
  const message = MESSAGES[section]?.(geo) ?? `No ${section} in ${geo.name}.`;
  const hint = HINTS[section];

  return (
    <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
      <div className="text-4xl mb-4">🔍</div>
      <h2 className="text-lg font-extrabold text-slate-900 mb-2">{message}</h2>
      {hint && <p className="text-sm text-slate-500">{hint}</p>}

      {section === "Permits" && (
        <Link
          href="/Permits-g977-nepal"
          className="inline-block mt-6 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm px-5 py-2.5 rounded-xl transition-colors"
        >
          View permits for Nepal →
        </Link>
      )}

      {geo.type !== "country" && (
        <p className="text-xs text-slate-400 mt-6">
          You&apos;re viewing: <span className="font-bold">{geo.name}</span>
        </p>
      )}
    </div>
  );
}