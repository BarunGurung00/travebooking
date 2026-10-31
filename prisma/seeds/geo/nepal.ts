import { PrismaClient } from "@prisma/client";

const geos = [
  // ─── Country ───
  {
    geoId: 977,
    parentId: null,
    name: "Nepal",
    type: "country",
    slug: "nepal",
    lat: 28.3949,
    lng: 84.124,
  },

  // ─── Provinces ───
  { geoId: 9771, parentId: 977, name: "Koshi",         type: "province", slug: "koshi",         lat: 27.0, lng: 87.0 },
  { geoId: 9772, parentId: 977, name: "Madhesh",       type: "province", slug: "madhesh",       lat: 26.7, lng: 85.9 },
  { geoId: 9773, parentId: 977, name: "Bagmati",       type: "province", slug: "bagmati",       lat: 27.7, lng: 85.3 },
  { geoId: 9774, parentId: 977, name: "Gandaki",       type: "province", slug: "gandaki",       lat: 28.2, lng: 84.0 },
  { geoId: 9775, parentId: 977, name: "Lumbini",       type: "province", slug: "lumbini",       lat: 27.7, lng: 83.3 },
  { geoId: 9776, parentId: 977, name: "Karnali",       type: "province", slug: "karnali",       lat: 29.0, lng: 82.2 },
  { geoId: 9777, parentId: 977, name: "Sudurpashchim", type: "province", slug: "sudurpashchim", lat: 29.3, lng: 80.5 },

  // ─── Districts (using government codes) ───
  // Koshi (province 1)
  { geoId: 977103, parentId: 9771, name: "Solukhumbu",    type: "district", slug: "solukhumbu",    lat: 27.7, lng: 86.7 },
  { geoId: 977102, parentId: 9771, name: "Sankhuwasabha", type: "district", slug: "sankhuwasabha", lat: 27.5, lng: 87.2 },
  { geoId: 977111, parentId: 9771, name: "Jhapa",         type: "district", slug: "jhapa",         lat: 26.6, lng: 88.0 },
  { geoId: 977112, parentId: 9771, name: "Morang",        type: "district", slug: "morang",        lat: 26.6, lng: 87.3 },

  // Bagmati (province 3)
  { geoId: 977306, parentId: 9773, name: "Kathmandu",     type: "district", slug: "kathmandu",     lat: 27.7, lng: 85.3 },
  { geoId: 977307, parentId: 9773, name: "Bhaktapur",     type: "district", slug: "bhaktapur",     lat: 27.67, lng: 85.43 },
  { geoId: 977308, parentId: 9773, name: "Lalitpur",      type: "district", slug: "lalitpur",      lat: 27.66, lng: 85.32 },
  { geoId: 977305, parentId: 9773, name: "Chitwan",       type: "district", slug: "chitwan",       lat: 27.53, lng: 84.35 },

  // Gandaki (province 4)
  { geoId: 977405, parentId: 9774, name: "Kaski",         type: "district", slug: "kaski",         lat: 28.2, lng: 84.0 },
  { geoId: 977412, parentId: 9774, name: "Mustang",       type: "district", slug: "mustang",       lat: 28.98, lng: 83.85 },
  { geoId: 977413, parentId: 9774, name: "Manang",        type: "district", slug: "manang",        lat: 28.66, lng: 84.02 },

  // Lumbini (province 5)
  { geoId: 977501, parentId: 9775, name: "Rupandehi",     type: "district", slug: "rupandehi",     lat: 27.5, lng: 83.4 },

  // ─── Cities (district ID + 2-digit sequence) ───
  // Solukhumbu (977103)
  { geoId: 97710301, parentId: 977103, name: "Namche Bazaar", type: "city", slug: "namche-bazaar", lat: 27.8069, lng: 86.7144 },
  { geoId: 97710302, parentId: 977103, name: "Lukla",         type: "city", slug: "lukla",         lat: 27.6866, lng: 86.7294 },

  // Kathmandu district (977306)
  { geoId: 97730601, parentId: 977306, name: "Kathmandu", type: "city", slug: "kathmandu", lat: 27.7172, lng: 85.3240 },
  { geoId: 97730602, parentId: 977306, name: "Kirtipur",  type: "city", slug: "kirtipur",  lat: 27.6800, lng: 85.2800 },

  // Bhaktapur (977307)
  { geoId: 97730701, parentId: 977307, name: "Bhaktapur", type: "city", slug: "bhaktapur", lat: 27.6710, lng: 85.4298 },

  // Lalitpur (977308)
  { geoId: 97730801, parentId: 977308, name: "Patan", type: "city", slug: "patan", lat: 27.6730, lng: 85.3250 },

  // Chitwan (977305)
  { geoId: 97730501, parentId: 977305, name: "Sauraha", type: "city", slug: "sauraha", lat: 27.5833, lng: 84.5000 },

  // Kaski (977405)
  { geoId: 97740501, parentId: 977405, name: "Pokhara",   type: "city", slug: "pokhara",   lat: 28.2096, lng: 83.9856 },
  { geoId: 97740502, parentId: 977405, name: "Sarangkot", type: "city", slug: "sarangkot", lat: 28.2460, lng: 83.9500 },

  // Mustang (977412)
  { geoId: 97741201, parentId: 977412, name: "Jomsom", type: "city", slug: "jomsom", lat: 28.7808, lng: 83.7226 },

  // Rupandehi (977501)
  { geoId: 97750101, parentId: 977501, name: "Lumbini", type: "city", slug: "lumbini", lat: 27.4833, lng: 83.2762 },
];


export async function seedGeos(prisma: PrismaClient) {
  console.log("🌱 Seeding geos...\n");
  for (const geo of geos) {
    await prisma.geo.upsert({
      where: { geoId: geo.geoId },
      update: {},
      create: geo,
    });
  }
  console.log(`✅ ${geos.length} geos synced.`);
}