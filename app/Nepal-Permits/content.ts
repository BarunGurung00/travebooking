// ═══════════════════════════════════════════════════════════════
// TREK PERMIT MATRIX
// ═══════════════════════════════════════════════════════════════

export const TREK_PERMIT_ROWS = [
  {
    trek: "Everest Base Camp",
    permits: "Sagarmatha NP + Khumbu Municipality",
    costForeign: "~NPR 6,000",
    guideRequired: "No (recommended)",
    searchTerms: "ebc everest khumbu sagarmatha",
  },
  {
    trek: "Annapurna Base Camp",
    permits: "ACAP",
    costForeign: "~NPR 3,000",
    guideRequired: "No (recommended)",
    searchTerms: "abc annapurna acap",
  },
  {
    trek: "Annapurna Circuit",
    permits: "ACAP + TIMS",
    costForeign: "~NPR 5,000",
    guideRequired: "No (recommended)",
    searchTerms: "circuit annapurna acap tims",
  },
  {
    trek: "Langtang Valley",
    permits: "Langtang NP + TIMS",
    costForeign: "~NPR 5,000",
    guideRequired: "No (recommended)",
    searchTerms: "langtang tims national park",
  },
  {
    trek: "Manaslu Circuit",
    permits: "RAP + MCAP + ACAP + TIMS",
    costForeign: "~$250–300",
    guideRequired: "Yes (mandatory)",
    searchTerms: "manaslu rap mcap restricted",
  },
  {
    trek: "Upper Mustang",
    permits: "RAP ($50/day) + ACAP + TIMS",
    costForeign: "~$430+",
    guideRequired: "Yes (mandatory)",
    searchTerms: "mustang upper rap restricted",
  },
  {
    trek: "Kanchenjunga",
    permits: "RAP + KCAP",
    costForeign: "~$100+",
    guideRequired: "Yes (mandatory)",
    searchTerms: "kanchenjunga rap kcap restricted",
  },
];

// ═══════════════════════════════════════════════════════════════
// LOCATIONS — where to get permits
// ═══════════════════════════════════════════════════════════════

export const LOCATIONS = [
  {
    city: "Kathmandu",
    office: "Nepal Tourism Board (NTB)",
    address: "Pradarshani Marg, Bhrikutimandap",
    note: "Main office — TIMS, ACAP, Sagarmatha NP",
  },
  {
    city: "Kathmandu",
    office: "TAAN Office",
    address: "Maligaun, near Ganeshthan",
    note: "TIMS for guided treks",
  },
  {
    city: "Kathmandu",
    office: "Department of Immigration",
    address: "Kalikasthan, Dillibazar",
    note: "Restricted Area Permits (RAP)",
  },
  {
    city: "Pokhara",
    office: "ACAP Entry Permit Counter",
    address: "Damside, Lakeside",
    note: "ACAP & TIMS for Annapurna treks",
  },
  {
    city: "On the trail",
    office: "Sagarmatha NP / Khumbu",
    address: "Monjo and Lukla checkpoints",
    note: "Sagarmatha NP & Khumbu fees",
  },
];

// ═══════════════════════════════════════════════════════════════
// DOCUMENTS CHECKLIST
// ═══════════════════════════════════════════════════════════════

export const DOCUMENTS = [
  {
    doc: "Passport",
    why: "Valid 6+ months beyond your trek end date",
  },
  {
    doc: "Passport copies (2–4)",
    why: "Required at every permit office",
  },
  {
    doc: "Passport photos (2–4)",
    why: "Attached to TIMS and RAP applications",
  },
  {
    doc: "Nepal visa copy",
    why: "Proof of legal entry",
  },
  {
    doc: "Trek itinerary",
    why: "Required for TIMS and RAP",
  },
  {
    doc: "Insurance details",
    why: "Recommended — some offices ask",
  },
];

// ═══════════════════════════════════════════════════════════════
// 2026 CHANGES
// ═══════════════════════════════════════════════════════════════

export const CHANGES_2026 = [
  {
    title: "TIMS no longer checked in Everest or Annapurna",
    detail:
      "Those regions now use park and municipality fees instead. TIMS is still required for Langtang, Manaslu, and restricted areas.",
  },
  {
    title: "Upper Mustang fee restructured",
    detail:
      "Old $500/10-day flat fee replaced by $50/day. Same total for 10 days, but more flexibility for shorter visits.",
  },
  {
    title: "Two-person rule abolished (March 2026)",
    detail:
      "You can now trek restricted areas solo — but a licensed guide and registered agency are still mandatory.",
  },
  {
    title: "Online permits available",
    detail:
      "ACAP and Sagarmatha NP permits can be bought at epermit.ntnc.org.np before you arrive in Nepal.",
  },
];

