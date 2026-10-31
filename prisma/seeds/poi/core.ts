import { PrismaClient } from "@prisma/client";

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

export async function seedPois(prisma: PrismaClient) {
  console.log("🌱 Seeding POIs...\n");
  for (const poi of pois) {
    await prisma.poi.upsert({
      where: { poiId: poi.poiId },
      update: {},
      create: poi,
    });
  }
  console.log(`✅ ${pois.length} POIs synced.`);
}