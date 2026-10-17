import PoiCatalog from "@/app/components/PoiCatalog";

export const metadata = {
  title: "Licensed Trekking Guides | MyHimalayanTrip",
  description: "Hire licensed guides by region and specialty.",
};

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <PoiCatalog
      category="guide"
      title="Licensed trekking guides"
      description="Guides operating from Everest, Annapurna, and other hubs."
      q={q}
    />
  );
}
