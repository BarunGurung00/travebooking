# ai.md — MyHimalayanTrip Project Context

**Read this fully before writing code. Do not scan the codebase — everything you need is here.**
Last updated: 2026-10 (repo snapshot)

---

## 1. WHAT THIS PROJECT IS

**Name:** MyHimalayanTrip
**Type:** Nepal travel + treks directory & planner (TripAdvisor-style, Nepal-only)
**Stage:** Phase 6 complete (auth, data, search, geo pages, POI pages, reviews, wishlist).
**Owner:** Solo dev (Barun). **Local path:** `/Users/barun/Desktop/my-ota` **Local URL:** `http://localhost:3000`
**Long-term:** OTA features (bookings, payments, vendors) — reviews + wishlist are current community features.

---

## 2. STACK (LOCKED VERSIONS — DO NOT UPGRADE)

| Layer | Tech | Version |
|---|---|---|
| Framework | Next.js App Router (Turbopack) | **16.3.8** |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | **v4** (inline utilities, no config file) |
| Icons | lucide-react | latest |
| Auth | Auth.js (NextAuth v5) | beta.32 |
| ORM | Prisma | **6.19.3 — DO NOT go to v8 RC** (v8 renames migrate→migration) |
| DB | MySQL | 9.2.0 local |
| Hash | bcryptjs | latest |
| Mapping | mapbox-gl + react-map-gl | installed |

---

## 3. DIRECTORY MAP (what exists)
my-ota/
├── auth.ts ← Auth.js: Google + Credentials, JWT sessions
├── lib/
│ ├── prisma.ts ← PrismaClient singleton (import from here ALWAYS)
│ ├── geo.ts ← buildBreadcrumb, sectionUrl, poiUrl, poiCategoryKey
│ ├── sections.ts ← SECTIONS array + getSectionByKey
│ └── permit.ts ← permit breadcrumb/url helpers
├── prisma/
│ ├── schema.prisma ← User, Account, Session, VerificationToken, Geo, Poi, Review, Permit, Wishlist
│ ├── seed.ts ← 31 geos, 30 POIs (structured IDs)
│ ├── seed-permits.ts ← permit categories/subcategories/permits batch 1
│ └── seed-permits-batch2.ts ← RAPs, municipalities, climbing, special clearances
├── types/next-auth.d.ts ← Session.user.id + role
├── app/
│ ├── layout.tsx ← SessionProvider > WishlistProvider > header + main + footer
│ ├── page.tsx ← Homepage (hero tabs + SearchBox + directory grid) — "use client"
│ ├── [slug]/page.tsx ← CATCH-ALL: geo section pages AND POI pages (regex parsed)
│ ├── api/
│ │ ├── auth/[...nextauth]/route.ts
│ │ ├── signup/route.ts ← POST email/password
│ │ ├── search/route.ts ← GET ?q= geos+POIs
│ │ ├── reviews/route.ts ← GET ?poiId= / POST
│ │ ├── profile/route.ts ← PATCH name/email
│ │ ├── wishlist/route.ts ← GET list / POST save
│ │ ├── wishlist/[poiId]/route.ts ← DELETE
│ │ ├── wishlist/ids/route.ts ← GET id-only list
│ │ └── permits/search/route.ts ← GET ?q= permits (raw SQL)
│ ├── components/
│ │ ├── SiteHeader.tsx, SiteFooter.tsx, AuthButtons.tsx (avatar dropdown)
│ │ ├── SearchBox.tsx (debounced typeahead), SectionTabs.tsx, Breadcrumb.tsx
│ │ ├── PoiCatalog.tsx, EmptySection.tsx, PlaceholderPage.tsx
│ │ ├── poi/ PoiCard, PoiHero, PoiInfo
│ │ ├── review/ ReviewForm, ReviewList
│ │ ├── profile/ ProfileForm
│ │ ├── wishlist/ WishlistButton, WishlistCard, WishlistProvider
│ │ └── permits/ ~20 permit-specific components
│ ├── Destinations/ Hotels/ Treks/ Transport/ Guides/ ← catalog pages (server, use PoiCatalog)
│ ├── Nepal-Permits/ ← content.ts + layout + page + [category]/[subcategory]/[slug] tree
│ ├── login/ signup/ ← auth pages (client)
│ ├── Profile/ Wishlist/ ← real pages (auth-gated server components)
│ ├── Bookings/ Trips/ ← PlaceholderPage "coming soon"
│ └── error.tsx loading.tsx not-found.tsx globals.css

