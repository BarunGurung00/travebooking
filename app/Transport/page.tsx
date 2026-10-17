import PoiCatalog from "@/app/components/PoiCatalog";

export const metadata = {
  title: "Nepal Highway & Tourist Bus Schedules | MyHimalayanTrip",
  description: "Tourist buses, private jeeps, and flight routes across Nepal.",
};

export default async function TransportPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <PoiCatalog
      category="transport"
      title="Tourist bus & transport routes"
      description="Highway buses and mountain flights connecting major hubs."
      q={q}
    />
  );
}
