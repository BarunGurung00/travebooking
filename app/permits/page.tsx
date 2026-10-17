import PoiCatalog from "@/app/components/PoiCatalog";

export const metadata = {
  title: "Nepal Visa & Trekking Permits | MyHimalayanTrip",
  description: "TIMS, national park, and trekking permit information.",
};

export default async function PermitsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <PoiCatalog
      category="permit"
      title="Visa, TIMS & trekking permits"
      description="National permits required for treks and park entry."
      q={q}
    />
  );
}
