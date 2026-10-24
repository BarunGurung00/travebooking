import { Star, MapPin } from "lucide-react";
import type { Poi, Geo } from "@prisma/client";
import WishlistButton from "@/app/components/wishlist/WishlistButton";

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

export default function PoiHero({ poi }: { poi: PoiWithGeo }) {
  const colorClass =
    CATEGORY_COLORS[poi.category] ?? "bg-slate-100 text-slate-800";

  return (
    <div className="bg-gradient-to-br from-sky-50 to-slate-100 rounded-3xl overflow-hidden">
      <div className="h-48 sm:h-64 flex items-center justify-center relative">
        <MapPin className="w-16 h-16 text-sky-300" />
        <span className="absolute top-4 left-4 ...">{poi.category}</span>
        <div className="absolute top-4 right-4">
          <WishlistButton poiId={poi.poiId} size="lg" />
        </div>
      </div>

      <div className="p-6 sm:p-8">
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
          {poi.name}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
          {poi.rating != null && (
            <span className="flex items-center gap-1.5 font-bold text-slate-700">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {poi.rating.toFixed(1)}
              <span className="text-slate-400 font-normal">· 0 reviews</span>
            </span>
          )}

          <span className="flex items-center gap-1.5 text-slate-500">
            <MapPin className="w-4 h-4" />
            {poi.geo.name}
          </span>
        </div>
      </div>
    </div>
  );
}