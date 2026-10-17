"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User, Calendar, Map, Heart, LogOut } from "lucide-react";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (status === "loading") {
    return <div className="w-20 h-8 rounded-full bg-slate-200 animate-pulse" />;
  }

  // ─── Logged in: avatar + dropdown ───
  if (session?.user) {
    const initial = (
      session.user.name?.[0] ||
      session.user.email?.[0] ||
      "U"
    ).toUpperCase();

    return (
      <div ref={ref} className="relative">
        {/* Avatar trigger */}
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full border-2 border-sky-600 overflow-hidden hover:opacity-90 transition-opacity"
          aria-label="Open user menu"
        >
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="User"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-sky-600 text-white font-black flex items-center justify-center text-xs">
              {initial}
            </div>
          )}
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50">
            {/* User info header */}
            <div className="px-4 py-3 border-b border-slate-100">
              <div className="font-extrabold text-sm text-slate-900 truncate">
                {session.user.name || "User"}
              </div>
              <div className="text-xs text-slate-500 truncate">
                {session.user.email}
              </div>
            </div>

            {/* Items */}
            <Link
              href="/Profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              <User className="w-4 h-4" />
              Profile
            </Link>

            <Link
              href="/Bookings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Bookings
            </Link>

            <Link
              href="/Trips"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              <Map className="w-4 h-4" />
              Trips
            </Link>

            <Link
              href="/Wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700 transition-colors"
            >
              <Heart className="w-4 h-4" />
              Wishlist
            </Link>

            {/* Sign out */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 border-t border-slate-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  // ─── Logged out: login / signup ───
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className="text-xs font-bold text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="text-xs font-extrabold text-white bg-sky-600 hover:bg-sky-700 px-4 py-1.5 rounded-full transition-colors"
      >
        Sign up
      </Link>
    </div>
  );
}