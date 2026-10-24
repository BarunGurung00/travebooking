"use client";

import Link from "next/link";
import { Mountain, Globe } from "lucide-react";
import AuthButtons from "./AuthButtons";

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer shrink-0">
          <div className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center text-white font-black shadow-sm">
            <Mountain className="w-5 h-5" />
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">My</span>
            <span className="bg-sky-600 text-white font-black text-lg px-2.5 py-0.5 rounded-lg italic mx-1 shadow-xs">
              Himalayan
            </span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight mr-1.5">Trip</span>
            <span className="text-xs font-black text-sky-600 italic -ml-1">.com</span>
          </div>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/Destinations" className="text-sm font-bold text-slate-700 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Destinations</Link>
          <Link href="/Hotels" className="text-sm font-bold text-slate-700 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Hotels</Link>
          <Link href="/Treks" className="text-sm font-bold text-slate-700 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Treks</Link>
          <Link href="/Transport" className="text-sm font-bold text-slate-700 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Transport</Link>
          <Link href="/Guides" className="text-sm font-bold text-slate-700 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Guides</Link>
          <Link href="/Nepal-Permits" className="text-sm font-bold text-slate-700 hover:text-sky-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">Permits</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors">
            <Globe className="w-4 h-4 text-slate-500" />
            <span>NPR / USD</span>
          </button>
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}