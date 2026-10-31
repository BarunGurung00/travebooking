import { PrismaClient } from "@prisma/client";
import { seedGeos } from "./seeds/geo/nepal";
import { seedPois } from "./seeds/poi/core";
import { seedCategories } from "./seeds/permit/categories";
import { seedVisaTims } from "./seeds/permit/visa-tims";
import { seedNationalParks } from "./seeds/permit/national-parks";
import { seedRestrictedAreas } from "./seeds/permit/restricted-areas";
import { seedLocalMunicipality } from "./seeds/permit/local-municipality";
import { seedClimbing } from "./seeds/permit/climbing";
import { seedSpecialClearances } from "./seeds/permit/special-clearances";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...\n");

  await seedGeos(prisma);              // 1. Geos must come first
  await seedPois(prisma);              // 2. POIs need geos
  await seedCategories(prisma);        // 3. Permit categories
  await seedVisaTims(prisma);          // 4. Permit subcategory → permits
  await seedNationalParks(prisma);
  await seedRestrictedAreas(prisma);
  await seedLocalMunicipality(prisma);
  await seedClimbing(prisma);
  await seedSpecialClearances(prisma);

  console.log("\n🎉 All seeds complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());