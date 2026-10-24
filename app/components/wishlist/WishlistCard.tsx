"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useWishlist } from "./WishlistProvider";

type WishlistItem = {
  id: number;
  poiId: number;
  name: string;
  slug: string;
  category: string;
  price: number | null;
  rating: number | null;
  geoName: string;
  url: string;
  savedAt: string;
};

const CATEGORY_COLORS: Record<string, string> = {
  trek: "bg-emerald-100 text-emerald-800",
  hotel: "bg-sky-100 text-sky-800",
  restaurant: "bg-orange-100 text-orange-800",
  transport: "bg-purple-100 text-purple-800",
  guide: "bg-indigo-100 text-indigo-800",
  permit: "bg-red-100 text-red-800",
  place: "bg-amber-100 text-amber-800",
};

export default function WishlistCard({ item }: { item: WishlistItem }) {
  const { toggle } = useWishlist();

  const colorClass =
    CATEGORY_COLORS[item.category] ?? "bg-slate-100 text-slate-800";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <span
          className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${colorClass}`}
        >
          {item.category}
        </span>
        <button
          onClick={() => toggle(item.poiId)}
          className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
        >
          Remove
        </button>
      </div>

      <h3 className="font-extrabold text-slate-900 leading-tight">
        {item.name}
      </h3>
      <p className="text-xs text-slate-500 mt-1">📍 {item.geoName}</p>

      <div className="mt-auto pt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {item.rating != null && (
            <span className="flex items-center gap-1 text-xs font-bold text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {item.rating.toFixed(1)}
            </span>
          )}
          {item.price != null && (
            <span className="text-xs font-black text-slate-900">
              ${item.price}
            </span>
          )}
        </div>
        <Link
          href={item.url}
          className="text-xs font-bold text-sky-600 hover:text-sky-800 hover:underline"
        >
          View →
        </Link>
      </div>
    </div>
  );
}