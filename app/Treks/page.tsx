import PoiCatalog from "@/app/components/PoiCatalog";

export const metadata = {
  title: "Himalayan Trekking Directory | MyHimalayanTrip",
  description: "Browse trekking itineraries and trails across Nepal.",
};

export default async function TreksPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <PoiCatalog
      category="trek"
      title="Himalayan treks & hiking routes"
      description="Compare routes, prices, and traveler ratings across Nepal."
      q={q}
    />
  );
}
