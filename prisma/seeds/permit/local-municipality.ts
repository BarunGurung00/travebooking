import { PrismaClient } from "@prisma/client";

export async function seedLocalMunicipality(prisma: PrismaClient) {
  console.log("🌱 Seeding Local Municipality Fees...\n");

  const localSub = await prisma.permit.findFirst({
    where: { slug: "local-municipality", type: "subcategory" },
  });
  if (!localSub) {
    throw new Error("❌ Local municipality subcategory missing. Run categories first.");
  }

  const localFees = [
    { slug: "khumbu-pasang-lhamu", name: "Khumbu Pasang Lhamu Rural Municipality Fee", cost: "NPR 3,000", order: 1 },
    { slug: "chumnubri-rural-municipality", name: "Chumnubri Rural Municipality Entrance Fee", cost: "NPR 3,000", order: 2 },
    { slug: "annapurna-rural-municipality", name: "Annapurna Rural Municipality Local Trail Fee", cost: "NPR 1,000", order: 3 },
  ];

  for (const local of localFees) {
    await prisma.permit.upsert({
      where: { parentId_slug: { parentId: localSub.id, slug: local.slug } },
      update: { name: local.name, costDetails: [{ label: "Local Fee", value: local.cost }] },
      create: {
        parentId: localSub.id,
        type: "permit",
        name: local.name,
        slug: local.slug,
        description: "Independent local entry tax levied under the Local Government Operation Act 2074.",
        displayOrder: local.order,
        quickSummary: [
          { label: "Who", value: "Regional visitors" },
          { label: "Cost", value: local.cost },
          { label: "Where", value: "Trailhead / Local Checkpoint" },
        ],
        costDetails: [{ label: "Local Fee", value: local.cost }],
        whereToGet: ["Local Entry Checkpoints on the trail"],
        documents: ["Passport"],
        validity: "Single entry",
        notes: "Collected directly by the local government for regional infrastructure.",
        relatedSlugs: [],
      },
    });
  }

  console.log(`✅ ${localFees.length} Local Municipality Fees synced.`);
}