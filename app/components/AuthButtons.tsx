"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-20 h-8 rounded-full bg-slate-200 animate-pulse" />;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold text-slate-700 hidden sm:inline">
          {session.user.name || session.user.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="text-xs font-bold text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
        >
          Log out
        </button>
        <div className="w-8 h-8 rounded-full bg-sky-600 text-white font-black flex items-center justify-center text-xs border-2 border-sky-600">
          {(session.user.name?.[0] || session.user.email?.[0] || "U").toUpperCase()}
        </div>
      </div>
    );
  }

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