text

---

## 4. CRITICAL ARCHITECTURAL DECISIONS (DO NOT VIOLATE)

### 4.1 Single catch-all `[slug]` — NO separate `[geo]` / `[poi]` folders
Next.js forbids two sibling dynamic folders with different names. One route handles both.

**Regex parsing (exact):**
- POI: `^([A-Za-z]+)_Review-g(\d+)-d(\d+)-(.+)$` → e.g. `Trek_Review-g97710301-d100001-everest-base-camp-trek`
- GEO: `^([A-Za-z]+)-g(\d+)-(.+)$` → e.g. `Tourism-g97740501-pokhara`

### 4.2 Geo ID scheme (government-backed, locked)
977 = Nepal
9771–9777 = Provinces 1–7
977 + CBS district code = District (e.g. 977306 = Kathmandu)
district + 2-digit seq = City (e.g. 97730601 = Kathmandu city)

text
No `place` level in Geo — Thamel/EBC/Phewa are POIs with category `place`.

### 4.3 POI ID blocks (6 digits, first digit = category)
1xxxxx trek · 2xxxxx hotel · 3xxxxx restaurant · 4xxxxx transport
5xxxxx guide · 6xxxxx permit · 7xxxxx place

text

### 4.4 Auth
- Auth.js v5, Prisma adapter, **JWT sessions** (not DB)
- Google (`allowDangerousEmailAccountLinking: true`) + Credentials (bcrypt)
- Session callback injects `id`, `role`; JWT callback refreshes role/image from DB
- Sign out lives INSIDE the avatar dropdown, not in the header
- Google users show Google picture; email users show initial in sky-600 circle

### 4.5 URL builders (use these, never hand-roll)
- Section: `sectionUrl(key, geo)` → `/{Key}-g{geoId}-{slug}`
- POI: `poiUrl(poi, geo)` → `/{CapitalizedCategory}_Review-g{geoId}-d{poiId}-{slug}`

### 4.6 Section tabs behavior
- Tabs: Tourism (overview, category=null) + Hotels/Treks/Transports/Guides/Permits
- **Tourism tab label = geo.name** (e.g. "Pokhara"), icon = `MapPinned`
- Count badges via `prisma.poi.groupBy`; **empty sections still show** with `<EmptySection />`
- Icons are lucide-react components, NEVER emojis

### 4.7 Sticky footer
`body > SessionProvider > WishlistProvider > div.flex.flex-col.min-h-[100dvh]`
middle wrapper is `flex-1 flex flex-col pt-16`. Header is `fixed top-0`, hence `pt-16`.

---

## 5. DATA MODEL (Prisma — key relations)
User 1:N Account, Session, Review, Wishlist
Geo 1:N Poi (geoId unique per parentId+slug)
Geo 1:N Geo (self-tree via parentId)
Poi 1:N Review, Wishlist (unique [geoId, slug])
Review: @@unique([userId, poiId]) ← one review per user per POI
Wishlist: @@unique([userId, poiId])
Permit self-tree (type: category | subcategory | permit)

text

**Rating recompute:** after POST `/api/reviews`, run aggregate avg and update `Poi.rating`.

---

## 6. API CONTRACT SUMMARY

| Route | Method | Auth | Returns |
|---|---|---|---|
| `/api/signup` | POST | — | `{user}` 201 / `{error}` 4xx |
| `/api/search?q=` | GET | — | `{results:[{type,id,name,type_detail,slug,url,subtitle}]}` |
| `/api/reviews?poiId=` | GET | — | `{reviews}` |
| `/api/reviews` | POST | ✅ | `{review}` 201; 409 dup; 401 no auth |
| `/api/profile` | PATCH | ✅ | `{user}` |
| `/api/wishlist` | GET/POST | ✅ | `{items}` / `{success}` |
| `/api/wishlist/[poiId]` | DELETE | ✅ | `{success}` |
| `/api/wishlist/ids` | GET | ✅(soft) | `{ids:[]}` (empty if logged out) |
| `/api/permits/search?q=` | GET | — | `{results}` |

