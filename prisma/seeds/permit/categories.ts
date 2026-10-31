import { PrismaClient } from "@prisma/client";

async function upsertRoot(
  prisma: PrismaClient,
  slug: string,
  data: { name: string; description: string; displayOrder: number }
) {
  const existing = await prisma.permit.findFirst({
    where: { parentId: null, slug },
  });
  if (existing) {
    return prisma.permit.update({
      where: { id: existing.id },
      data,
    });
  }
  return prisma.permit.create({
    data: { parentId: null, type: "category", slug, ...data },
  });
}

export async function seedCategories(prisma: PrismaClient) {
  console.log("🌱 Seeding categories & subcategories...\n");

  const entry = await upsertRoot(prisma, "entry", {
    name: "Entry Permit",
    description: "Required for every foreign visitor entering Nepal.",
    displayOrder: 1,
  });
  const trekking = await upsertRoot(prisma, "trekking", {
    name: "Trekking Permits",
    description: "Required for most multi-day treks in Nepal.",
    displayOrder: 2,
  });
  const climbing = await upsertRoot(prisma, "climbing", {
    name: "Climbing Permits",
    description: "Required for peak climbing and mountaineering.",
    displayOrder: 3,
  });
  const special = await upsertRoot(prisma, "special", {
    name: "Special Clearances",
    description: "Special permits for specific activities.",
    displayOrder: 4,
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: entry.id, slug: "tourist-visa" } },
    update: { name: "Tourist Visa", description: "Entry visa for all foreign visitors." },
    create: {
      parentId: entry.id,
      type: "subcategory",
      name: "Tourist Visa",
      slug: "tourist-visa",
      description: "Entry visa for all foreign visitors.",
      displayOrder: 1,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekking.id, slug: "tims" } },
    update: { name: "E-TIMS Registration", description: "Safety registration for trekkers." },
    create: {
      parentId: trekking.id,
      type: "subcategory",
      name: "E-TIMS Registration",
      slug: "tims",
      description: "Safety registration for trekkers.",
      displayOrder: 1,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekking.id, slug: "protected-area" } },
    update: {
      name: "Protected Area Permits",
      description: "National parks, conservation areas, wildlife & hunting reserves.",
    },
    create: {
      parentId: trekking.id,
      type: "subcategory",
      name: "Protected Area Permits",
      slug: "protected-area",
      description: "National parks, conservation areas, wildlife & hunting reserves.",
      displayOrder: 2,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekking.id, slug: "restricted-area" } },
    update: { name: "Restricted Area Permits (RAP)", description: "Limited-access trekking regions." },
    create: {
      parentId: trekking.id,
      type: "subcategory",
      name: "Restricted Area Permits (RAP)",
      slug: "restricted-area",
      description: "Limited-access trekking regions.",
      displayOrder: 3,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: trekking.id, slug: "local-municipality" } },
    update: { name: "Local Municipality Fees", description: "Trailhead fees at rural municipalities." },
    create: {
      parentId: trekking.id,
      type: "subcategory",
      name: "Local Municipality Fees",
      slug: "local-municipality",
      description: "Trailhead fees at rural municipalities.",
      displayOrder: 4,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: climbing.id, slug: "trekking-peaks" } },
    update: { name: "NMA Trekking Peaks", description: "Peaks 5,800–6,500m, licensed by NMA." },
    create: {
      parentId: climbing.id,
      type: "subcategory",
      name: "NMA Trekking Peaks",
      slug: "trekking-peaks",
      description: "Peaks 5,800–6,500m, licensed by NMA.",
      displayOrder: 1,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: climbing.id, slug: "expedition-peaks" } },
    update: { name: "MoCTCA Expedition Peaks", description: "Expedition peaks 7,000m+, licensed by MoCTCA." },
    create: {
      parentId: climbing.id,
      type: "subcategory",
      name: "MoCTCA Expedition Peaks",
      slug: "expedition-peaks",
      description: "Expedition peaks 7,000m+, licensed by MoCTCA.",
      displayOrder: 2,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: special.id, slug: "drone" } },
    update: { name: "Drone Clearances", description: "Permits for flying drones in Nepal." },
    create: {
      parentId: special.id,
      type: "subcategory",
      name: "Drone Clearances",
      slug: "drone",
      description: "Permits for flying drones in Nepal.",
      displayOrder: 1,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: special.id, slug: "filming" } },
    update: { name: "Filming & Media", description: "Filming and documentary permits." },
    create: {
      parentId: special.id,
      type: "subcategory",
      name: "Filming & Media",
      slug: "filming",
      description: "Filming and documentary permits.",
      displayOrder: 2,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: special.id, slug: "heritage" } },
    update: { name: "Heritage Site Entry", description: "Entry tickets for UNESCO World Heritage sites." },
    create: {
      parentId: special.id,
      type: "subcategory",
      name: "Heritage Site Entry",
      slug: "heritage",
      description: "Entry tickets for UNESCO World Heritage sites.",
      displayOrder: 3,
    },
  });

  await prisma.permit.upsert({
    where: { parentId_slug: { parentId: special.id, slug: "adventure" } },
    update: { name: "Adventure Sports", description: "Regulated adventure activities." },
    create: {
      parentId: special.id,
      type: "subcategory",
      name: "Adventure Sports",
      slug: "adventure",
      description: "Regulated adventure activities.",
      displayOrder: 4,
    },
  });

  console.log("✅ Categories & Subcategories synced.");
}