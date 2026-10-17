import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { sectionUrl } from "@/lib/geo";

export const metadata = {
  title: "Top Destinations in Nepal | MyHimalayanTrip",
  description: "Explore cities and travel hubs across Nepal.",
};

export default async function DestinationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const cities = await prisma.geo.findMany({
    where: {
      type: "city",
      ...(query.length >= 2 ? { name: { contains: query } } : {}),
    },
    orderBy: { name: "asc" },
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <h1 className="text-3xl font-black text-slate-900">
        Explore Nepal destinations
      </h1>
      <p className="text-sm text-slate-500 mt-2">
        Cities and hubs with treks, hotels, and transport nearby.
      </p>

      {cities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {cities.map((city) => (
            <Link
              key={city.geoId}
              href={sectionUrl("Tourism", city)}
              className="border border-slate-200 rounded-2xl p-5 bg-white hover:border-sky-300 transition-colors"
            >
              <p className="text-[10px] font-black uppercase tracking-wider text-sky-600">
                {city.type}
              </p>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                {city.name}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Open the {city.name} guide
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 mt-8">No destinations matched.</p>
      )}
    </main>
  );
}
