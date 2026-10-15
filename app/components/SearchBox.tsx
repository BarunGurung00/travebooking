"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, MapPin, Compass, Hotel, Bus, User, FileText, Camera, Utensils } from "lucide-react";

type Result = {
  type: "geo" | "poi";
  id: number;
  name: string;
  type_detail: string;
  slug: string;
  url: string;
  subtitle: string;
};

// Icon per category
const categoryIcon = (detail: string) => {
  switch (detail) {
    case "country":
    case "province":
    case "district":
    case "city":
      return MapPin;
    case "trek":
      return Compass;
    case "hotel":
      return Hotel;
    case "restaurant":
      return Utensils;
    case "transport":
      return Bus;
    case "guide":
      return User;
    case "permit":
      return FileText;
    case "place":
      return Camera;
    default:
      return Search;
  }
};

export default function SearchBox() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch results whenever q changes (debounced)
  useEffect(() => {
    if (q.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        setResults(data.results ?? []);
        setOpen(true);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 200); // 200ms debounce

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [q]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      {/* Input */}
      <div className="flex items-center bg-white rounded-full shadow-lg px-4 py-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search destinations, treks, hotels..."
          className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none px-3"
        />
        {loading && (
          <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-[400px] overflow-y-auto">
          {results.map((r) => {
            const Icon = categoryIcon(r.type_detail);
            return (
              <li key={`${r.type}-${r.id}`}>
                <Link
                  href={r.url}
                  onClick={() => {
                    setOpen(false);
                    setQ("");
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-sky-50 transition-colors border-b border-slate-100 last:border-b-0"
                >
                  <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-sky-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-slate-900 truncate">
                      {r.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate capitalize">
                      {r.subtitle}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-sky-600 shrink-0">
                    View →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      {/* No results */}
      {open && q.trim().length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 text-center text-sm text-slate-500 z-50">
          No results for &quot;{q}&quot;
        </div>
      )}
    </div>
  );
}