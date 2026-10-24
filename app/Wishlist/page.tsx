import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Heart } from "lucide-react";
import { prisma } from "@/lib/prisma";
import WishlistCard from "@/app/components/wishlist/WishlistCard";

export default async function WishlistPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/wishlist");
  }

  const items = await prisma.wishlist.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      poi: {
        include: {
          geo: {
            select: { geoId: true, name: true, slug: true },
          },
        },
      },
    },
  });

  const formatted = items.map((w) => {
    const catTitle =
      w.poi.category.charAt(0).toUpperCase() + w.poi.category.slice(1);
    return {
      id: w.id,
      poiId: w.poi.poiId,
      name: w.poi.name,
      slug: w.poi.slug,
      category: w.poi.category,
      price: w.poi.price,
      rating: w.poi.rating,
      geoName: w.poi.geo.name,
      url: `/${catTitle}_Review-g${w.poi.geo.geoId}-d${w.poi.poiId}-${w.poi.slug}`,
      savedAt: w.createdAt.toISOString(),
    };
  });

  return (
    <div className="flex-1 flex flex-col">
      <div className="max-w-5xl mx-auto px-4 py-12 flex-1 flex flex-col">
        <div className="mb-6 text-xs">
          <Link
            href="/profile"
            className="text-slate-500 hover:text-sky-600"
          >
            ← Back to profile
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          <h1 className="text-3xl font-black text-slate-900">
            My Wishlist
          </h1>
          {formatted.length > 0 && (
            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
              {formatted.length} item{formatted.length === 1 ? "" : "s"}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-500 mb-8">
          Saved places, treks, and hotels you want to visit later.
        </p>

        {formatted.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h2 className="text-lg font-extrabold text-slate-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Save treks, hotels, and places you want to visit later.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/Treks"
                className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                Explore treks
              </Link>
              <Link
                href="/Nepal-Permits"
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-extrabold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                Browse permits
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {formatted.map((item) => (
              <WishlistCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}