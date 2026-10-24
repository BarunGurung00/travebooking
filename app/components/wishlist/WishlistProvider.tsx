"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useSession } from "next-auth/react";

type WishlistContextType = {
  savedIds: Set<number>;
  loading: boolean;
  toggle: (poiId: number) => Promise<void>;
  isSaved: (poiId: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status !== "authenticated") {
      setSavedIds(new Set());
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch("/api/wishlist/ids")
      .then((r) => r.json())
      .then((data) => {
        setSavedIds(new Set(data.ids ?? []));
      })
      .catch((err) => {
        console.error("Failed to load wishlist:", err);
      })
      .finally(() => setLoading(false));
  }, [status]);

  const toggle = useCallback(
    async (poiId: number) => {
      const wasSaved = savedIds.has(poiId);

      // Optimistic update
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (wasSaved) {
          next.delete(poiId);
        } else {
          next.add(poiId);
        }
        return next;
      });

      try {
        if (wasSaved) {
          await fetch(`/api/wishlist/${poiId}`, { method: "DELETE" });
        } else {
          await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ poiId }),
          });
        }
      } catch (err) {
        // Revert on failure
        console.error("Wishlist toggle failed:", err);
        setSavedIds((prev) => {
          const next = new Set(prev);
          if (wasSaved) {
            next.add(poiId);
          } else {
            next.delete(poiId);
          }
          return next;
        });
      }
    },
    [savedIds]
  );

  const isSaved = useCallback(
    (poiId: number) => savedIds.has(poiId),
    [savedIds]
  );

  return (
    <WishlistContext.Provider value={{ savedIds, loading, toggle, isSaved }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return ctx;
}