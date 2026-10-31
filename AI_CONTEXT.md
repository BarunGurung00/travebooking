# AI_CONTEXT.md — MyHimalayanTrip Project Handoff

This file is the source of truth for any AI session working on this project.
Read it fully before writing any code. Update it when major decisions are made.

**Last updated:** 2026-10-31

---

## 0. HOW TO USE THIS FILE (READ FIRST)

If you are a new AI session:
1. Read this entire file before doing anything.
2. Reply with: "I've read AI_CONTEXT.md. Here's what I understand: [tech stack], [last 3 things built], [what's broken], [what's next]."
3. Wait for the user's instruction before writing code.
4. Test after every change.
5. Update this file when a major decision is made.

**Full conversation history:**
https://chat.deepseek.com/share/ryuxg4gf4hruktx387


---

## 1. PROJECT OVERVIEW

**Name:** MyHimalayanTrip
**Type:** Nepal travel & treks directory + planner (TripAdvisor-style)
**Stage:** Permits system (4 levels), Wishlist, and Directus CMS all built and working **locally**. Deploy to production is deliberately **deferred**.

**Long-term vision:**
- Nepal-specific travel planner (Himalayas, hills, Terai — all of Nepal)
- OTA features eventually (bookings, payments, vendor accounts)
- Reviews + wishlist are the current community features

**Owner:** Barun (solo developer)
**Local path:** `/Users/barun/Desktop/my-ota`
**Local URL:** `http://localhost:3000`
**Directus CMS:** `http://localhost:8055`

**Explicit user preference — Deploy deferred:**
The user chose to NOT deploy yet. Priority is (1) getting modular seeds working cleanly, then (2) filling permit content, then (3) deploying as a batch. Do NOT push to Aiven/Vercel or run `prisma migrate deploy` against production without explicit confirmation.

---

## 2. TECH STACK

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router (Turbopack) | 16.3.8 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | v4 |
| Icons | lucide-react | latest |
| Auth | Auth.js (NextAuth v5) | beta |
| ORM | Prisma | 6.19.3 (STABLE — NOT v8 RC) |
| DB (dev) | MySQL | 9.2.0 (local) |
| DB (prod) | Aiven MySQL | 8.4.11 |
| Password | bcryptjs | latest |
| CMS | Directus (Docker) | 11.17.0 |
| Container | Docker Desktop | 29.9.2 |
| Compose | Docker Compose | v5.6.1 |

**CRITICAL:** Do NOT upgrade Prisma to v8 RC. Stay on 6.x. v8 renamed `prisma migrate` → `prisma migration`.

---

