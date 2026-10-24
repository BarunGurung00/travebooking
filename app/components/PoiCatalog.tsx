import { prisma } from "@/lib/prisma";
import PoiCard from "./poi/PoiCard";

export default async function PoiCatalog({
  category,
  title,
  description,
  q,
}: {
  category: string;
  title: string;
  description: string;
  q?: string;
}) {
  const query = q?.trim() ?? "";
  const pois = await prisma.poi.findMany({
    where: {
      category,
      ...(query.length >= 2 ? { name: { contains: query } } : {}),
    },
    include: { geo: true },
    orderBy: [{ rating: "desc" }, { poiId: "asc" }],
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
      <h1 className="text-3xl font-black text-slate-900">{title}</h1>
      <p className="text-sm text-slate-500 mt-2">{description}</p>
      {query.length >= 2 && (
        <p className="text-xs text-slate-400 mt-1">
          Filtered by “{query}” · {pois.length}{" "}
          {pois.length === 1 ? "result" : "results"}
        </p>
      )}

      {pois.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {pois.map((poi) => (
            <PoiCard key={poi.poiId} poi={poi} />
          ))}
        </div>
      ) : (
        <div className="mt-8 bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
          <h2 className="text-lg font-extrabold text-slate-900">
            No {category} listings yet
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Try a different search or browse another section.
          </p>
        </div>
      )}
    </main>
  );
}
