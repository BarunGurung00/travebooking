import { PrismaClient } from "@prisma/client";

export async function seedVisaTims(prisma: PrismaClient) {
  console.log("🌱 Seeding Tourist Visa & E-TIMS...\n");

  const visaSub = await prisma.permit.findFirst({
    where: { slug: "tourist-visa", type: "subcategory" },
  });
  const timsSub = await prisma.permit.findFirst({
    where: { slug: "tims", type: "subcategory" },
  });

  if (!visaSub || !timsSub) {
    throw new Error("❌ Visa/TIMS subcategories missing. Run categories first.");
  }

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: visaSub.id, slug: "tourist-visa" } },
    update: {
      name: "Tourist Visa",
      description: "Required for all foreign visitors entering Nepal.",
      costDetails: [
        { label: "15 days", value: "$30" },
        { label: "30 days", value: "$50" },
        { label: "90 days", value: "$125" },
      ],
    },
    create: {
      parentId: visaSub.id,
      type: "permit",
      name: "Tourist Visa",
      slug: "tourist-visa",
      description: "Required for all foreign visitors entering Nepal.",
      displayOrder: 1,
      aliases: ["Nepal visa", "eVisa", "on-arrival visa", "tourist visa"],
      quickSummary: [
        { label: "Who", value: "All foreign visitors" },
        { label: "Cost", value: "$30–$125" },
        { label: "Where", value: "On arrival at TIA or embassies" },
      ],
      costDetails: [
        { label: "15 days", value: "$30" },
        { label: "30 days", value: "$50" },
        { label: "90 days", value: "$125" },
      ],
      whereToGet: [
        "On arrival at Tribhuvan International Airport (TIA), Kathmandu",
        "Nepal embassies and consulates abroad",
        "Online pre-application at nepaliportal.com",
      ],
      documents: ["Passport valid 6+ months", "Passport photo", "Visa fee in cash/card"],
      validity: "Duration of visa (15/30/90 days)",
      notes: "Pre-apply online to skip the queue at TIA.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: timsSub.id, slug: "e-tims-registration" } },
    update: { name: "E-TIMS Registration", description: "Trekkers' Information Management System card." },
    create: {
      parentId: timsSub.id,
      type: "permit",
      name: "E-TIMS Registration",
      slug: "e-tims-registration",
      description: "Trekkers' Information Management System card.",
      displayOrder: 1,
      aliases: ["TIMS", "TIMS Card", "Trekkers Information Management System"],
      quickSummary: [
        { label: "Who", value: "Trekkers in Langtang, Manaslu, restricted areas" },
        { label: "Cost", value: "NPR 2,000 (FIT)" },
        { label: "Where", value: "NTB Kathmandu, TAAN, agencies" },
      ],
      costDetails: [
        { label: "Individual (FIT)", value: "NPR 2,000" },
        { label: "Group (via agency)", value: "NPR 1,000" },
      ],
      whereToGet: [
        "Nepal Tourism Board (NTB), Kathmandu",
        "TAAN office, Kathmandu",
        "Registered trekking agencies",
      ],
      documents: ["Passport + copy", "Passport photo × 2", "Trek itinerary"],
      validity: "Single trek, non-transferable",
      notes: "NOT required in Everest or Annapurna regions since 2018.",
      relatedSlugs: [],
    },
  });

  console.log("✅ Tourist Visa & E-TIMS synced.");
}