## 3. DIRECTORY STRUCTURE
my-ota/
├── .env
├── auth.ts ← Auth.js config
├── package.json ← has "prisma": { "seed": "tsx prisma/seed.ts" }
│
├── prisma/
│ ├── schema.prisma ← User, Account, Session, VerificationToken, Geo, Poi, Review, Permit, Wishlist
│ ├── seed.ts ← CURRENTLY STILL HAS geos + POIs inline. Needs to become orchestrator.
│ ├── seed-permits.ts ← DEPRECATED — delete after verification
│ ├── seed-permits-batch2.ts ← DEPRECATED — delete after verification
│ ├── migrations/
│ └── seeds/
│ └── permit/
│ ├── categories.ts ← STATUS UNKNOWN — verify exists
│ ├── visa-tims.ts ← STATUS UNKNOWN — verify exists
│ ├── national-parks.ts ← STATUS UNKNOWN — verify exists
│ ├── restricted-areas.ts ← STATUS UNKNOWN — verify exists
│ ├── local-municipality.ts ← STATUS UNKNOWN — verify exists
│ ├── climbing.ts ← STATUS UNKNOWN — verify exists
│ └── special-clearances.ts ← CONFIRMED CREATED this session
│
├── lib/
│ ├── prisma.ts ← PrismaClient singleton
│ ├── geo.ts ← buildBreadcrumb, sectionUrl, poiUrl, poiCategoryKey
│ ├── permit.ts ← buildPermitBreadcrumb
│ └── sections.ts ← SECTIONS array
│
├── types/next-auth.d.ts ← Session type extensions (id, role)
│
├── directus-local/
│ ├── docker-compose.yml
│ ├── uploads/
│ └── extensions/
│
├── public/permits/ ← permit images
│ ├── tims-card.png
│ ├── sagarmatha-np.jpg
│ ├── acap.jpg
│ ├── khumbu-municipality.jpeg
│ └── rap.jpg
│
└── app/
├── layout.tsx ← SessionProvider + WishlistProvider + SiteHeader + SiteFooter
├── page.tsx ← Homepage
├── globals.css
│
├── Nepal-Permits/ ← 4-level permit system
│ ├── content.ts ← static editorial data
│ ├── page.tsx ← hub (9 sections + sticky TOC + search)
│ └── [category]/
│ ├── page.tsx ← subcategory listing
│ └── [subcategory]/
│ ├── page.tsx ← permit cards list
│ └── [slug]/page.tsx ← permit detail
│
├── [slug]/page.tsx ← CATCH-ALL for geo pages + POI pages (regex parsing)
├── profile/page.tsx
├── login/page.tsx
├── signup/page.tsx
├── wishlist/page.tsx ← real wishlist with items + empty state
├── Destinations/page.tsx
├── Treks/page.tsx
├── Transport/page.tsx
├── Guides/page.tsx
│
├── api/
│ ├── auth/[...nextauth]/route.ts
│ ├── signup/route.ts
│ ├── search/route.ts
│ ├── reviews/route.ts
│ ├── profile/route.ts
│ ├── permits/search/route.ts ← raw SQL on Permit (name + aliases JSON + description)
│ └── wishlist/
│ ├── route.ts ← GET list, POST save
│ ├── ids/route.ts ← GET just IDs
│ └── [poiId]/route.ts ← DELETE
│
└── components/
├── SiteHeader.tsx
├── SiteFooter.tsx
├── AuthButtons.tsx
├── SearchBox.tsx
├── Breadcrumb.tsx
├── SectionTabs.tsx
├── EmptySection.tsx
├── PlaceholderPage.tsx
├── poi/{PoiCard, PoiHero, PoiInfo}.tsx
├── review/{ReviewForm, ReviewList}.tsx
├── profile/ProfileForm.tsx
├── wishlist/
│ ├── WishlistProvider.tsx
│ ├── WishlistButton.tsx
│ └── WishlistCard.tsx
└── permits/
├── PermitCategoryCard.tsx
├── PermitSubCategoryCard.tsx
├── PermitListCard.tsx
├── PermitDetail.tsx
├── PermitOverviewCard.tsx
├── PermitSearch.tsx
├── PermitMatrix.tsx
├── PermitLocationCard.tsx
├── PermitImageCard.tsx
├── PermitLightbox.tsx
├── PermitPhoto.tsx
├── PermitWhoNeeds.tsx
├── PermitCheckpoints.tsx
├── PermitFAQs.tsx
├── DecisionGuide.tsx
├── SecondaryClearancesTable.tsx
├── PermitDetailBlock.tsx
└── PermitPaper.tsx

text

---

## 4. KEY ARCHITECTURAL DECISIONS

### 4.1 URL Schemes (locked in)

**Geo pages (places):**
/Tourism-g{geoId}-{slug} ← overview
/Hotels-g{geoId}-{slug}
/Treks-g{geoId}-{slug}
/Transports-g{geoId}-{slug}
/Guides-g{geoId}-{slug}
/Permits-g{geoId}-{slug}

text

**POI pages (things):**
/<Category>_Review-g{geoId}-d{poiId}-{slug}

text

**Permit pages (4-level):**
/Nepal-Permits
/Nepal-Permits/[category]
/Nepal-Permits/[category]/[subcategory]
/Nepal-Permits/[category]/[subcategory]/[slug]

text

**CRITICAL ROUTING RULES:**
- Geo + POI: one catch-all at `app/[slug]/page.tsx` with regex parsing
- Permits: 4 nested dynamic folders under `app/Nepal-Permits/`
- DO NOT create separate `[geo]` and `[poi]` folders at same level — Next.js forbids
- DO NOT create `[category]` and `[subcategory]` as siblings — must be nested
- `app/[slug]/page.tsx` does NOT catch `/Nepal-Permits/*` because `/Nepal-Permits` is a static folder under `app/`. Verify before changing either route.

