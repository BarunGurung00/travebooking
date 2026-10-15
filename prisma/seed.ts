import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ═══════════════════════════════════════════════════════
// GEOS — Nepal → Provinces → Districts → Cities
// ID scheme: 977 + gov district code + 2-digit city seq
// ═══════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════
// POIS — Treks, Hotels, Restaurants, Transport, Guides, Permits, Places
// ID scheme: 6 digits, first digit = category block
// ═══════════════════════════════════════════════════════

const pois = [
  // ─── Treks (100000+) ───
  { poiId: 100001, geoId: 97710301, category: "trek", name: "Everest Base Camp Trek", slug: "everest-base-camp-trek", description: "The classic trek to the base of the world's highest mountain.", price: 1250, rating: 5.0 },
  { poiId: 100002, geoId: 97740501, category: "trek", name: "Annapurna Circuit Trek", slug: "annapurna-circuit-trek", description: "A legendary circuit around the Annapurna massif.", price: 890, rating: 4.9 },
  { poiId: 100003, geoId: 97710301, category: "trek", name: "Everest View Trek", slug: "everest-view-trek", description: "A shorter trek to Tengboche with stunning Everest views.", price: 650, rating: 4.8 },
  { poiId: 100004, geoId: 97741201, category: "trek", name: "Upper Mustang Trek", slug: "upper-mustang-trek", description: "Trek through the forbidden kingdom of Lo.", price: 1500, rating: 4.9 },
  { poiId: 100005, geoId: 97740501, category: "trek", name: "Annapurna Base Camp Trek", slug: "annapurna-base-camp-trek", description: "Trek to the heart of the Annapurna sanctuary.", price: 750, rating: 4.8 },

  // ─── Hotels (200000+) ───
  { poiId: 200001, geoId: 97710301, category: "hotel", name: "Namche Boutique Lodge", slug: "namche-boutique-lodge", description: "Comfortable lodge in the heart of Namche Bazaar.", price: 45, rating: 4.8 },
  { poiId: 200002, geoId: 97740501, category: "hotel", name: "Yak & Yeti Pokhara", slug: "yak-yeti-pokhara", description: "Riverside hotel with mountain views in Pokhara.", price: 80, rating: 4.6 },
  { poiId: 200003, geoId: 97730601, category: "hotel", name: "Kathmandu Guest House", slug: "kathmandu-guest-house", description: "Legendary guest house in the heart of Thamel.", price: 60, rating: 4.7 },
  { poiId: 200004, geoId: 97730501, category: "hotel", name: "Chitwan Jungle Lodge", slug: "chitwan-jungle-lodge", description: "Riverside lodge at the edge of Chitwan National Park.", price: 120, rating: 4.8 },
  { poiId: 200005, geoId: 97750101, category: "hotel", name: "Lumbini Peace Resort", slug: "lumbini-peace-resort", description: "Quiet resort near the birthplace of Buddha.", price: 55, rating: 4.5 },

  // ─── Restaurants (300000+) ───
  { poiId: 300001, geoId: 97740501, category: "restaurant", name: "OR2K Restaurant", slug: "or2k-restaurant", description: "Middle Eastern & vegetarian in Pokhara's Lakeside.", price: 8, rating: 4.7 },
  { poiId: 300002, geoId: 97730601, category: "restaurant", name: "Thamel House Restaurant", slug: "thamel-house-restaurant", description: "Traditional Nepali cuisine in a heritage building.", price: 12, rating: 4.6 },
  { poiId: 300003, geoId: 97740501, category: "restaurant", name: "Caffeine Restaurant", slug: "caffeine-restaurant", description: "Popular breakfast spot overlooking Phewa Lake.", price: 6, rating: 4.5 },

  // ─── Transport (400000+) ───
  { poiId: 400001, geoId: 97730601, category: "transport", name: "Kathmandu to Pokhara VIP Bus", slug: "ktm-to-pkr-vip-bus", description: "Daily AC sofa bus from Kathmandu to Pokhara.", price: 12, rating: 4.7 },
  { poiId: 400002, geoId: 97710302, category: "transport", name: "Kathmandu to Lukla Flight", slug: "ktm-to-lukla-flight", description: "Scenic mountain flight from Kathmandu to Lukla.", price: 180, rating: 4.5 },
  { poiId: 400003, geoId: 97730601, category: "transport", name: "Kathmandu to Chitwan Bus", slug: "ktm-to-chitwan-bus", description: "Tourist bus from Kathmandu to Sauraha, Chitwan.", price: 10, rating: 4.4 },

  // ─── Guides (500000+) ───
  { poiId: 500001, geoId: 97710301, category: "guide", name: "Pemba Sherpa", slug: "pemba-sherpa", description: "Licensed Everest region guide, 15 years experience.", price: 35, rating: 5.0 },
  { poiId: 500002, geoId: 97740501, category: "guide", name: "Anil Gurung", slug: "anil-gurung", description: "Annapurna region specialist with 12 years experience.", price: 30, rating: 4.9 },

  // ─── Permits (600000+) ───
  { poiId: 600001, geoId: 977, category: "permit", name: "TIMS Card", slug: "tims-card", description: "Trekkers' Information Management System card, required for all treks.", price: 20, rating: null },
  { poiId: 600002, geoId: 977, category: "permit", name: "Sagarmatha National Park Permit", slug: "sagarmatha-np-permit", description: "Required for all treks in the Everest region.", price: 30, rating: null },

  // ─── Places (700000+) ───
  { poiId: 700001, geoId: 97730601, category: "place", name: "Thamel", slug: "thamel", description: "The tourist hub of Kathmandu — shops, restaurants, nightlife.", price: null, rating: 4.4 },
  { poiId: 700002, geoId: 97730601, category: "place", name: "Boudhanath Stupa", slug: "boudhanath-stupa", description: "One of the largest Buddhist stupas in the world.", price: 3, rating: 4.9 },
  { poiId: 700003, geoId: 97730601, category: "place", name: "Swayambhunath", slug: "swayambhunath", description: "The Monkey Temple, with panoramic views over Kathmandu.", price: 3, rating: 4.7 },
  { poiId: 700004, geoId: 97740501, category: "place", name: "Phewa Lake", slug: "phewa-lake", description: "Pokhara's iconic lake with views of the Annapurnas.", price: null, rating: 4.9 },
  { poiId: 700005, geoId: 97740501, category: "place", name: "Lakeside", slug: "lakeside", description: "Pokhara's main tourist strip along Phewa Lake.", price: null, rating: 4.6 },
  { poiId: 700006, geoId: 97710301, category: "place", name: "Everest Base Camp", slug: "everest-base-camp", description: "The base camp of Mount Everest, at 5,364m.", price: null, rating: 5.0 },
  { poiId: 700007, geoId: 97710301, category: "place", name: "Kala Patthar", slug: "kala-patthar", description: "The famous viewpoint at 5,545m with the best Everest views.", price: null, rating: 5.0 },
  { poiId: 700008, geoId: 97710301, category: "place", name: "Tengboche Monastery", slug: "tengboche-monastery", description: "The largest monastery in the Khumbu region.", price: null, rating: 4.8 },
  { poiId: 700009, geoId: 97730701, category: "place", name: "Bhaktapur Durbar Square", slug: "bhaktapur-durbar-square", description: "UNESCO World Heritage Site with medieval architecture.", price: 15, rating: 4.8 },
  { poiId: 700010, geoId: 97730801, category: "place", name: "Patan Durbar Square", slug: "patan-durbar-square", description: "The finest collection of Newari architecture in the Kathmandu Valley.", price: 10, rating: 4.8 },
];

// ═══════════════════════════════════════════════════════
// SEED FUNCTION
// ═══════════════════════════════════════════════════════

async function main() {
  console.log("🌱 Seeding database...\n");

  // Insert geos (parent first, then children)
  console.log(`📍 Inserting ${geos.length} geos...`);
  for (const geo of geos) {
    await prisma.geo.upsert({
      where: { geoId: geo.geoId },
      update: {},
      create: geo,
    });
  }
  console.log(`✅ ${geos.length} geos inserted\n`);

  // Insert POIs
  console.log(`🎯 Inserting ${pois.length} POIs...`);
  for (const poi of pois) {
    await prisma.poi.upsert({
      where: { poiId: poi.poiId },
      update: {},
      create: poi,
    });
  }
  console.log(`✅ ${pois.length} POIs inserted\n`);

  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });