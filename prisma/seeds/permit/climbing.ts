import { PrismaClient } from "@prisma/client";

export async function seedClimbing(prisma: PrismaClient) {
  console.log("🌱 Seeding Climbing Permits...\n");

  const trekkingPeaksSub = await prisma.permit.findFirst({
    where: { slug: "trekking-peaks", type: "subcategory" },
  });
  const expeditionPeaksSub = await prisma.permit.findFirst({
    where: { slug: "expedition-peaks", type: "subcategory" },
  });
  if (!trekkingPeaksSub || !expeditionPeaksSub) {
    throw new Error("❌ Climbing subcategories missing. Run categories first.");
  }

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekkingPeaksSub.id, slug: "nma-group-a-peaks" } },
    update: { name: "NMA Group A Technical Trekking Peaks" },
    create: {
      parentId: trekkingPeaksSub.id,
      type: "permit",
      name: "NMA Group A Technical Trekking Peaks",
      slug: "nma-group-a-peaks",
      description: "Permits for 15 Group A technical climbing peaks managed by the Nepal Mountaineering Association.",
      displayOrder: 1,
      quickSummary: [
        { label: "Who", value: "Climbers (5,800m–6,500m)" },
        { label: "Cost", value: "$400 Spring | $200 Autumn" },
        { label: "Where", value: "NMA via Agency" },
      ],
      costDetails: [
        { label: "Spring (1-7 Climbers)", value: "$400" },
        { label: "Autumn (1-7 Climbers)", value: "$200" },
      ],
      whereToGet: ["Nepal Mountaineering Association (NMA), Naxal, Kathmandu"],
      documents: ["Passport copy", "Climbing guide license", "Insurance details"],
      validity: "1 month per season",
      notes: "Garbage deposit of $500 required.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekkingPeaksSub.id, slug: "nma-group-b-peaks" } },
    update: { name: "NMA Group B Trekking Peaks" },
    create: {
      parentId: trekkingPeaksSub.id,
      type: "permit",
      name: "NMA Group B Trekking Peaks",
      slug: "nma-group-b-peaks",
      description: "Permits for 12 Group B trekking peaks (e.g., Island Peak, Mera Peak, Lobuche East) managed by NMA.",
      displayOrder: 2,
      quickSummary: [
        { label: "Who", value: "Climbers (5,500m–6,500m)" },
        { label: "Cost", value: "$250 Spring | $125 Autumn" },
        { label: "Where", value: "NMA via Agency" },
      ],
      costDetails: [
        { label: "Spring (1-7 Climbers)", value: "$250" },
        { label: "Autumn (1-7 Climbers)", value: "$125" },
      ],
      whereToGet: ["Nepal Mountaineering Association (NMA), Naxal, Kathmandu"],
      documents: ["Passport copy", "Insurance details", "Registered guide"],
      validity: "1 month per season",
      notes: "Garbage deposit of $250 required.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: expeditionPeaksSub.id, slug: "moctca-expedition-royalty" } },
    update: { name: "MoCTCA Expedition Peak Royalties" },
    create: {
      parentId: expeditionPeaksSub.id,
      type: "permit",
      name: "MoCTCA Expedition Peak Royalties",
      slug: "moctca-expedition-royalty",
      description: "Official government royalties for major peaks over 6,500m including Mt. Everest and 8,000m peaks.",
      displayOrder: 1,
      quickSummary: [
        { label: "Who", value: "High-altitude mountaineers" },
        { label: "Cost", value: "$500 to $15,000" },
        { label: "Where", value: "Department of Tourism (DoT)" },
      ],
      costDetails: [
        { label: "Mt. Everest (Spring Normal Route)", value: "$15,000 per foreign climber" },
        { label: "Other 8,000m Peaks (Spring)", value: "$3,000 per foreign climber" },
        { label: "7,501m–7,999m Peaks", value: "$1,000 Spring" },
        { label: "Ama Dablam (Special Royalty)", value: "$1,000" },
      ],
      whereToGet: ["Department of Tourism (DoT), Ministry of Culture, Tourism and Civil Aviation"],
      documents: ["Medical certificates", "Liaison Officer deployment", "Insurance", "Expedition plan"],
      validity: "75 days for Everest, 60 days for other 8,000m peaks",
      notes: "Requires mandatory government Liaison Officer and garbage deposit.",
      relatedSlugs: [],
    },
  });

  console.log("✅ 3 Climbing permits synced.");
}