**Regex (critical):**
- POI: `^([A-Za-z]+)_Review-g(\d+)-d(\d+)-(.+)$`
- GEO: `^([A-Za-z]+)-g(\d+)-(.+)$`

### 4.2 Geo ID Scheme (Government-backed)
977 ← Nepal (country code)
9771-9777 ← Provinces
977 + gov_district_code ← Districts (e.g., 977306 = Kathmandu)
977 + district + XX ← Cities

text

NO `place` level in Geo. Places are POIs with `category = 'place'`.

### 4.3 POI ID Scheme (Category blocks)
100000-199999 Trek
200000-299999 Hotel
300000-399999 Restaurant
400000-499999 Transport
500000-599999 Guide
600000-699999 Permit
700000-799999 Place

text

### 4.4 Permit ID Scheme (Self-referencing tree)

`Permit` table has `parentId` (nullable self-reference):
- `type = 'category'` → 4 root rows (entry, trekking, climbing, special), `parentId = null`
- `type = 'subcategory'` → child of category
- `type = 'permit'` → child of subcategory

**Type hierarchy enforced in code, not DB.**

`@@unique([parentId, slug])` — slug unique per parent.

**Known parent IDs in local DB (may differ on Aiven):**
- `tourist-visa` subcategory → 1 (child of entry)
- `tims` subcategory → 6
- `protected-area` subcategory → 7
- `restricted-area` subcategory → 8
- `local-municipality` subcategory → 9
- `trekking-peaks` subcategory → 10
- `expedition-peaks` subcategory → 11
- `drone` subcategory → 12
- `filming` subcategory → 13
- `heritage` subcategory → 14
- `adventure` subcategory → 15

(Verify with `SELECT id, slug FROM Permit WHERE type = 'subcategory'` before relying on these.)

### 4.5 Auth Architecture

- Auth.js v5 with Prisma adapter
- JWT sessions (not DB sessions)
- Google OAuth (`allowDangerousEmailAccountLinking: true`, scope `openid email profile`, `prompt: consent`)
- Credentials (email/password with bcrypt)
- `signIn` callback forces `user.image = profile.picture` for Google
- `jwt` callback fetches fresh `role` + `image` from DB
- `session` callback injects `id`, `role`, `picture`

### 4.6 Data Model Relationships
User 1:N Account, Session, Review, Wishlist
Geo 1:N Poi (via geoId)
Geo 1:N Geo (self-reference via parentId)
Poi 1:N Review, Wishlist
Permit 1:N Permit (self-reference via parentId)

text

Constraints:
- `Review`: `@@unique([userId, poiId])`
- `Permit`: `@@unique([parentId, slug])`
- `Wishlist`: `@@unique([userId, poiId])`

### 4.7 Sticky Layout

