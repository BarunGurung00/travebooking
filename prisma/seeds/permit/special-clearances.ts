import { PrismaClient } from "@prisma/client";

export async function seedSpecialClearances(prisma: PrismaClient) {
  console.log("🌱 Seeding Special Clearances...\n");

  const droneSub = await prisma.permit.findFirst({
    where: { slug: "drone", type: "subcategory" },
  });
  const filmingSub = await prisma.permit.findFirst({
    where: { slug: "filming", type: "subcategory" },
  });
  const heritageSub = await prisma.permit.findFirst({
    where: { slug: "heritage", type: "subcategory" },
  });
  const adventureSub = await prisma.permit.findFirst({
    where: { slug: "adventure", type: "subcategory" },
  });
  if (!droneSub || !filmingSub || !heritageSub || !adventureSub) {
    throw new Error("❌ Special subcategories missing. Run categories first.");
  }

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: droneSub.id, slug: "caan-moha-drone-clearance" } },
    update: { name: "CAAN & MoHA Drone Operations Permit" },
    create: {
      parentId: droneSub.id,
      type: "permit",
      name: "CAAN & MoHA Drone Operations Permit",
      slug: "caan-moha-drone-clearance",
      description: "Multi-agency permit required for operating unmanned aerial vehicles (UAVs) in Nepal.",
      displayOrder: 1,
      quickSummary: [
        { label: "Who", value: "Drone pilots & content creators" },
        { label: "Cost", value: "Varies by Drone Category" },
        { label: "Where", value: "CAAN, MoHA & DNPWC" },
      ],
      costDetails: [{ label: "Clearance Fee", value: "Category Dependent" }],
      whereToGet: ["CAAN Babarmahal, Ministry of Home Affairs, and local District Administration Offices"],
      documents: ["Drone manual & serial number", "Flight plan", "Passport copy", "Security clearance"],
      validity: "Duration of requested itinerary",
      notes: "Strictly prohibited over heritage sites, military areas, and near airports.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: filmingSub.id, slug: "national-filming-permit" } },
    update: { name: "Ministry of Information National Filming Permit" },
    create: {
      parentId: filmingSub.id,
      type: "permit",
      name: "Ministry of Information National Filming Permit",
      slug: "national-filming-permit",
      description: "Permit required for documentary, commercial, or feature film production in Nepal.",
      displayOrder: 1,
      quickSummary: [
        { label: "Who", value: "Commercial film crews" },
        { label: "Cost", value: "NPR 15,000–NPR 150,000" },
        { label: "Where", value: "Ministry of Information & Communications" },
      ],
      costDetails: [{ label: "Standard Documentary Fee", value: "NPR 15,000" }],
      whereToGet: ["Ministry of Information and Communications (MoIC), Singha Durbar"],
      documents: ["Synopsis", "Crew details", "Equipment list", "Local coordinator letter"],
      validity: "Project period",
      notes: "Requires assignment of a government liaison officer during filming.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: heritageSub.id, slug: "unesco-heritage-entry-ticket" } },
    update: { name: "UNESCO Heritage Site & Monument Entry Tickets" },
    create: {
      parentId: heritageSub.id,
      type: "permit",
      name: "UNESCO Heritage Site & Monument Entry Tickets",
      slug: "unesco-heritage-entry-ticket",
      description: "Entry passes for cultural heritage zones across Kathmandu Valley, Lumbini, and Janakpur.",
      displayOrder: 1,
      quickSummary: [
        { label: "Who", value: "Sightseeing tourists" },
        { label: "Cost", value: "NPR 1,000–NPR 1,800" },
        { label: "Where", value: "Site Entrance Counters" },
      ],
      costDetails: [
        { label: "Kathmandu / Patan Durbar Sq", value: "NPR 1,000" },
        { label: "Bhaktapur Durbar Sq", value: "NPR 1,800" },
        { label: "Boudhanath / Swayambhunath", value: "NPR 400" },
      ],
      whereToGet: ["On-site ticket counters managed by local municipalities"],
      documents: ["Passport"],
      validity: "Single day ticket",
      notes: "Discounts apply for SAARC nationals.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: adventureSub.id, slug: "adventure-sports-authorization" } },
    update: { name: "Adventure Sports Operating Clearances" },
    create: {
      parentId: adventureSub.id,
      type: "permit",
      name: "Adventure Sports Operating Clearances",
      slug: "adventure-sports-authorization",
      description: "Regulatory clearances for paragliding, rafting, ultralight flights, bungee jumping, and skydiving.",
      displayOrder: 1,
      quickSummary: [
        { label: "Who", value: "Adventure sports participants" },
        { label: "Cost", value: "Included in commercial activity vendor fee" },
        { label: "Where", value: "CAAN / MoCTCA via Licensed Operators" },
      ],
      costDetails: [{ label: "Regulatory Fee", value: "Bundled with activity operator" }],
      whereToGet: ["Authorized and licensed adventure sports operators"],
      documents: ["Passport", "Liability waiver"],
      validity: "Per activity flight/session",
      notes: "Ensure operator holds valid CAAN / MoCTCA license.",
      relatedSlugs: [],
    },
  });

  console.log("✅ Special Clearances synced.");
}