import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { GeoRow } from "@/lib/geo";

export default function Breadcrumb({ items }: { items: GeoRow[] }) {
  return (
    <nav className="flex items-center flex-wrap gap-1 text-xs text-slate-500 py-3">
      {items.map((item, i) => (
        <span key={item.geoId} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 text-slate-400" />}
          {i === items.length - 1 ? (
            <span className="font-bold text-slate-800">{item.name}</span>
          ) : (
            <Link
              href={`/Tourism-g${item.geoId}-${item.slug}`}
              className="hover:text-sky-600 transition-colors"
            >
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}