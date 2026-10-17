import PoiCatalog from "@/app/components/PoiCatalog";

export const metadata = {
  title: "Hotels & Lodges in Nepal | MyHimalayanTrip",
  description: "Find guest houses, lodges, and hotels across Nepal.",
};

export default async function HotelsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <PoiCatalog
      category="hotel"
      title="Hotels, lodges & guest houses"
      description="Stay listings from Thamel to Namche Bazaar."
      q={q}
    />
  );
}