// ═══════════════════════════════════════════════════════════════
// PERMIT IMAGES — for "What Permits Look Like" section
// ═══════════════════════════════════════════════════════════════

export type PermitImageData = {
  name: string;
  shortName: string;
  subtitle: string;
  imageSrc?: string;
  fee: string;
  issuer: string;
  format: string;
  where: string;
  color: "blue" | "green" | "orange" | "red" | "purple";
  number: string;
};

export const PERMIT_IMAGES: PermitImageData[] = [
  {
    name: "TIMS Card",
    shortName: "TIMS",
    subtitle: "Trekkers' Information Management System",
    imageSrc: "/permits/tims-card.jpg",
    fee: "NPR 2,000 (FIT)",
    issuer: "Nepal Tourism Board",
    format: "Paper card + digital QR code",
    where: "NTB Kathmandu, TAAN, registered agencies",
    color: "blue",
    number: "TIMS-2026-00847",
  },
  {
    name: "Sagarmatha NP Permit",
    shortName: "Sagarmatha",
    subtitle: "Everest region entry permit",
    imageSrc: "/permits/sagarmatha-np.jpg",
    fee: "NPR 3,000",
    issuer: "Dept. of National Parks & Wildlife",
    format: "Paper card with barcode",
    where: "NTB Kathmandu, Monjo checkpoint",
    color: "green",
    number: "SNP-2026-11234",
  },
  {
    name: "ACAP",
    shortName: "ACAP",
    subtitle: "Annapurna Conservation Area Permit",
    imageSrc: "/permits/acap.jpg",
    fee: "NPR 3,000",
    issuer: "NTNC",
    format: "Paper card",
    where: "NTB Kathmandu, ACAP Pokhara, online",
    color: "orange",
    number: "ACAP-2026-05612",
  },
  {
    name: "Khumbu Municipality Fee",
    shortName: "Khumbu",
    subtitle: "Khumbu Pasang Lhamu rural municipality",
    imageSrc: "/permits/khumbu-municipality.jpg",
    fee: "NPR 3,000",
    issuer: "Khumbu Pasang Lhamu RM",
    format: "Small paper slip",
    where: "Lukla or Monjo checkpoint only",
    color: "purple",
    number: "KPLM-2026-00891",
  },
  {
    name: "Restricted Area Permit",
    shortName: "RAP",
    subtitle: "For Mustang, Manaslu, Kanchenjunga, Dolpo",
    imageSrc: "/permits/rap.jpg",
    fee: "$50/day (varies)",
    issuer: "Dept. of Immigration",
    format: "Paper permit + passport stamp",
    where: "Dept. of Immigration, Kathmandu (via agency)",
    color: "red",
    number: "RAP-2026-00234",
  },
];

// ═══════════════════════════════════════════════════════════════
// PRIMARY PERMIT TYPES
// ═══════════════════════════════════════════════════════════════

export type PrimaryPermit = {
  id: string;
  name: string;
  slug: string;
  icon: "passport" | "clipboard" | "mountain" | "lock" | "building" | "peak";
  whoNeeds: string;
  cost: string;
  shortDesc: string;
  detail: {
    cost: { label: string; value: string }[];
    whereRequired: string[];
    whereToGet: string[];
    documents: string[];
    note?: string;
  };
};