```tsx
<body className="min-h-[100dvh] bg-[#f8f9fa]">
  <SessionProvider>
    <WishlistProvider>
      <div className="min-h-[100dvh] flex flex-col">
        <SiteHeader />                          {/* fixed top-0 h-16 z-50 */}
        <div className="flex-1 flex flex-col pt-16">{children}</div>
        <SiteFooter />
      </div>
    </WishlistProvider>
  </SessionProvider>
</body>
SiteHeader is fixed (not sticky) — requires pt-16 on content wrapper

scroll-mt-32 on all anchor-target sections (128px clears header)

WishlistProvider wraps entire app (client component, fetches saved IDs on mount)

4.8 Search Bars (two of them)
Homepage Search (app/components/SearchBox.tsx):

Searches Geo + POI via /api/search?q=

Debounce 200ms, AbortController

Permit Search (app/components/permits/PermitSearch.tsx):

Searches Permit via /api/permits/search?q=

Overlay with backdrop on focus

Recommendations (5 popular permits + 4 category links) when focused but empty

Results when 2+ chars typed

Matches on name, aliases (JSON via JSON_EXTRACT), description

5. FEATURES COMPLETED
✅ Geo + POI (Phases 1–5)
31 geos, 30 POIs in DB

/api/search?q= returns geos + POIs

Destination pages: breadcrumb, section tabs, POI cards, empty states

POI detail pages: hero, info grid, about, reviews

✅ Reviews (Phase 6)
Review table, one per user per POI

POST recomputes POI average rating

ReviewForm + ReviewList

✅ Auth
Email/password signup + login

Google OAuth with auto-linking

Profile picture saved from Google

Header dropdown (Profile, Bookings, Trips, Wishlist, Sign out)

Profile page with edit form

✅ Permits System (4 levels)
DB: 4 categories, 11 subcategories, ~47 permits (17 originals have partial content; 9 new batch2 permits have full content)

Routes: hub → category → subcategory → permit detail

Hub page: 9 sections + sticky TOC + search

Detail page: photo placeholder, about, who-needs/who-doesnt, cost, where, checkpoints, documents, validity, notes, FAQs, related permits, last-updated date

Search: /api/permits/search?q= raw SQL + JSON alias matching

Search UI: PermitSearch overlay component

✅ Wishlist
Wishlist table (userId, poiId, createdAt)

WishlistProvider — savedIds: Set<number>, toggle(), isSaved()

3 endpoints: /api/wishlist, /api/wishlist/ids, /api/wishlist/[poiId]

Heart button on PoiCard + PoiHero (absolute positioned, outside Link)

/wishlist page: real saved items, remove button, empty state with CTA links

Optimistic updates with revert on failure

✅ Directus CMS (local only)
Docker at localhost:8055

Connected to local MySQL via host.docker.internal

Repeater interfaces: faqs, quickSummary, costDetails

Tags interfaces: whoNeeds, whoDoesnt, checkedAt, aliases, whereToGet, documents, relatedSlugs

Markdown for longDescription

Datetime for lastVerified

Workaround: parentId is manual number entry — Directus can't convert existing Int to Many-to-One relation

⚠️ Modular Seeds (IN PROGRESS)
prisma/seed.ts currently has geos + POIs inline (31 geos + 30 POIs). It is NOT yet the orchestrator.

prisma/seeds/permit/special-clearances.ts — CONFIRMED created (module exports seedSpecialClearances(prisma))

Other 6 permit modules — status unknown, must verify with ls prisma/seeds/permit/

prisma/seeds/geo/nepal.ts and prisma/seeds/poi/core.ts — DO NOT EXIST yet

package.json has "prisma": { "seed": "tsx prisma/seed.ts" }

6. KNOWN ISSUES
Issue 1 — Duplicate Tsum Valley Rows
Row id=33: slug='tsum-valley-restricted-area', parentId=7 (WRONG — under protected-area)

Row id=34: slug='tsum-valley', parentId=8 (CORRECT — under restricted-area)

Possible THIRD duplicate if batch2 seed created slug='tsum-valley' again

Verify: SELECT id, slug, parentId FROM Permit WHERE slug LIKE '%tsum%';

Fix: Keep only the row with slug='tsum-valley', parentId=<restricted-area.id>. Delete others.

Issue 2 — Old Seed Files Still Exist
prisma/seed-permits.ts and prisma/seed-permits-batch2.ts still on disk

Fix: Delete after verifying new modular seeds run clean

Issue 3 — 17 Original Permits Have Partial Content
Missing: longDescription, whoNeeds, whoDoesnt, checkedAt, faqs, lastVerified

Only 9 batch2 permits (Tsum, Nar Phu, Humla, Lower Dolpo, Makalu Barun, Shey Phoksundo, Bardia, Shivapuri, KCAP) have full content

Fix: Write content via Directus or extend seeds

Issue 4 — Directus parentId Not a Dropdown
Directus can't convert Int field to Many-to-One relation after creation

Workaround: Enter Parent ID manually (see section 4.4 for known IDs)

Issue 5 — Production is Stale
Aiven has old schema (before permits/wishlist)

Vercel deployed with old code (only up to auth phase)

Deferred per user preference — do not deploy without explicit confirmation

Issue 6 — Email/Password Login on Google-Only Account
Expected behavior (no passwordHash). Error message misleading.

Fix (unapplied): Throw Error("oauth_only_account") in authorize() when !user.passwordHash; catch and show friendly message in login page

Issue 7 — Possible Duplicate poiUrl in lib/geo.ts
Verify. Only one should exist (the /${poiCategoryKey(category)}_Review-... version)

Fix: Delete the old /Poi_Review-... version if present

Issue 8 — Seeds Not Fully Modular Yet ⚠️ CRITICAL
prisma/seed.ts still contains geos + POIs inline (31 geos + 30 POIs) — NOT an orchestrator

Only prisma/seeds/permit/special-clearances.ts is confirmed created

Other 6 permit modules (categories, visa-tims, national-parks, restricted-areas, local-municipality, climbing) — verify with ls prisma/seeds/permit/

prisma/seeds/geo/nepal.ts and prisma/seeds/poi/core.ts — DO NOT EXIST

Orchestrator does NOT yet call the permit modules

Fix:

Create missing permit modules (verify each)
Create seeds/geo/nepal.ts (extract geos array from current seed.ts)
Create seeds/poi/core.ts (extract pois array from current seed.ts)
Rewrite prisma/seed.ts to orchestrate: seedGeos → seedPois → seedCategories → seedVisaTims → seedNationalParks → seedRestrictedAreas → seedLocalMunicipality → seedClimbing → seedSpecialClearances
Delete seed-permits.ts and seed-permits-batch2.ts
7. IMMEDIATE NEXT STEPS (priority order)
A. Complete Modular Seed Reorg (1–2 hrs)
ls prisma/seeds/permit/ — confirm which of 7 files exist

Create any missing permit modules

Create prisma/seeds/geo/nepal.ts — export seedGeos(prisma)

Create prisma/seeds/poi/core.ts — export seedPois(prisma)

Rewrite prisma/seed.ts as orchestrator (imports + sequential await)

Run npx prisma db seed

Verify counts: 4 / 11 / ~47

Delete seed-permits.ts + seed-permits-batch2.ts

Cleanup: DELETE FROM Permit WHERE id = 33; (and any other Tsum duplicates)

B. Fill Content for 17 Original Permits (2–3 hrs)
Sagarmatha, ACAP, Langtang, Chitwan, TIMS, Visa, Upper Mustang, Manaslu, Upper Dolpo, Kanchenjunga, Khumbu, NMA, MoCTCA, Drone, Filming, Heritage, Adventure

Use Directus or extend seeds with full longDescription, whoNeeds, whoDoesnt, checkedAt, faqs, lastVerified

C. Deploy to Production (1–2 hrs) — DEFERRED, requires confirmation
Fix Aiven updatedAt default:

sql
ALTER TABLE Permit MODIFY COLUMN updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3);
Switch .env to Aiven

npx prisma db push

npx prisma db seed

Verify Aiven counts

Switch .env back to local

git add . && git commit -m "Add permits system + wishlist" && git push

Verify Vercel deploy at https://myhimalayantrip.com

D. Build Bookings Feature (3–4 hrs) — later
E. Build Trip Planner (4–5 hrs) — later
8. CODING PATTERNS & CONVENTIONS
8.1 Client vs Server Components
Server by default — no "use client" unless needed

"use client" required when using: useState, useEffect, useSession, signIn, signOut, event handlers, useRouter

Server components prefer auth() over useSession()

8.2 Next.js 16 Notes
params is a Promise — always await params

searchParams is a Promise — always await searchParams

cookies(), headers(), draftMode() are Promises

Route names can't mix literal text with brackets at same level

8.3 Tailwind
Sky-600 = primary accent

Slate = neutral palette

rounded-3xl for cards, rounded-xl for inputs

font-extrabold for headings, font-bold for buttons

8.4 Prisma
Always use prisma singleton from @/lib/prisma

Use select when possible

upsert for idempotent inserts

@@unique([parentId, slug]) for permit slug uniqueness

8.5 API Routes
POST returns { error } on 4xx/5xx, { resource } on 201

GET returns { resources: [] } or { resource }

Auth-check write endpoints with await auth()

Log unexpected errors with console.error

8.6 Forms
useState for fields, loading, error

router.refresh() on success (server data)

router.push(callbackUrl || "/") for navigation

9. THINGS A NEW AI SESSION MUST KNOW
9.1 DO NOT
Upgrade Prisma to v8

Create [geo] and [poi] folders at same level

Create [category] and [subcategory] as siblings (must be nested)

Hide empty section tabs

Put logout button in header (it's in the dropdown)

Use mt-auto on footer (use flex-1 on middle wrapper)

Paste secrets in chat

Change the geo ID scheme (977 + gov code + sequence)

Modify seed IDs (referenced by URLs)

Use <img> in production (use next/image with domain whitelist — not done yet)

Put images in app/ — must go in public/

Deploy to Aiven/Vercel without explicit user confirmation

Assume modular seeds are complete — verify prisma/seeds/permit/ first

9.2 DO
Use await params in all Next.js 16 routes

Use category-specific POI URLs (/<Category>_Review-...)

Recompute Poi.rating after review POST/DELETE

Show count badges in tabs

Use router.refresh() after form submit

Auth-check write endpoints

Use Prisma singleton

Read this file first before writing code

Use scroll-mt-32 for anchor targets

9.3 Files that must stay separated
Geo + POI pages → app/[slug]/page.tsx (ONE catch-all)

Permit pages → app/Nepal-Permits/* (4 nested dynamic folders)

10. ENVIRONMENT VARIABLES & ACCESS
Local .env
text
DATABASE_URL="mysql://root:Alwaysbg%40123@localhost:3306/myhimalayantrip"
AUTH_SECRET="<32-byte-base64>"
AUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST=true
AUTH_GOOGLE_ID="<google-client-id>"
AUTH_GOOGLE_SECRET="<google-client-secret>"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="<mapbox>"
Password contains @ → URL-encode as %40 in DATABASE_URL (Prisma only, NOT Directus).

Prod (Vercel) — not yet updated
text
DATABASE_URL="mysql://avnadmin:<pw>@mysql-mht-barungurung00-41db.f.aivencloud.com:21810/defaultdb?ssl-mode=REQUIRED"
AUTH_SECRET="<same>"
AUTH_URL="https://myhimalayantrip.com"
AUTH_TRUST_HOST=true
AUTH_GOOGLE_ID="<same>"
AUTH_GOOGLE_SECRET="<same>"
Directus Admin (local)
URL: http://localhost:8055

Email: barungurung00@gmail.com

Password: ChooseAStrongPassword123!

Note: Local only — do not use for production. Rotate before any public deploy.

MySQL (local)
Host: localhost:3306

User: root

Password: Alwaysbg@123 (URL-encoded: Alwaysbg%40123 for Prisma only)

DB: myhimalayantrip

11. COMMANDS
bash
# Dev server
npm run dev                              # localhost:3000

# Prisma
npx prisma generate
npx prisma db push                       # local schema sync
npx prisma db seed                       # runs prisma/seed.ts
npx prisma migrate deploy                # ONLY if user explicitly confirms prod deploy

# MySQL
brew services start mysql                # start when starting work
brew services stop mysql                 # stop when done (saves battery)
mysql -u root -p -e "USE myhimalayantrip; ..."

# Directus (Docker)
cd ~/Desktop/my-ota/directus-local
docker compose up -d                     # start (localhost:8055)
docker compose down                      # stop
docker compose logs -f directus          # tail logs

# Aiven (production DB) — only when user explicitly asks
mysql -h mysql-mht-barungurung00-41db.f.aivencloud.com -P 21810 -u avnadmin -p --ssl-mode=REQUIRED
12. FIXED ISSUES (do not re-solve)
✅ VerificationToken needs id Int @id @default(autoincrement()) — Aiven requires PK on every table

✅ Prisma 6.19.3 pinned — Prisma 8 RC breaks migrate dev

✅ Local MySQL updatedAt has DB default — ran ALTER TABLE Permit MODIFY COLUMN updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3); this is required for Directus to insert rows without needing to specify updatedAt. If local DB is ever reset, re-run this ALTER before using Directus.

✅ Aiven updatedAt needs same DB default (not yet applied — will run at deploy time)

✅ Next.js 16 params is Promise — always await params

✅ Google OAuth scope openid email profile + prompt: consent

✅ Directus bootstrap fails on .local TLD → use @example.com style emails

✅ Directus password must be unencoded (Alwaysbg@123 not %40)

✅ Directus parentId can't be converted to relation → manual entry

✅ Docker CLI needs PATH entry in ~/.zshrc

✅ Images must go in public/permits/ NOT app/Nepal-Permits/images/

✅ Footer sticky: min-h-[100dvh] on layout + flex-1 on middle wrapper

✅ Anchor scroll: scroll-mt-32 on all targets

✅ Next.js forbids two dynamic folders with different names at same level ([geo] + [poi]) — fixed via single [slug] + regex parsing

13. STYLE GUIDE FOR RESPONSES
Explain before code — user values understanding, not just working code

One phase at a time — never dump multiple phases

Show the whole file — user pastes whole files, not diffs

Include testing steps — every change ends with "how to test"

Confirm before moving on — ask "did it work?"

Use tables — user likes structured comparisons

Explain "why" — every decision has reasoning

Keep it tight — no filler

Warn about security — no secrets in chat, URL-encode passwords, rotate exposed credentials

Visual summaries at the end — user likes recap tables

14. CURRENT PROJECT STATE — LAST UPDATED 2026-10-31
Working Locally
✅ Auth (email + Google, profile picture, dropdown)

✅ Geo + POI (search, destination pages, POI detail, reviews)

✅ Permits (4 levels, ~47 permits, search, hub with 9 sections + TOC)

✅ Wishlist (heart button, /wishlist page, provider context)

✅ Directus CMS (localhost:8055, editing Permit table with Repeater/Tags)

⚠️ Modular seeds — partially done (only special-clearances confirmed)

✅ Sticky footer + fixed header work on all pages

Not Deployed (deferred by user choice)
Everything built since auth phase (permits, wishlist, search API v2) is local only

Aiven has old schema

Vercel has old code

Immediate Blocker
Complete modular seed reorg (see Issue 8, Section 7-A)

Verify which prisma/seeds/permit/* files exist

Create seeds/geo/nepal.ts + seeds/poi/core.ts

Rewrite prisma/seed.ts as orchestrator

Delete deprecated seed-permits.ts + seed-permits-batch2.ts

Delete duplicate Permit.id = 33

Recommended Next
Complete modular seed reorg (1–2 hrs)

Fill content for 17 original permits (2–3 hrs)

Deploy to production (1–2 hrs) — after user confirms

15. HOW TO USE THIS FILE
For a new AI session:

Read this entire file

Reply: "I've read AI_CONTEXT.md. Here's what I understand: [tech stack], [last 3 things built], [what's broken], [what's next]."

Wait for user's instruction before writing code

Reference relevant sections

Test after every change

Update this file when major decisions are made

For the user:

Paste this at start of new chat

Say: "This is my project. Read AI_CONTEXT.md and confirm you understand it."

AI acknowledges and continues

For updating this file:

Add completed features to Section 5

Remove fixed bugs from Section 6

Update Section 7 with next steps

Update Section 14 with current state

Update "last updated" date at top

Full conversation history:
The prior DeepSeek chat was shared via a link. Ask the user for it if more reasoning/history is needed beyond this file.

End of AI_CONTEXT.md

1	Added "How to use this file" at top for new AI	Section 0 (new)
2	Added "Deploy deferred" preference — do not push to Aiven/Vercel without confirmation	Section 1
3	Clarified seed status — only special-clearances.ts confirmed; other 6 permit modules status unknown; geo/nepal.ts and poi/core.ts don't exist	Section 3
4	Fixed permit count from "~42" to "~47"	Section 5
5	Marked modular seeds as "IN PROGRESS" not done	Section 5
6	Added known subcategory IDs reference (tims=6, protected-area=7, restricted-area=8, etc.)	Section 4.4
7	Expanded Issue 1 — triple duplicate Tsum Valley possibility + verification query	Section 6
8	Added Issue 8 — Seeds Not Fully Modular Yet (CRITICAL)	Section 6
9	Expanded next steps with 9-step seed reorg checklist	Section 7-A
10	Added "DO NOT deploy without confirmation" + "DO NOT assume modular seeds are complete" to DO NOT rules	Section 9.1
11	Added Directus admin credentials (email + password) to environment section	Section 10
12	Added local MySQL updatedAt ALTER fix to Fixed Issues (critical if DB reset)	Section 12
13	Added routing note — app/[slug]/page.tsx does NOT catch /Nepal-Permits/*	Section 4.1
14	Added DeepSeek chat share link placeholder at end	Section 15
15	Updated "last updated" date to 2026-10-31	Top of file

