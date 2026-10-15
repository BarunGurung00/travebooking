"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthButtons from "./components/AuthButtons";
import SearchBox from "./components/SearchBox";
import {
  Bus,
  MapPinHouse,
  Search,
  Mountain,
  Globe,
  ScrollText,
  Footprints,
  Map,
  HotelIcon
} from "lucide-react";

// ---------- Rating (unchanged) ----------
function RatingCircles({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`w-3.5 h-3.5 rounded-full inline-block border-2 border-sky-600 ${i < Math.round(rating) ? "bg-sky-600" : "bg-transparent"
              }`}
          />
        ))}
      </div>
      <span className="text-xs font-black text-slate-800 ml-0.5">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

// ---------- Tab Configuration ----------
type TabKey = "destinations" | "hotels" | "treks" | "transports" | "guides" | "permits";

type TabConfig = {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  heading: string;
  placeholder: string;
  fieldLabel: string;
  options: { value: string; label: string }[];
  route: string;
};

const TABS: TabConfig[] = [
  {
    key: "destinations",
    label: "Destinations",
    icon: MapPinHouse,
    heading: "Find your next Himalayan destination",
    placeholder: "Where to? Try 'Pokhara', 'Namche', 'Bandipur'...",
    fieldLabel: "Destination",
    options: [
      { value: "", label: "All Destinations" },
      { value: "kathmandu", label: "Kathmandu Valley" },
      { value: "pokhara", label: "Pokhara" },
      { value: "chitwan", label: "Chitwan" },
      { value: "lumbini", label: "Lumbini" },
      { value: "nagarkot", label: "Nagarkot" },
    ],
    route: "/Destinations",
  },
  {
    key: "hotels",
    label: "Hotels",
    icon: HotelIcon,
    heading: "Accommodations in this Area",
    placeholder: "Where to Stay? Try 'Guest Houses', 'Hotels', 'Airbnb'...",
    fieldLabel: "Hotels",
    options: [
      { value: "", label: "All Hotels" },
      { value: "kathmandu", label: "Kathmandu Valley" },
      { value: "pokhara", label: "Pokhara" },
      { value: "chitwan", label: "Chitwan" },
      { value: "lumbini", label: "Lumbini" },
      { value: "nagarkot", label: "Nagarkot" },
    ],
    route: "/Destinations",
  },
  {
    key: "treks",
    label: "Treks",
    icon: Footprints,
    heading: "Search trekking routes across Nepal",
    placeholder: "Search treks: Everest Base Camp, Annapurna, Langtang...",
    fieldLabel: "Region",
    options: [
      { value: "", label: "All Regions" },
      { value: "everest", label: "Everest (Khumbu)" },
      { value: "annapurna", label: "Annapurna Sanctuary" },
      { value: "langtang", label: "Langtang Valley" },
      { value: "manaslu", label: "Manaslu Circuit" },
      { value: "mustang", label: "Upper Mustang" },
    ],
    route: "/Treks",
  },
  {
    key: "transports",
    label: "Transports",
    icon: Bus,
    heading: "Book buses, flights & jeeps",
    placeholder: "From → To, e.g. 'Kathmandu to Pokhara'...",
    fieldLabel: "Route",
    options: [
      { value: "", label: "All Routes" },
      { value: "ktm-pkr", label: "Kathmandu → Pokhara" },
      { value: "ktm-lukla", label: "Kathmandu → Lukla" },
      { value: "pkr-jomsom", label: "Pokhara → Jomsom" },
      { value: "ktm-chitwan", label: "Kathmandu → Chitwan" },
    ],
    route: "/Transport",
  },
  {
    key: "guides",
    label: "Guides",
    icon: Map,
    heading: "Hire licensed trekking guides",
    placeholder: "Search guides by name, language or specialty...",
    fieldLabel: "Specialty",
    options: [
      { value: "", label: "All Specialties" },
      { value: "everest", label: "Everest Treks" },
      { value: "annapurna", label: "Annapurna Treks" },
      { value: "cultural", label: "Cultural Tours" },
      { value: "photography", label: "Photography Tours" },
    ],
    route: "/Guides",
  },
  {
    key: "permits",
    label: "Visa & Permits",
    icon: ScrollText,
    heading: "Nepal visa, TIMS & trekking permits",
    placeholder: "Search permits: TIMS, ACAP, Sagarmatha...",
    fieldLabel: "Permit Type",
    options: [
      { value: "", label: "All Permits" },
      { value: "tims", label: "TIMS Card" },
      { value: "acap", label: "ACAP Permit" },
      { value: "sagarmatha", label: "Sagarmatha National Park" },
      { value: "visa", label: "Nepal Tourist Visa" },
    ],
    route: "/permits",
  },
];

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("destinations");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");

  const currentTab = TABS.find((t) => t.key === activeTab)!;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (region) params.set("region", region);
    const qs = params.toString();
    router.push(`${currentTab.route}${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans flex flex-col">
      {/* 1. HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-sky-400 flex items-center justify-center text-white font-black shadow-sm">
              <Mountain className="w-5 h-5" />
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">My</span>
              <span className="bg-sky-400 text-white font-black text-lg px-2.5 py-0.5 rounded-lg italic mx-1 shadow-xs">
                Himalayan
              </span>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight mr-1.5">Trip</span>
              <span className="text-xs font-black text-sky-400 italic -ml-1">.com</span>
            </div>
          </Link>

          {/* <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
              <Globe className="w-4 h-4 text-slate-500" />
              <span>NPR / USD</span>
            </button>
            <div className="flex items-center cursor-pointer p-0.5 rounded-full border-2 border-sky-600 shadow-xs overflow-hidden hover:opacity-95 transition-all">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="User Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div> */}

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
              <Globe className="w-4 h-4 text-slate-500" />
              <span>NPR / USD</span>
            </button>
            <AuthButtons />
          </div>

        </div>
      </header>

      {/* 2. HERO + TRIPADVISOR-STYLE SEARCH */}
      <section className="bg-slate-600 text-white relative py-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-400 border border-sky-500/30 mb-3">
            Nepal's Official Travel & Treks Guide
          </span>

          {/* Main hero title */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Where to? Explore Nepal's <span className="text-sky-400">Himalayas</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Discover verified trekking teahouses, bus schedules, permits, and reviews.
          </p>

          {/* --- 1) DYNAMIC BIG HEADING (moved up, bigger) --- */}
          <h2 className="mt-10 mb-10 text-2xl sm:text-5xl font-black text-white drop-shadow-md tracking-tight">
            {currentTab.heading}
          </h2>

          {/* --- 2) TABS (below heading, above search box) --- */}
          <div className="mt-5 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full p-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      setRegion("");
                      setQuery("");
                    }}
                    className={`flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-full transition-all ${isActive
                      ? "bg-white text-sky-700 shadow-sm"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* --- 3) SEARCH BOX (slightly smaller / more compact) --- */}
          {/* <div className="mt-6 bg-white rounded-full p-1.5 shadow-2xl text-slate-800 max-w-2xl mx-auto border border-slate-100"> */}
          {/* <div className="flex flex-col sm:flex-row items-stretch gap-1.5"> */}
          {/* Optional dropdown (region/route/etc.) */}
          {/* <div className="hidden sm:flex items-center gap-2 pl-4 pr-2 border-r border-slate-200 shrink-0">
                <currentTab.icon className="w-4 h-4 text-sky-600" />
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer py-2 max-w-[130px]"
                >
                  {currentTab.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div> */}

          {/* Text input */}
          {/* <div className="flex items-center flex-1 px-3">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder={currentTab.placeholder}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none py-2.5 px-2"
                />
              </div> */}

          {/* Search button */}
          {/* <button
                onClick={handleSearch}
                className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm px-5 py-2.5 rounded-full shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button> */}
          {/* </div> */}
          {/* </div> */}

          <div className="mt-6">
            <SearchBox />
          </div>

          {/* Helper text */}
          <p className="mt-3 text-[11px] text-white/60 font-medium">
            Popular: Everest Base Camp · Annapurna Circuit · Kathmandu → Pokhara
          </p>
        </div>
      </section>

      {/* 3. VIDEO CAROUSEL — unchanged */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider">
              Visual Guides
            </span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Experience the Trails Before You Go
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Scroll right &rarr;</span>
        </div>

        <div className="w-full overflow-x-auto pb-4 flex gap-5 scrollbar-thin scrollbar-thumb-slate-200">
          {/* ...keep your existing 3 video cards exactly as they were... */}
        </div>
      </section>

      {/* 4. FEATURED DIRECTORY GRID — unchanged */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {/* ...keep your existing 3 item cards exactly as they were... */}
      </section>

      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-auto">
        <p>
          &copy; {new Date().getFullYear()} MyHimalayanTrip.com All rights reserved. Built
          for travelers across the Himalayas.
        </p>
      </footer>
    </div>
  );
}