export const PRIMARY_PERMITS: PrimaryPermit[] = [
  {
    id: "visa",
    name: "Tourist Visa",
    slug: "visa",
    icon: "passport",
    whoNeeds: "Everyone entering Nepal",
    cost: "$30–$125",
    shortDesc:
      "Required for all foreigners. Available on arrival at Tribhuvan International Airport or via Nepali embassies abroad.",
    detail: {
      cost: [
        { label: "15 days", value: "$30" },
        { label: "30 days", value: "$50" },
        { label: "90 days", value: "$125" },
      ],
      whereRequired: ["All entries into Nepal"],
      whereToGet: [
        "On arrival at Tribhuvan International Airport (TIA), Kathmandu",
        "Nepal embassies and consulates abroad",
        "Online pre-application at nepaliportal.com (recommended)",
      ],
      documents: [
        "Passport valid 6+ months beyond arrival",
        "Passport photo",
        "Visa fee in cash (USD or major currency)",
      ],
      note: "Pre-apply online to skip the queue at TIA. Extensions available at the Department of Immigration in Kathmandu.",
    },
  },
  {
    id: "tims",
    name: "TIMS Card",
    slug: "tims",
    icon: "clipboard",
    whoNeeds: "Trekkers in most regions (not Everest/Annapurna)",
    cost: "NPR 2,000",
    shortDesc:
      "Trekkers' Information Management System card. Registers trekkers for safety and rescue coordination.",
    detail: {
      cost: [
        { label: "Individual (FIT)", value: "NPR 2,000" },
        { label: "Group (via agency)", value: "NPR 1,000" },
      ],
      whereRequired: [
        "Langtang region",
        "Manaslu region",
        "Upper Mustang",
        "Dolpo region",
        "Far-western Nepal",
        "NOT required: Everest, Annapurna",
      ],
      whereToGet: [
        "Nepal Tourism Board (NTB) office, Kathmandu",
        "TAAN office, Kathmandu",
        "Registered trekking agencies (usually included in package)",
      ],
      documents: ["Passport + copy", "Passport photo × 2", "Trek itinerary"],
      note: "Since 2018, TIMS is no longer required in Everest or Annapurna. Those regions use park and municipality permits instead.",
    },
  },
  {
    id: "park",
    name: "National Park & Conservation Area",
    slug: "park",
    icon: "mountain",
    whoNeeds: "Trekkers in protected areas",
    cost: "NPR 1,000–3,000",
    shortDesc:
      "Entry permits for Nepal's national parks and conservation areas — Sagarmatha, Langtang, Annapurna, Chitwan, and more.",
    detail: {
      cost: [
        { label: "Sagarmatha NP", value: "NPR 3,000" },
        { label: "Langtang NP", value: "NPR 3,000" },
        { label: "ACAP (Annapurna)", value: "NPR 3,000" },
        { label: "Chitwan NP", value: "NPR 2,000" },
        { label: "Bardia NP", value: "NPR 1,500" },
      ],
      whereRequired: [
        "Everest region (Sagarmatha NP)",
        "Annapurna region (ACAP)",
        "Langtang region (Langtang NP)",
        "Chitwan, Bardia, and other protected areas",
      ],
      whereToGet: [
        "Nepal Tourism Board (NTB), Kathmandu",
        "Department of National Parks and Wildlife Conservation",
        "Some park entry points (Monjo, ACAP Pokhara)",
        "Online at epermit.ntnc.org.np (ACAP, Sagarmatha)",
      ],
      documents: ["Passport", "Visa copy", "Passport photo (sometimes)"],
      note: "SAARC nationals pay reduced rates (roughly 50%).",
    },
  },
  {
    id: "rap",
    name: "Restricted Area Permit (RAP)",
    slug: "rap",
    icon: "lock",
    whoNeeds: "Restricted regions — Mustang, Manaslu, Kanchenjunga, Dolpo",
    cost: "$50/day +",
    shortDesc:
      "For regions with limited access. Requires a licensed guide and a registered trekking agency.",
    detail: {
      cost: [
        { label: "Upper Mustang", value: "$50/day (10-day min)" },
        { label: "Manaslu", value: "$100/week (peak) / $75/week (off-peak)" },
        { label: "Kanchenjunga", value: "$20/week" },
        { label: "Upper Dolpo", value: "$500/10 days" },
      ],
      whereRequired: [
        "Upper Mustang (beyond Kagbeni)",
        "Manaslu (beyond Jagat)",
        "Kanchenjunga region",
        "Upper Dolpo",
        "Nar-Phu, Tsum Valley",
      ],
      whereToGet: [
        "Department of Immigration, Kalikasthan, Kathmandu",
        "Must be applied for via a registered trekking agency",
      ],
      documents: [
        "Passport + copy",
        "Passport photos",
        "Trek itinerary from agency",
        "Agency letter of sponsorship",
      ],
      note: "Two-person rule abolished in March 2026 — solo treks now allowed, but guide + agency still mandatory.",
    },
  },
  {
    id: "local",
    name: "Local Municipality Fee",
    slug: "local",
    icon: "building",
    whoNeeds: "Everest region (Khumbu), some villages",
    cost: "NPR 3,000",
    shortDesc:
      "Local rural municipality fees — collected at the trailhead in some trekking regions, most commonly in the Everest / Khumbu area.",
    detail: {
      cost: [
        { label: "Khumbu Pasang Lhamu RM", value: "NPR 3,000" },
        { label: "Other municipalities", value: "Varies (NPR 1,000–3,000)" },
      ],
      whereRequired: [
        "Khumbu Pasang Lhamu Rural Municipality (Everest region)",
        "Selected villages in other regions",
      ],
      whereToGet: [
        "Lukla checkpoint (on arrival)",
        "Monjo checkpoint (further up the trail)",
      ],
      documents: ["Passport"],
      note: "This replaced the old TIMS requirement in the Everest region in 2018.",
    },
  },
  {
    id: "mountaineering",
    name: "Mountaineering & Peak Climbing",
    slug: "mountaineering",
    icon: "peak",
    whoNeeds: "Climbers of peaks above ~5,800m",
    cost: "$250 +",
    shortDesc:
      "Required for peaks above the 'trekking peak' threshold. Costs vary by peak height and season.",
    detail: {
      cost: [
        { label: "Trekking peaks (5,800–6,500m)", value: "$250–$400" },
        { label: "Expedition peaks (7,000m+)", value: "$1,000–$5,000+" },
        { label: "Everest (8,848m)", value: "$11,000" },
      ],
      whereRequired: [
        "All peak climbs above the trekking threshold",
        "Expedition-style climbs of major mountains",
      ],
      whereToGet: [
        "Nepal Mountaineering Association (NMA) — for trekking peaks",
        "Ministry of Tourism — for expedition peaks",
        "Must be applied for via a registered agency",
      ],
      documents: [
        "Passport",
        "Climbing resume (for higher peaks)",
        "Medical certificate",
        "Agency sponsorship letter",
        "Insurance (mandatory)",
      ],
      note: "Climbing requires a licensed guide and full expedition permit. Costs are non-refundable even for weather cancellations.",
    },
  },
];

