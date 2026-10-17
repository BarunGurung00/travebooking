"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBox from "./components/SearchBox";
import {
  Bus,
  MapPinHouse,
  ScrollText,
  Footprints,
  Map,
  HotelIcon,
} from "lucide-react";

type TabKey =
  | "destinations"
  | "hotels"
  | "treks"
  | "transports"
  | "guides"
  | "permits";

type TabConfig = {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  heading: string;
  route: string;
};

const TABS: TabConfig[] = [
  {
    key: "destinations",
    label: "Destinations",
    icon: MapPinHouse,
    heading: "Find your next Himalayan destination",
    route: "/Destinations",
  },
  {
    key: "hotels",
    label: "Hotels",
    icon: HotelIcon,
    heading: "Accommodations across Nepal",
    route: "/Hotels",
  },
  {
    key: "treks",
    label: "Treks",
    icon: Footprints,
    heading: "Search trekking routes across Nepal",
    route: "/Treks",
  },
  {
    key: "transports",
    label: "Transports",
    icon: Bus,
    heading: "Book buses, flights & jeeps",
    route: "/Transport",
  },
  {
    key: "guides",
    label: "Guides",
    icon: Map,
    heading: "Hire licensed trekking guides",
    route: "/Guides",
  },
  {
    key: "permits",
    label: "Visa & Permits",
    icon: ScrollText,
    heading: "Nepal visa, TIMS & trekking permits",
    route: "/permits",
  },
];

const DIRECTORY = [
  {
    href: "/Destinations",
    title: "Destinations",
    copy: "Cities and hubs from Kathmandu to Namche.",
  },
  {
    href: "/Treks",
    title: "Treks",
    copy: "Everest, Annapurna, Mustang, and more.",
  },
  {
    href: "/Hotels",
    title: "Hotels",
    copy: "Lodges and guest houses on the trail.",
  },
  {
    href: "/Transport",
    title: "Transport",
    copy: "Tourist buses and mountain flights.",
  },
  {
    href: "/Guides",
    title: "Guides",
    copy: "Licensed guides by region.",
  },
  {
    href: "/permits",
    title: "Permits",
    copy: "TIMS and national park entry.",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>("destinations");
  const currentTab = TABS.find((t) => t.key === activeTab)!;

  return (
    <div className="flex flex-col">
      <section className="bg-slate-600 text-white relative py-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold bg-sky-500/20 text-sky-400 border border-sky-500/30 mb-3">
            Nepal&apos;s Official Travel & Treks Guide
          </span>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Where to? Explore Nepal&apos;s{" "}
            <span className="text-sky-400">Himalayas</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            Discover verified trekking teahouses, bus schedules, permits, and
            reviews.
          </p>

          <h2 className="mt-10 mb-10 text-2xl sm:text-5xl font-black text-white drop-shadow-md tracking-tight">
            {currentTab.heading}
          </h2>

          <div className="mt-5 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-full p-1">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 text-xs font-black px-4 py-2 rounded-full transition-all ${
                      isActive
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

          <div className="mt-6">
            <SearchBox />
          </div>

          <p className="mt-3 text-[11px] text-white/60 font-medium">
            Popular: Everest Base Camp · Annapurna Circuit · Kathmandu → Pokhara
          </p>
          <Link
            href={currentTab.route}
            className="inline-block mt-4 text-xs font-extrabold text-sky-300 hover:text-white"
          >
            Browse all {currentTab.label.toLowerCase()} →
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <span className="text-xs font-extrabold text-sky-600 uppercase tracking-wider">
          Directories
        </span>
        <h2 className="text-2xl font-black text-slate-900 mt-1 mb-6">
          Plan the trail, stay, and permits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIRECTORY.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-sky-300 transition-colors"
            >
              <h3 className="font-extrabold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{item.copy}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
