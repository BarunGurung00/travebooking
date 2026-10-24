import { DollarSign, Tag, MapPin, Star } from "lucide-react";
import type { Poi, Geo } from "@prisma/client";

type PoiWithGeo = Poi & { geo: Geo };

export default function PoiInfo({ poi }: { poi: PoiWithGeo }) {
  const items = [
    {
      icon: MapPin,
      label: "Location",
      value: poi.geo.name,
    },
    {
      icon: Tag,
      label: "Category",
      value: poi.category.charAt(0).toUpperCase() + poi.category.slice(1),
    },
  ];

  if (poi.price != null) {
    items.push({
      icon: DollarSign,
      label: "From",
      value: `$${poi.price}`,
    });
  }

  if (poi.rating != null) {
    items.push({
      icon: Star,
      label: "Rating",
      value: `${poi.rating.toFixed(1)} / 5.0`,
    });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className="bg-white rounded-2xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400 mb-1">
              <Icon className="w-3 h-3" />
              {item.label}
            </div>
            <div className="font-extrabold text-sm text-slate-900 truncate">
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}