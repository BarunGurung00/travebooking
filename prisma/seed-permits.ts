import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Helper for root categories (parentId: null) — upsert doesn't work with null
async function upsertRoot(
  slug: string,
  data: { name: string; description: string; displayOrder: number }
) {
  const existing = await prisma.permit.findFirst({
    where: { parentId: null, slug },
  });
  if (existing) return existing;
  return prisma.permit.create({
    data: { parentId: null, type: "category", slug, ...data },
  });
}

async function main() {
  console.log("🌱 Seeding permit tree...\n");

  // ══════════════════════════════════════════════════════════
  // LEVEL 1 — ROOT CATEGORIES
  // ══════════════════════════════════════════════════════════
  const entry = await upsertRoot("entry", {
    name: "Entry Permit",
    description: "Required for every foreign visitor entering Nepal.",
    displayOrder: 1,
  });
  const trekking = await upsertRoot("trekking", {
    name: "Trekking Permits",
    description: "Required for most multi-day treks in Nepal.",
    displayOrder: 2,
  });
  const climbing = await upsertRoot("climbing", {
    name: "Climbing Permits",
    description: "Required for peak climbing and mountaineering.",
    displayOrder: 3,
  });
  const special = await upsertRoot("special", {
    name: "Special Clearances",
    description: "Special permits for specific activities.",
    displayOrder: 4,
  });

  console.log("✅ 4 categories");

  // ══════════════════════════════════════════════════════════
  // LEVEL 2 — SUBCATEGORIES
  // ══════════════════════════════════════════════════════════

  const visaSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: entry.id, slug: "tourist-visa" } },
    update: {},
    create: {
      parentId: entry.id,
      type: "subcategory",
      name: "Tourist Visa",
      slug: "tourist-visa",
      description: "Entry visa for all foreign visitors.",
      displayOrder: 1,
    },
  });

  const timsSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekking.id, slug: "tims" } },
    update: {},
    create: {
      parentId: trekking.id,
      type: "subcategory",
      name: "E-TIMS Registration",
      slug: "tims",
      description: "Safety registration for trekkers.",
      displayOrder: 1,
    },
  });

  const protectedSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekking.id, slug: "protected-area" } },
    update: {},
    create: {
      parentId: trekking.id,
      type: "subcategory",
      name: "Protected Area Permits",
      slug: "protected-area",
      description: "National parks and conservation areas.",
      displayOrder: 2,
    },
  });

  const restrictedSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekking.id, slug: "restricted-area" } },
    update: {},
    create: {
      parentId: trekking.id,
      type: "subcategory",
      name: "Restricted Area Permits (RAP)",
      slug: "restricted-area",
      description: "Limited-access trekking regions.",
      displayOrder: 3,
    },
  });

  const localSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekking.id, slug: "local-municipality" } },
    update: {},
    create: {
      parentId: trekking.id,
      type: "subcategory",
      name: "Local Municipality Fees",
      slug: "local-municipality",
      description: "Trailhead fees at rural municipalities.",
      displayOrder: 4,
    },
  });

  const trekkingPeaksSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: climbing.id, slug: "trekking-peaks" } },
    update: {},
    create: {
      parentId: climbing.id,
      type: "subcategory",
      name: "NMA Trekking Peaks",
      slug: "trekking-peaks",
      description: "Peaks 5,800–6,500m, licensed by NMA.",
      displayOrder: 1,
    },
  });

  const expeditionPeaksSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: climbing.id, slug: "expedition-peaks" } },
    update: {},
    create: {
      parentId: climbing.id,
      type: "subcategory",
      name: "MoCTCA Expedition Peaks",
      slug: "expedition-peaks",
      description: "Expedition peaks 7,000m+, licensed by MoCTCA.",
      displayOrder: 2,
    },
  });

  const droneSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: special.id, slug: "drone" } },
    update: {},
    create: {
      parentId: special.id,
      type: "subcategory",
      name: "Drone Clearances",
      slug: "drone",
      description: "Permits for flying drones in Nepal.",
      displayOrder: 1,
    },
  });

  const filmingSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: special.id, slug: "filming" } },
    update: {},
    create: {
      parentId: special.id,
      type: "subcategory",
      name: "Filming & Media",
      slug: "filming",
      description: "Filming and documentary permits.",
      displayOrder: 2,
    },
  });

  const heritageSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: special.id, slug: "heritage" } },
    update: {},
    create: {
      parentId: special.id,
      type: "subcategory",
      name: "Heritage Site Entry",
      slug: "heritage",
      description: "Entry tickets for UNESCO World Heritage sites.",
      displayOrder: 3,
    },
  });

  const adventureSub = await prisma.permit.upsert({
    where: { parentId_slug: { parentId: special.id, slug: "adventure" } },
    update: {},
    create: {
      parentId: special.id,
      type: "subcategory",
      name: "Adventure Sports",
      slug: "adventure",
      description: "Regulated adventure activities.",
      displayOrder: 4,
    },
  });

  console.log("✅ 12 subcategories");

  // ══════════════════════════════════════════════════════════
  // LEVEL 3 — INDIVIDUAL PERMITS
  // ══════════════════════════════════════════════════════════

  // Entry
  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: visaSub.id, slug: "tourist-visa" } },
    update: {},
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
      documents: ["Passport valid 6+ months", "Passport photo", "Visa fee in cash"],
      validity: "Duration of visa (15/30/90 days)",
      notes: "Pre-apply online to skip the queue at TIA.",
      relatedSlugs: [],
    },
  });

  // Trekking / TIMS
  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: timsSub.id, slug: "e-tims-registration" } },
    update: {},
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

  // Trekking / Protected Area
  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: protectedSub.id, slug: "sagarmatha-national-park" } },
    update: {},
    create: {
      parentId: protectedSub.id,
      type: "permit",
      name: "Sagarmatha National Park Permit",
      slug: "sagarmatha-national-park",
      description: "Everest region entry permit.",
      displayOrder: 1,
      aliases: ["Everest permit", "EBC permit", "SNP", "Sagarmatha permit"],
      quickSummary: [
        { label: "Who", value: "Everest region trekkers" },
        { label: "Cost", value: "NPR 3,000" },
        { label: "Where", value: "NTB Kathmandu, Monjo checkpoint" },
      ],
      costDetails: [
        { label: "Foreign", value: "NPR 3,000" },
        { label: "SAARC", value: "NPR 1,500" },
        { label: "Nepali", value: "NPR 100" },
      ],
      whereToGet: [
        "Nepal Tourism Board (NTB), Kathmandu",
        "Monjo checkpoint (on trail)",
        "Online at epermit.ntnc.org.np",
      ],
      documents: ["Passport", "Visa copy"],
      validity: "Single entry, duration of trek",
      notes: "TIMS not required here. Also need Khumbu Municipality Fee.",
      relatedSlugs: ["khumbu-pasang-lhamu"],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: protectedSub.id, slug: "annapurna-conservation-area" } },
    update: {},
    create: {
      parentId: protectedSub.id,
      type: "permit",
      name: "Annapurna Conservation Area Permit (ACAP)",
      slug: "annapurna-conservation-area",
      description: "Required for all treks in the Annapurna region.",
      displayOrder: 2,
      aliases: ["ACAP", "Annapurna permit", "ABC permit"],
      quickSummary: [
        { label: "Who", value: "Annapurna region trekkers" },
        { label: "Cost", value: "NPR 3,000" },
        { label: "Where", value: "NTB Kathmandu, ACAP Pokhara" },
      ],
      costDetails: [
        { label: "Foreign", value: "NPR 3,000" },
        { label: "SAARC", value: "NPR 1,000" },
      ],
      whereToGet: [
        "Nepal Tourism Board (NTB), Kathmandu",
        "ACAP Entry Permit Counter, Pokhara",
        "Online at epermit.ntnc.org.np",
      ],
      documents: ["Passport", "Visa copy"],
      validity: "Single entry, duration of trek",
      notes: "Required for ABC, Circuit, Poon Hill, Mardi Himal.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: protectedSub.id, slug: "langtang-national-park" } },
    update: {},
    create: {
      parentId: protectedSub.id,
      type: "permit",
      name: "Langtang National Park Permit",
      slug: "langtang-national-park",
      description: "Required for treks in the Langtang region.",
      displayOrder: 3,
      aliases: ["Langtang permit", "Langtang NP"],
      quickSummary: [
        { label: "Who", value: "Langtang region trekkers" },
        { label: "Cost", value: "NPR 3,000" },
        { label: "Where", value: "NTB Kathmandu" },
      ],
      costDetails: [
        { label: "Foreign", value: "NPR 3,000" },
        { label: "SAARC", value: "NPR 1,500" },
      ],
      whereToGet: ["Nepal Tourism Board (NTB), Kathmandu"],
      documents: ["Passport", "Visa copy"],
      validity: "Single entry",
      notes: "Also requires TIMS for Langtang treks.",
      relatedSlugs: ["e-tims-registration"],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: protectedSub.id, slug: "chitwan-national-park" } },
    update: {},
    create: {
      parentId: protectedSub.id,
      type: "permit",
      name: "Chitwan National Park Permit",
      slug: "chitwan-national-park",
      description: "Entry permit for Chitwan National Park.",
      displayOrder: 4,
      aliases: ["Chitwan permit", "Chitwan safari"],
      quickSummary: [
        { label: "Who", value: "Chitwan visitors" },
        { label: "Cost", value: "NPR 2,000" },
        { label: "Where", value: "Park entrance, Sauraha" },
      ],
      costDetails: [
        { label: "Foreign", value: "NPR 2,000" },
        { label: "SAARC", value: "NPR 1,000" },
      ],
      whereToGet: ["Chitwan National Park entrance, Sauraha"],
      documents: ["Passport"],
      validity: "Single entry",
      notes: "Usually bundled with safari packages.",
      relatedSlugs: [],
    },
  });

  // Trekking / Restricted Area
  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: restrictedSub.id, slug: "upper-mustang" } },
    update: {},
    create: {
      parentId: restrictedSub.id,
      type: "permit",
      name: "Upper Mustang Restricted Area Permit",
      slug: "upper-mustang",
      description: "Required for treks beyond Kagbeni into Upper Mustang.",
      displayOrder: 1,
      aliases: ["Upper Mustang RAP", "Mustang permit", "Lo Manthang permit"],
      quickSummary: [
        { label: "Who", value: "Upper Mustang trekkers" },
        { label: "Cost", value: "$50/day (10-day min)" },
        { label: "Where", value: "Dept. of Immigration via agency" },
      ],
      costDetails: [{ label: "Foreign", value: "$50/day (10-day minimum)" }],
      whereToGet: [
        "Department of Immigration, Kathmandu",
        "Applied via a registered trekking agency",
      ],
      documents: ["Passport", "Visa copy", "Agency letter", "Itinerary"],
      validity: "Per-day, minimum 10 days",
      notes: "Guide + agency mandatory.",
      relatedSlugs: ["annapurna-conservation-area", "e-tims-registration"],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: restrictedSub.id, slug: "manaslu" } },
    update: {},
    create: {
      parentId: restrictedSub.id,
      type: "permit",
      name: "Manaslu Restricted Area Permit",
      slug: "manaslu",
      description: "Required for the Manaslu Circuit trek.",
      displayOrder: 2,
      aliases: ["Manaslu RAP", "Manaslu permit"],
      quickSummary: [
        { label: "Who", value: "Manaslu Circuit trekkers" },
        { label: "Cost", value: "$100/week (peak)" },
        { label: "Where", value: "Dept. of Immigration via agency" },
      ],
      costDetails: [
        { label: "Peak season", value: "$100/week" },
        { label: "Off-peak", value: "$75/week" },
      ],
      whereToGet: ["Department of Immigration, Kathmandu (via agency)"],
      documents: ["Passport", "Visa copy", "Agency letter", "Itinerary"],
      validity: "Per-week",
      notes: "Also requires MCAP, ACAP, and TIMS.",
      relatedSlugs: ["e-tims-registration"],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: restrictedSub.id, slug: "upper-dolpo" } },
    update: {},
    create: {
      parentId: restrictedSub.id,
      type: "permit",
      name: "Upper Dolpo Restricted Area Permit",
      slug: "upper-dolpo",
      description: "Required for treks in Upper Dolpo.",
      displayOrder: 3,
      aliases: ["Dolpo RAP", "Upper Dolpo permit"],
      quickSummary: [
        { label: "Who", value: "Upper Dolpo trekkers" },
        { label: "Cost", value: "$500/10 days" },
        { label: "Where", value: "Dept. of Immigration via agency" },
      ],
      costDetails: [{ label: "Foreign", value: "$500/10 days" }],
      whereToGet: ["Department of Immigration, Kathmandu (via agency)"],
      documents: ["Passport", "Visa copy", "Agency letter", "Itinerary"],
      validity: "10 days",
      notes: "Guide + agency mandatory.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: restrictedSub.id, slug: "kanchenjunga" } },
    update: {},
    create: {
      parentId: restrictedSub.id,
      type: "permit",
      name: "Kanchenjunga Restricted Area Permit",
      slug: "kanchenjunga",
      description: "Required for the Kanchenjunga region.",
      displayOrder: 4,
      aliases: ["Kanchenjunga RAP", "Kanchenjunga permit"],
      quickSummary: [
        { label: "Who", value: "Kanchenjunga trekkers" },
        { label: "Cost", value: "$20/week" },
        { label: "Where", value: "Dept. of Immigration via agency" },
      ],
      costDetails: [{ label: "Foreign", value: "$20/week" }],
      whereToGet: ["Department of Immigration, Kathmandu (via agency)"],
      documents: ["Passport", "Visa copy", "Agency letter"],
      validity: "Per-week",
      notes: "Also requires KCAP.",
      relatedSlugs: [],
    },
  });

  // Trekking / Local Municipality
  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: localSub.id, slug: "khumbu-pasang-lhamu" } },
    update: {},
    create: {
      parentId: localSub.id,
      type: "permit",
      name: "Khumbu Pasang Lhamu Municipality Fee",
      slug: "khumbu-pasang-lhamu",
      description: "Local municipality fee for the Everest region.",
      displayOrder: 1,
      aliases: ["Khumbu permit", "Everest municipality fee", "Khumbu fee"],
      quickSummary: [
        { label: "Who", value: "Everest region trekkers" },
        { label: "Cost", value: "NPR 3,000" },
        { label: "Where", value: "Lukla or Monjo checkpoint" },
      ],
      costDetails: [{ label: "Foreign", value: "NPR 3,000" }],
      whereToGet: ["Lukla checkpoint (on arrival)", "Monjo checkpoint (on trail)"],
      documents: ["Passport"],
      validity: "Single entry",
      notes: "Replaced TIMS in Everest region in 2018.",
      relatedSlugs: ["sagarmatha-national-park"],
    },
  });

  // Climbing
  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekkingPeaksSub.id, slug: "nma-trekking-peak" } },
    update: {},
    create: {
      parentId: trekkingPeaksSub.id,
      type: "permit",
      name: "NMA Trekking Peak Permit",
      slug: "nma-trekking-peak",
      description: "Permit for peaks 5,800–6,500m licensed by NMA.",
      displayOrder: 1,
      aliases: ["Trekking peak permit", "NMA permit"],
      quickSummary: [
        { label: "Who", value: "Peak climbers (5,800–6,500m)" },
        { label: "Cost", value: "$250–$400" },
        { label: "Where", value: "NMA via agency" },
      ],
      costDetails: [{ label: "Single peak", value: "$250–$400" }],
      whereToGet: ["Nepal Mountaineering Association (NMA) via agency"],
      documents: ["Passport", "Climbing resume", "Insurance", "Agency letter"],
      validity: "Single expedition",
      notes: "Guide + agency mandatory.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: expeditionPeaksSub.id, slug: "moctca-expedition-peak" } },
    update: {},
    create: {
      parentId: expeditionPeaksSub.id,
      type: "permit",
      name: "MoCTCA Expedition Peak Permit",
      slug: "moctca-expedition-peak",
      description: "Permit for expedition peaks 7,000m+ licensed by MoCTCA.",
      displayOrder: 1,
      aliases: ["Expedition permit", "MoCTCA permit", "Everest climbing permit"],
      quickSummary: [
        { label: "Who", value: "Expedition climbers (7,000m+)" },
        { label: "Cost", value: "$1,000–$11,000+" },
        { label: "Where", value: "Ministry of Tourism via agency" },
      ],
      costDetails: [
        { label: "7,000m class", value: "$1,000–$5,000" },
        { label: "Everest (8,848m)", value: "$11,000" },
      ],
      whereToGet: ["Ministry of Tourism via agency"],
      documents: ["Passport", "Climbing resume", "Medical certificate", "Insurance", "Agency letter"],
      validity: "Single expedition",
      notes: "Guide + agency mandatory. Non-refundable.",
      relatedSlugs: [],
    },
  });

  // Special
  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: droneSub.id, slug: "caan-drone-clearance" } },
    update: {},
    create: {
      parentId: droneSub.id,
      type: "permit",
      name: "CAAN Drone Clearance",
      slug: "caan-drone-clearance",
      description: "Required for flying any drone in Nepal.",
      displayOrder: 1,
      aliases: ["Drone permit", "Drone clearance", "CAAN drone"],
      quickSummary: [
        { label: "Who", value: "Drone operators" },
        { label: "Cost", value: "Varies" },
        { label: "Where", value: "CAAN + Ministry of Home Affairs" },
      ],
      costDetails: [{ label: "Fee", value: "Varies by duration/use" }],
      whereToGet: [
        "Civil Aviation Authority of Nepal (CAAN)",
        "Ministry of Home Affairs",
        "Local authorities",
      ],
      documents: ["Passport", "Drone specs", "Purpose statement"],
      validity: "Per approved flight",
      notes: "Strictly enforced. Drones without permit are confiscated.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: filmingSub.id, slug: "moic-filming-permit" } },
    update: {},
    create: {
      parentId: filmingSub.id,
      type: "permit",
      name: "MoIC Filming & Documentary Permit",
      slug: "moic-filming-permit",
      description: "Required for professional filming in Nepal.",
      displayOrder: 1,
      aliases: ["Filming permit", "Documentary permit", "Media permit"],
      quickSummary: [
        { label: "Who", value: "Professional film/media crews" },
        { label: "Cost", value: "Varies by project" },
        { label: "Where", value: "Ministry of Information & Communications" },
      ],
      costDetails: [{ label: "Fee", value: "Varies by project scope" }],
      whereToGet: ["Ministry of Information and Communications (MoIC)"],
      documents: ["Passport", "Project brief", "Crew list", "Sponsor letter"],
      validity: "Project duration",
      notes: "Requires government liaison officer.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: heritageSub.id, slug: "heritage-site-ticket" } },
    update: {},
    create: {
      parentId: heritageSub.id,
      type: "permit",
      name: "Heritage Site Entry Ticket",
      slug: "heritage-site-ticket",
      description: "Entry tickets for UNESCO World Heritage sites.",
      displayOrder: 1,
      aliases: ["Heritage ticket", "Durbar Square ticket", "UNESCO entry"],
      quickSummary: [
        { label: "Who", value: "Cultural site visitors" },
        { label: "Cost", value: "NPR 1,000–2,000" },
        { label: "Where", value: "Site entrance" },
      ],
      costDetails: [
        { label: "Kathmandu Durbar Sq", value: "NPR 1,000" },
        { label: "Bhaktapur", value: "NPR 1,800" },
        { label: "Patan", value: "NPR 1,000" },
      ],
      whereToGet: ["Site entrance ticket counters"],
      documents: ["Passport (for foreign rate)"],
      validity: "Single day (multi-day available for some)",
      notes: "Applies to Kathmandu, Bhaktapur, Patan, Boudhanath, Pashupatinath, Lumbini.",
      relatedSlugs: [],
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: adventureSub.id, slug: "adventure-sports-permit" } },
    update: {},
    create: {
      parentId: adventureSub.id,
      type: "permit",
      name: "Adventure Sports Permit",
      slug: "adventure-sports-permit",
      description: "Required for regulated adventure activities.",
      displayOrder: 1,
      aliases: ["Rafting permit", "Paragliding permit", "Bungee permit"],
      quickSummary: [
        { label: "Who", value: "Adventure sports participants" },
        { label: "Cost", value: "Usually bundled" },
        { label: "Where", value: "Via operator" },
      ],
      costDetails: [{ label: "Fee", value: "Usually included in vendor price" }],
      whereToGet: ["Via licensed adventure operators"],
      documents: ["Passport", "Medical fitness (for some)"],
      validity: "Per activity",
      notes: "Applies to rafting, paragliding, ultralight, bungee, canyoning.",
      relatedSlugs: [],
    },
  });

  console.log("✅ 17 permits\n");
  console.log("🎉 Permit seed complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });