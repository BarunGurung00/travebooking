import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Poi, Geo } from "@prisma/client";

type PoiWithGeo = Poi & { geo: Geo };

const CATEGORY_COLORS: Record<string, string> = {
  trek: "bg-emerald-100 text-emerald-800",
  hotel: "bg-sky-100 text-sky-800",
  restaurant: "bg-orange-100 text-orange-800",
  transport: "bg-purple-100 text-purple-800",
  guide: "bg-indigo-100 text-indigo-800",
  permit: "bg-red-100 text-red-800",
  place: "bg-amber-100 text-amber-800",
};

export default function PoiCard({ poi }: { poi: PoiWithGeo }) {
  const colorClass =
    CATEGORY_COLORS[poi.category] ?? "bg-slate-100 text-slate-800";

  const url = `/Poi_Review-g${poi.geo.geoId}-d${poi.poiId}-${poi.slug}`;

  return (
    <Link
      href={url}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-sky-300 transition-all flex flex-col"
    >
      {/* Header */}
      <div className="h-32 bg-gradient-to-br from-sky-50 to-slate-100 flex items-center justify-center relative">
        <span
          className={`absolute top-3 left-3 text-[10px] font-black uppercase px-2 py-1 rounded-md ${colorClass}`}
        >
          {poi.category}
        </span>
        <MapPin className="w-10 h-10 text-sky-300" />
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-extrabold text-sm text-slate-900 line-clamp-2">
          {poi.name}
        </h3>

        {poi.description && (
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {poi.description}
          </p>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between">
          {poi.rating != null && (
            <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {poi.rating.toFixed(1)}
            </span>
          )}
          {poi.price != null && (
            <span className="text-xs font-black text-slate-900">
              ${poi.price}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}