// ═══════════════════════════════════════════════════════════════
// SECONDARY CLEARANCES
// ═══════════════════════════════════════════════════════════════

export type SecondaryClearance = {
  id: string;
  name: string;
  whenRequired: string;
  icon: "drone" | "video" | "landmark" | "activity";
};

export const SECONDARY_CLEARANCES: SecondaryClearance[] = [
  {
    id: "drone",
    name: "Drone / Aerial Photography Permit",
    whenRequired:
      "Any drone flight in Nepal. Requires approval from CAAN (Civil Aviation Authority), the Ministry of Home Affairs, and local authorities.",
    icon: "drone",
  },
  {
    id: "filming",
    name: "Filming & Documentary Permit",
    whenRequired:
      "Professional film, video, or commercial media projects. Issued by the Ministry of Information and Communications.",
    icon: "video",
  },
  {
    id: "heritage",
    name: "Heritage Site Entry Tickets",
    whenRequired:
      "UNESCO World Heritage cultural sites — Kathmandu Durbar Square, Bhaktapur, Patan, Swayambhunath, Pashupatinath, Boudhanath, Lumbini.",
    icon: "landmark",
  },
  {
    id: "activity",
    name: "Special Adventure Activity",
    whenRequired:
      "White-water rafting, paragliding, ultralight flights, bungee jumping. Usually bundled into vendor prices.",
    icon: "activity",
  },
];

// ═══════════════════════════════════════════════════════════════
// DECISION GUIDE
// ═══════════════════════════════════════════════════════════════

export const DECISION_GUIDE = [
  { tripType: "City tour only (Kathmandu, Pokhara)", permits: "Tourist Visa" },
  {
    tripType: "Everest / Annapurna trek",
    permits: "Visa + Park Permit + Local Municipality Fee",
  },
  {
    tripType: "Langtang / other NP trek",
    permits: "Visa + Park Permit + TIMS",
  },
  {
    tripType: "Restricted area trek (Mustang, Manaslu)",
    permits: "Visa + RAP + Park Permit + TIMS",
  },
  {
    tripType: "Peak climbing (5,800m+)",
    permits: "Visa + Mountaineering Permit + Park Permit",
  },
  {
    tripType: "Drone / professional filming",
    permits: "Visa + Drone or Filming Permit",
  },
  {
    tripType: "Adventure sports (rafting, paragliding)",
    permits: "Visa + Local Activity Fee (usually bundled)",
  },
];