Convention: write endpoints check `await auth()`, return 401 early; errors are `{error: string}`; success POSTs are 201.

---

## 7. CODING CONVENTIONS

**Server vs client:** server by default. Add `"use client"` only for hooks/state/events/`useSession`/`signIn`/`useRouter`.

**Next.js 16 gotchas:**
- `params` and `searchParams` are **Promises** — always `await` them
- `cookies()`, `headers()`, `draftMode()` are Promises

**Tailwind:** sky-600 = primary accent; slate neutrals; `rounded-xl` inputs/buttons, `rounded-3xl` cards; focus `focus:border-sky-600 focus:ring-2 focus:ring-sky-100`; headings `font-extrabold/black`.

**Prisma:** always `import { prisma } from "@/lib/prisma"`. `select` specific fields. `groupBy` for counts. `await` in server components.

**Forms (client):** `useState` fields + `loading` + `error` + optional `success` (auto-hide 3s); on success `router.refresh()`.

---

## 8. KNOWN ISSUES / OPEN ITEMS

1. **OAuth-only login via credentials** — Google-created accounts have `passwordHash = null`; email/password login fails with generic "Invalid email or password". Planned: throw `oauth_only_account` in `authorize()`, surface a "use Continue with Google" message in `login/page.tsx`.
2. **`lib/geo.ts`** — ensure only ONE `poiUrl` (the category-specific one). If a legacy `/Poi_Review-...` version exists, delete it.
3. Old `/Poi_Review-...` URLs still resolve via regex but don't canonical-redirect (optional enhancement).
4. `next/image` migration not done — `<img>` still used (header avatar, review list, profile, permit images).
5. Placeholder pages still pending real data: `/Bookings`, `/Trips`.

---

## 9. VERIFIED WORKING (do not "fix")

Homepage + tabs + SearchBox → geo pages (breadcrumb/tabs/cards) → POI pages (hero/info/about/reviews) → write review (dup check, rating recompute) → signup/login email + Google → header avatar dropdown → profile edit → wishlist (heart buttons, provider, page) → permits tree (categories → subcategories → permit detail with FAQs/checkpoints) → canonical slug redirects → empty-section states.

---

## 10. NEXT STEPS (priority order)

1. Auth polish: OAuth-only error message; verify single `poiUrl` (30–40 min)
2. Real **Bookings** (Booking table, form on POI, `/Bookings` list) — 3–4 h
3. Real **Trip Planner** (Trip/TripItem tables, day-by-day) — 4–5 h
4. Facebook OAuth (15 min: env + provider + button)
5. Deploy: Neon Postgres + Vercel + production OAuth redirect URIs

---

## 11. HARD RULES (do NOT do)

- ❌ Upgrade Prisma past 6.x
- ❌ Create `[geo]`/`[poi]` folders — one `[slug]` only
- ❌ Hide empty section tabs
- ❌ Put logout in the header (it's in the dropdown)
- ❌ Use `mt-auto` on footer (flex-1 middle wrapper is the pattern)
- ❌ Paste secrets in chat / commit `.env`
- ❌ Change ID schemes or reseed IDs (URLs reference them)
- ❌ Emoji icons in section tabs (lucide only)
- ❌ New API route just for a server-side Prisma read

## 12. ALWAYS do

- ✅ `await params` / `await searchParams`
- ✅ Use `poiUrl()` and `sectionUrl()` helpers
- ✅ Auth-check every write endpoint (401 early)
- ✅ Recompute `Poi.rating` after review mutations
- ✅ Use Prisma singleton from `@/lib/prisma`
- ✅ Test after each change; show complete files (user pastes whole files, not diffs)

---

## 13. RESPONSE STYLE FOR THIS USER

- Explain the **why** before the code
- **One phase at a time** — never dump multiple phases
- Show **whole files** when editing (not diffs)
- End every change with **how to test it**
- Use **tables** for comparisons; **warn** about security
- Recap visually at the end; ask "did it work?" before moving on

---

## 14. ENV VARS (names only — values live in `.env`, never shared)
DATABASE_URL, AUTH_SECRET, AUTH_URL, AUTH_TRUST_HOST,
AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

text
Note: MySQL password contains `@` → URL-encoded as `%40` in `DATABASE_URL`.

---

**End of ai.md.** If something is ambiguous, ask the user — do not invent schema, IDs, or routes.