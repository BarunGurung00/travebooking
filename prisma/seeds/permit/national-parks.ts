import { PrismaClient } from "@prisma/client";

export async function seedNationalParks(prisma: PrismaClient) {
  console.log("🌱 Seeding National Parks & Protected Areas...\n");

  const protectedSub = await prisma.permit.findFirst({
    where: { slug: "protected-area", type: "subcategory" },
  });
  if (!protectedSub) {
    throw new Error("❌ Protected area subcategory missing. Run categories first.");
  }

  const protectedAreas = [
    { slug: "sagarmatha-national-park", name: "Sagarmatha National Park Permit", order: 1, fee: "NPR 3,000" },
    { slug: "annapurna-conservation-area", name: "Annapurna Conservation Area Permit (ACAP)", order: 2, fee: "NPR 3,000" },
    { slug: "langtang-national-park", name: "Langtang National Park Permit", order: 3, fee: "NPR 3,000" },
    { slug: "chitwan-national-park", name: "Chitwan National Park Permit", order: 4, fee: "NPR 2,000" },
    { slug: "makalu-barun-national-park", name: "Makalu Barun National Park Permit", order: 5, fee: "NPR 3,000" },
    { slug: "shey-phoksundo-national-park", name: "Shey Phoksundo National Park Permit", order: 6, fee: "NPR 3,000" },
    { slug: "bardia-national-park", name: "Bardia National Park Permit", order: 7, fee: "NPR 1,500" },
    { slug: "shivapuri-nagarjun-national-park", name: "Shivapuri Nagarjun National Park Permit", order: 8, fee: "NPR 1,000" },
    { slug: "kanchenjunga-conservation-area", name: "Kanchenjunga Conservation Area Permit (KCAP)", order: 9, fee: "NPR 2,000" },
    { slug: "manaslu-conservation-area", name: "Manaslu Conservation Area Permit (MCAP)", order: 10, fee: "NPR 3,000" },
    { slug: "gaurishankar-conservation-area", name: "Gaurishankar Conservation Area Permit", order: 11, fee: "NPR 3,000" },
    { slug: "api-nampa-conservation-area", name: "Api Nampa Conservation Area Permit", order: 12, fee: "NPR 2,000" },
    { slug: "blackbuck-conservation-area", name: "Blackbuck Conservation Area Permit", order: 13, fee: "NPR 500" },
    { slug: "rara-national-park", name: "Rara National Park Permit", order: 14, fee: "NPR 3,000" },
    { slug: "khaptad-national-park", name: "Khaptad National Park Permit", order: 15, fee: "NPR 1,500" },
    { slug: "banke-national-park", name: "Banke National Park Permit", order: 16, fee: "NPR 1,500" },
    { slug: "parsa-national-park", name: "Parsa National Park Permit", order: 17, fee: "NPR 1,500" },
    { slug: "suklaphanta-national-park", name: "Suklaphanta National Park Permit", order: 18, fee: "NPR 1,500" },
    { slug: "koshi-tappu-wildlife-reserve", name: "Koshi Tappu Wildlife Reserve Permit", order: 19, fee: "NPR 1,500" },
    { slug: "dhorpatan-hunting-reserve", name: "Dhorpatan Hunting Reserve Permit", order: 20, fee: "NPR 3,000" },
  ];

  for (const pa of protectedAreas) {
    await prisma.permit.upsert({
      where: { parentId_slug: { parentId: protectedSub.id, slug: pa.slug } },
      update: { name: pa.name },
      create: {
        parentId: protectedSub.id,
        type: "permit",
        name: pa.name,
        slug: pa.slug,
        description: `Official entry permit for ${pa.name}.`,
        displayOrder: pa.order,
        quickSummary: [
          { label: "Who", value: "Visitors & Trekkers" },
          { label: "Cost", value: pa.fee },
          { label: "Where", value: "NTB Kathmandu or Park Gate" },
        ],
        costDetails: [{ label: "Foreigner Fee", value: pa.fee }],
        whereToGet: ["Nepal Tourism Board (NTB), Kathmandu/Pokhara", "Authorized Park Checkpoints"],
        documents: ["Passport", "Visa Copy"],
        validity: "Single Entry / Duration of Trek",
        notes: "Managed under the Department of National Parks and Wildlife Conservation (DNPWC).",
        relatedSlugs: [],
      },
    });
  }

  console.log(`✅ ${protectedAreas.length} Protected Area permits synced.`);
}