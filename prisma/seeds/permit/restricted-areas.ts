import { PrismaClient } from "@prisma/client";

export async function seedRestrictedAreas(prisma: PrismaClient) {
  console.log("🌱 Seeding Restricted Area Permits...\n");

  const restrictedSub = await prisma.permit.findFirst({
    where: { slug: "restricted-area", type: "subcategory" },
  });
  if (!restrictedSub) {
    throw new Error("❌ Restricted area subcategory missing. Run categories first.");
  }

  const restrictedPermits = [
    { slug: "upper-mustang", name: "Upper Mustang Restricted Area Permit", cost: "$500/10 days ($50/day extra)", order: 1 },
    { slug: "manaslu", name: "Manaslu Region (Nubri Valley) Restricted Area Permit", cost: "$100/week (Autumn) | $75/week (Winter-Summer)", order: 2 },
    { slug: "tsum-valley", name: "Tsum Valley Restricted Area Permit", cost: "$40/week (Autumn) | $30/week (Winter-Summer)", order: 3 },
    { slug: "upper-dolpo", name: "Upper Dolpo Restricted Area Permit", cost: "$500/10 days ($50/day extra)", order: 4 },
    { slug: "lower-dolpo", name: "Lower Dolpo Restricted Area Permit", cost: "$20/week", order: 5 },
    { slug: "kanchenjunga", name: "Kanchenjunga Region Restricted Area Permit", cost: "$20/week", order: 6 },
    { slug: "taplejung-north", name: "Taplejung / Kanchenjunga North (Olangchung Gola) RAP", cost: "$20/week", order: 7 },
    { slug: "humla-limi", name: "Humla Region (Simikot / Limi Valley) RAP", cost: "$50/week", order: 8 },
    { slug: "nar-phu-valley", name: "Nar Phu Valley Restricted Area Permit", cost: "$100/week (Autumn) | $75/week (Winter-Summer)", order: 9 },
    { slug: "rasuwa-border", name: "Rasuwa Region (North/Border Areas) RAP", cost: "$20/week", order: 10 },
    { slug: "sankhuwasabha-kimathanka", name: "Sankhuwasabha Region (Upper Makalu / Kimathanka) RAP", cost: "$20/week (first 4 weeks)", order: 11 },
    { slug: "dolakha-lapchi", name: "Dolakha Region (Lapchi / Bedding Area) RAP", cost: "$20/week", order: 12 },
    { slug: "bajhang-saipal", name: "Bajhang Region (Saipal Area) RAP", cost: "$90/week (first week)", order: 13 },
    { slug: "mugu-karmarong", name: "Mugu Region (Mugum Karmarong Area) RAP", cost: "$90/week (first week)", order: 14 },
    { slug: "darchula-byas", name: "Darchula Region (Byas Area) RAP", cost: "$90/week (first week)", order: 15 },
  ];

  for (const rap of restrictedPermits) {
    await prisma.permit.upsert({
      where: { parentId_slug: { parentId: restrictedSub.id, slug: rap.slug } },
      update: {
        name: rap.name,
        costDetails: [{ label: "Permit Fee", value: rap.cost }],
        notes: "Solo treks allowed (with guide), but agency booking is mandatory.",
      },
      create: {
        parentId: restrictedSub.id,
        type: "permit",
        name: rap.name,
        slug: rap.slug,
        description: `Official restricted area permit issued by the Department of Immigration for ${rap.name}.`,
        displayOrder: rap.order,
        quickSummary: [
          { label: "Who", value: "Trekkers in restricted zones" },
          { label: "Cost", value: rap.cost },
          { label: "Where", value: "Dept. of Immigration via Agency" },
        ],
        costDetails: [{ label: "Permit Fee", value: rap.cost }],
        whereToGet: ["Department of Immigration, Kathmandu (via registered agency only)"],
        documents: ["Passport with valid visa", "Agency guarantee letter", "Itinerary", "Photos"],
        validity: "Time-bound per application",
        notes: "Solo treks allowed (with guide), but agency booking is mandatory.",
        relatedSlugs: [],
      },
    });
  }

  console.log(`✅ ${restrictedPermits.length} Restricted Area Permits synced.`);
}