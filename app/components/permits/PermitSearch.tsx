"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  X,
  FileText,
  ChevronRight,
  Mountain,
  Globe,
  Lock,
} from "lucide-react";

type SearchResult = {
  id: number;
  name: string;
  description: string;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
  subcategorySlug: string;
  url: string;
};

type PopularPermit = {
  id: number;
  name: string;
  slug: string;
  parent: {
    slug: string;
    name: string;
    parent: {
      slug: string;
      name: string;
    } | null;
  } | null;
};

const CATEGORY_ICONS: Record<string, any> = {
  entry: Globe,
  trekking: Mountain,
  climbing: Mountain,
  special: Lock,
};

export default function PermitSearch({
  popularPermits,
}: {
  popularPermits: PopularPermit[];
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch results when query changes
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/permits/search?q=${encodeURIComponent(query.trim())}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setResults(data.results ?? []);
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setFocused(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function closeAndClear() {
    setFocused(false);
    setQuery("");
    setResults([]);
  }

  const showRecommendations = query.trim().length < 2;
  const hasResults = results.length > 0;

  return (
    <>
      {/* Backdrop */}
      {focused && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setFocused(false)}
        />
      )}

      {/* Search container */}
      <div ref={wrapperRef} className="relative z-40">
        {/* Input bar */}
        <div className="flex items-center bg-white rounded-full shadow-lg border border-slate-200 px-4 py-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Search permits: TIMS, Everest, drone..."
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none px-3"
          />
          {loading && (
            <div className="w-4 h-4 border-2 border-sky-600 border-t-transparent rounded-full animate-spin shrink-0" />
          )}
          {query && !loading && (
            <button
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-700 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdown — only when focused */}
        {focused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[70vh] overflow-y-auto">
            {/* STATE: recommendations (empty query) */}
            {showRecommendations && (
              <>
                {/* Popular permits */}
                {popularPermits.length > 0 && (
                  <div className="p-4 border-b border-slate-100">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                      Popular permits
                    </h3>
                    <ul className="space-y-1">
                      {popularPermits.map((p) => {
                        if (!p.parent || !p.parent.parent) return null;

                        return (
                          <li key={p.id}>
                            <Link
                              href={`/Nepal-Permits/${p.parent.parent.slug}/${p.parent.slug}/${p.slug}`}
                              onClick={closeAndClear}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sky-50 transition-colors group"
                            >
                              <FileText className="w-4 h-4 text-sky-600 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm text-slate-900 truncate">
                                  {p.name}
                                </div>
                                <div className="text-xs text-slate-500 truncate">
                                  {p.parent.parent.name} · {p.parent.name}
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-600 shrink-0" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Browse by category */}
                <div className="p-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    Browse by category
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { slug: "entry", name: "Entry Permit" },
                      { slug: "trekking", name: "Trekking" },
                      { slug: "climbing", name: "Climbing" },
                      { slug: "special", name: "Special" },
                    ].map((cat) => {
                      const Icon = CATEGORY_ICONS[cat.slug] ?? FileText;
                      return (
                        <Link
                          key={cat.slug}
                          href={`/Nepal-Permits/${cat.slug}`}
                          onClick={closeAndClear}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:border-sky-300 hover:bg-sky-50 transition-colors"
                        >
                          <Icon className="w-4 h-4 text-sky-600" />
                          <span className="text-sm font-bold text-slate-700">
                            {cat.name}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* STATE: search results */}
            {!showRecommendations && hasResults && (
              <ul className="divide-y divide-slate-100">
                {results.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={r.url}
                      onClick={closeAndClear}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-sky-50 transition-colors group"
                    >
                      <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-sky-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-slate-900">
                          {r.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {r.categoryName}
                          {r.subcategoryName && ` · ${r.subcategoryName}`}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-sky-600 shrink-0">
                        View →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {/* STATE: no results */}
            {!showRecommendations && !hasResults && !loading && (
              <div className="p-8 text-center">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-sm text-slate-600">
                  No permits match &quot;{query}&quot;
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  Try: TIMS, Everest, ACAP, drone, visa
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}