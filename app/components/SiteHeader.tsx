"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mountain } from "lucide-react";
import AuthButtons from "./AuthButtons";

const NAV = [
  { href: "/Destinations", label: "Destinations" },
  { href: "/Treks", label: "Treks" },
  { href: "/Hotels", label: "Hotels" },
  { href: "/Transport", label: "Transport" },
  { href: "/Guides", label: "Guides" },
  { href: "/permits", label: "Permits" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-sky-600 flex items-center justify-center text-white font-black">
            <Mountain className="w-5 h-5" />
          </div>
          <div className="flex items-baseline">
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              My
            </span>
            <span className="bg-sky-600 text-white font-black text-lg px-2.5 py-0.5 rounded-lg italic mx-1">
              Himalayan
            </span>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight mr-1.5">
              Trip
            </span>
            <span className="text-xs font-black text-sky-600 italic -ml-1">
              .com
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((item) => {
            const active =
              pathname.toLowerCase() === item.href.toLowerCase();
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                  active
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-700 hover:text-sky-600 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <AuthButtons />
      </div>
    </header>
  );
}
