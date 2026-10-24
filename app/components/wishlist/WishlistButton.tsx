"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useWishlist } from "./WishlistProvider";
import { useState } from "react";

export default function WishlistButton({
  poiId,
  size = "md",
}: {
  poiId: number;
  size?: "sm" | "md" | "lg";
}) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { isSaved, toggle, loading } = useWishlist();
  const [working, setWorking] = useState(false);

  const saved = isSaved(poiId);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    setWorking(true);
    await toggle(poiId);
    setWorking(false);
  }

  if (loading) {
    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-white/90 shadow-md flex items-center justify-center`}
      >
        <div className="w-3 h-3 border-2 border-slate-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={working}
      className={`${sizeClasses[size]} rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-all hover:scale-105 ${
        working ? "opacity-60" : ""
      }`}
      aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
    >
      <Heart
        className={`${iconSizes[size]} transition-colors ${
          saved ? "fill-red-500 text-red-500" : "text-slate-600"
        }`}
      />
    </button>
  );
}