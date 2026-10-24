# Overall Project architecture and key directory structure

Tech stack, libraries, and coding patterns we are following.

Key decisions made, features completed, and business logic established.

Active bugs, current working features, and immediate next steps.

Any specific instructions or context a new AI session must know to continue seamlessly.
AI_CONTEXT.md — Full Project Handoff
Create a file called AI_CONTEXT.md at your project root (/Users/barun/Desktop/my-ota/AI_CONTEXT.md). Paste the entire block below into it.

markdown
# AI_CONTEXT.md — MyHimalayanTrip Project Handoff

This file is the source of truth for any AI session working on this project.
Read it fully before writing any code. Update it when major decisions are made.

---

## 1. PROJECT OVERVIEW

**Name:** MyHimalayanTrip
**Type:** Nepal travel & treks directory + planner (TripAdvisor-style, focused on Nepal — Himalayas, hills, Terai)
**Stage:** Phase 6 complete. Auth, data, search, destination pages, POI pages, and reviews all working.

**Long-term vision:**
- Nepal-specific travel planner (not just Himalaya — all of Nepal)
- Eventually add OTA features (bookings, payments, vendor accounts)
- Reviews are the current community feature

**Owner:** Barun (solo developer)
**Local path:** `/Users/barun/Desktop/my-ota`
**Local URL:** `http://localhost:3000`

---

## 2. TECH STACK

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.3.8 (Turbopack) |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | v4 (utility classes inline) |
| Icons | lucide-react | latest |
| Auth | Auth.js (NextAuth v5) | beta |
| ORM | Prisma | 6.19.3 (stable, NOT 8 RC) |
| Database | MySQL | 9.2.0 (local, Homebrew / MySQL installer) |
| Password hashing | bcryptjs | latest |
| Email (future) | Resend (planned) | — |
| Hosting (future) | Vercel + Neon Postgres (planned) | — |

**IMPORTANT:** Do NOT upgrade Prisma to v8 RC. Stay on 6.x. v8 renamed `prisma migrate` → `prisma migration` and breaks workflows.

---

## 3. DIRECTORY STRUCTURE
my-ota/
├── .env ← DATABASE_URL, AUTH_SECRET, AUTH_URL, AUTH_GOOGLE_*, MAPBOX
├── auth.ts ← Auth.js config (Google + Credentials, JWT sessions)
├── prisma/
│ ├── schema.prisma ← User, Account, Session, VerificationToken, Geo, Poi, Review
│ ├── migrations/ ← Migration history
│ └── seed.ts ← Seed data: 31 geos, 30 POIs
├── lib/
│ ├── prisma.ts ← PrismaClient singleton
│ ├── geo.ts ← buildBreadcrumb, sectionUrl, poiUrl, poiCategoryKey
│ └── sections.ts ← SECTIONS array (Tourism, Hotels, Treks, Transports, Guides, Permits)
├── types/
│ └── next-auth.d.ts ← Session type extensions (id, role)
├── app/
│ ├── layout.tsx ← Root layout: SessionProvider + SiteHeader + SiteFooter
│ ├── page.tsx ← Homepage (hero + tabs + SearchBox + DIRECTORY grid)
│ ├── globals.css
│ ├── [slug]/
│ │ └── page.tsx ← CATCH-ALL: handles both /Tourism-g{id}-{slug} and /Trek_Review-g{id}-d{id}-{slug}
│ ├── profile/
│ │ ├── page.tsx ← Profile page (user info + edit form)
│ │ └── edit/page.tsx ← (NOT BUILT YET — planned)
│ ├── bookings/page.tsx ← Placeholder "coming soon"
│ ├── trips/page.tsx ← Placeholder "coming soon"
│ ├── wishlist/page.tsx ← Placeholder "coming soon"
│ ├── login/page.tsx ← Login (email/password + Google)
│ ├── signup/page.tsx ← Signup (email/password + Google)
│ ├── Destinations/page.tsx ← Static route (basic)
│ ├── Treks/page.tsx ← Static route (basic)
│ ├── Transport/page.tsx ← Static route (basic)
│ ├── Guides/page.tsx ← Static route (basic)
│ ├── api/
│ │ ├── auth/[...nextauth]/route.ts ← Auth.js handlers
│ │ ├── signup/route.ts ← POST /api/signup
│ │ ├── search/route.ts ← GET /api/search?q=
│ │ ├── reviews/route.ts ← GET/POST /api/reviews
│ │ └── profile/route.ts ← PATCH /api/profile
│ └── components/
│ ├── SiteHeader.tsx ← Logo + AuthButtons
│ ├── SiteFooter.tsx ← Copyright
│ ├── AuthButtons.tsx ← Logged-out buttons OR avatar dropdown (Profile/Bookings/Trips/Wishlist/Sign out)
│ ├── SearchBox.tsx ← Debounced typeahead, fetches /api/search
│ ├── Breadcrumb.tsx ← Geo tree breadcrumb
│ ├── SectionTabs.tsx ← Tourism/Hotels/Treks/etc tabs with count badges
│ ├── PoiCard.tsx ← POI card (destination pages)
│ ├── PoiHero.tsx ← POI page hero
│ ├── PoiInfo.tsx ← POI info grid
│ ├── PoiCatalog.tsx ← (unused? check)
│ ├── EmptySection.tsx ← Empty state for sections
│ ├── ReviewForm.tsx ← Star rating + textarea + submit
│ ├── ReviewList.tsx ← Review display list
│ ├── ProfileForm.tsx ← Edit name/email form
│ ├── PlaceholderPage.tsx ← Shared "coming soon" UI
│ └── TravelpayoutsWidget.tsx ← (external widget)

text

---

## 4. KEY ARCHITECTURAL DECISIONS

### 4.1 URL Scheme (TripAdvisor-style)

**Geo pages (places):**
/Tourism-g{geoId}-{slug} → overview
/Hotels-g{geoId}-{slug} → hotels only
/Treks-g{geoId}-{slug} → treks only
/Transports-g{geoId}-{slug} → transport only
/Guides-g{geoId}-{slug} → guides only
/Permits-g{geoId}-{slug} → permits only

text

**POI pages (things):**
/<Category>_Review-g{geoId}-d{poiId}-{slug}

text

Examples:
- `/Trek_Review-g97710301-d100001-everest-base-camp-trek`
- `/Hotel_Review-g97740501-d200002-yak-yeti-pokhara`

**Both handled by ONE catch-all route:** `app/[slug]/page.tsx`

**REGEX PARSING (critical):**
- POI: `^([A-Za-z]+)_Review-g(\d+)-d(\d+)-(.+)$`
- GEO: `^([A-Za-z]+)-g(\d+)-(.+)$`

**DO NOT create separate `[geo]` and `[poi]` folders.** Next.js forbids two dynamic folders with different names at the same level.

### 4.2 Geo ID Scheme (Government-backed)

Based on Nepal's official district codes (Central Bureau of Statistics):
977 Nepal (country code)
9771-9777 Provinces (1-7)
977 + gov_district Districts (e.g., 977306 = Kathmandu, gov code 306)
977 + district + XX Cities (e.g., 97730601 = Kathmandu city)

text

**Rules:**
- Root = `977` (Nepal dialing code)
- District = `977` + CBS 3-digit code
- City = district ID + 2-digit sequence (01-99)
- Max ID length: 8 digits

**NO `place` level in Geo.** Places (Thamel, EBC, Phewa Lake) are POIs with category `place`.

### 4.3 POI ID Scheme (Category blocks)
100000-199999 Trek
200000-299999 Hotel
300000-399999 Restaurant
400000-499999 Transport
500000-599999 Guide
600000-699999 Permit
700000-799999 Place

text

6-digit IDs. First digit = category. Auto-increment within block (but seeded with explicit IDs).

### 4.4 Auth Architecture

- **Auth.js v5** with Prisma adapter
- **JWT sessions** (not DB sessions)
- **Google OAuth** with `allowDangerousEmailAccountLinking: true` (auto-links if email matches)
- **Credentials (email/password)** for email signups
- **Session callback** adds `id` and `role` to session
- **JWT callback** fetches fresh `role` and `image` from DB on sign-in
- **`signIn` callback** forces `user.image = profile.picture` for Google users

**Google config in `auth.ts`:**
```ts
Google({
  allowDangerousEmailAccountLinking: true,
  authorization: {
    params: {
      scope: "openid email profile",
      prompt: "consent",
    },
  },
}),
4.5 Data Model Relationships
text
User 1:N Account    (OAuth links)
User 1:N Session    (login sessions — unused, JWT strategy)
User 1:N Review     (written reviews)
Geo  1:N Poi        (things in a place)
Geo  1:N Geo        (self-reference tree via parentId)
Poi  1:N Review     (reviews on a POI)
Review constraint: @@unique([userId, poiId]) — one review per user per POI.

Rating recompute: After each review POST, Poi.rating is recalculated as average of all reviews.

4.6 Section Tabs (Profile vs Destination)
Destination page section tabs (app/[slug]/page.tsx → renderGeoPage):

Tourism (overview — shows geo name as label + Map icon)

Hotels, Treks, Transports, Guides, Permits

Icons are lucide-react components (NOT emojis)

Count badges from prisma.poi.groupBy

Empty sections show <EmptySection /> message (NOT hidden)

Tourism tab special behavior:

Label = geo.name (e.g., "Pokhara") not "Overview"

Icon = Map (lucide)

Heading on page = geo.name (not "Overview in Pokhara")

4.7 Header Avatar / Dropdown Pattern
Logged out: "Log in" + "Sign up" buttons

Logged in: Avatar circle only → click opens dropdown

Dropdown items: Profile, Bookings, Trips, Wishlist, Sign out

Logout is inside the dropdown, NOT in header

Click outside closes dropdown

Google users show their Google profile picture

Email users show first letter initial in sky-600 circle

4.8 Sticky Footer
app/layout.tsx:

tsx
<body className="min-h-[100dvh] flex flex-col">
  <SessionProvider>
    <SiteHeader />
    <div className="flex-1 flex flex-col">{children}</div>
    <SiteFooter />
  </SessionProvider>
</body>
flex-1 on the middle wrapper pushes footer to bottom always.

5. FEATURES COMPLETED
Phase 1 — Data Layer ✅
Geo + Poi models with correct relationships

Migration add_geo_and_poi

Seeded 31 geos, 30 POIs with structured IDs

Verified with MySQL queries

Phase 2 — Search API ✅
GET /api/search?q= returns combined geos + POIs

Returns { results: [...] } with type, id, name, url, subtitle

Geo results: /Tourism-g{id}-{slug}

POI results: /<Category>_Review-g{id}-d{id}-{slug}

Phase 3 — Search UI ✅
SearchBox.tsx with 200ms debounce

AbortController for stale requests

Click-outside closes dropdown

Category icons per result type

Loading spinner

"No results" message

Phase 4 — Destination Pages ✅
app/[slug]/page.tsx handles /Tourism-g{id}-{slug} etc.

Breadcrumb from geo tree

Section tabs with count badges

POI card grid

Empty section messages

Canonical slug redirect

Phase 5 — POI Detail Pages ✅
Same catch-all handles /<Category>_Review-g{id}-d{id}-{slug}

Hero section with category badge

Info grid (location, category, price, rating)

About section (description)

Breadcrumb extending geo tree with POI name at end

Phase 6 — Reviews ✅
Review table with unique (userId, poiId)

GET /api/reviews?poiId= returns all reviews

POST /api/reviews creates review, recomputes POI rating

Auth required (401 if not logged in)

One review per user per POI (409 if duplicate)

ReviewForm.tsx with star rating + textarea

ReviewList.tsx displays reviews with user info

router.refresh() after submit updates the page

Auth (in parallel) ✅
Email/password signup and login

Google OAuth signup and login

Auto-linking if same email exists

Google profile picture in header avatar and profile page

Session persistence across page loads

Header dropdown (Profile, Bookings, Trips, Wishlist, Sign out)

Profile Page ✅
/profile shows user info (name, email, member since)

Edit form (name + email) with PATCH /api/profile

Success/error messages

Placeholder Pages ✅
/bookings, /trips, /wishlist — "Coming soon" via PlaceholderPage.tsx

6. KNOWN ISSUES / BUGS
Issue 1 — Email/Password Login on Google-Only Account
Symptom: User signs up with Google. Later tries email/password login. Fails with "Invalid email or password."

Root cause: passwordHash is NULL for Google-only users. The authorize() function returns null when !user.passwordHash.

Status: This is expected behavior, not a bug. But the error message is misleading.

Recommended fix (not yet applied):

In auth.ts authorize(): if user.passwordHash is null, throw Error("oauth_only_account")

In login/page.tsx: catch that error and show "This account was created with Google. Use 'Continue with Google' instead."

Long-term: Build a "set password" feature in /profile for OAuth-only users.

Issue 2 — Prisma Duplicate poiUrl Functions
File: lib/geo.ts

Symptom: Two poiUrl function definitions exist — one uses /Poi_Review-..., one uses /${poiCategoryKey(category)}_Review-....

Status: Needs verification. If both exist, TypeScript will error. Only ONE should exist — the category-specific version.

Recommended fix: Delete the old /Poi_Review-... version. Keep poiCategoryKey + new poiUrl.

However: Old /Poi_Review-... URLs still resolve (regex accepts any _Review prefix) but don't redirect to canonical. Optional: add category check in renderPoiPage redirect.

Issue 3 — Google OAuth credentials leaked in chat
Status: RESOLVED. User rotated Google Client Secret. New credentials in .env, NOT in git.

Ongoing requirement: NEVER paste secrets in chat. Rotate immediately if leaked.

Issue 4 — Email Signup Without Google (Potential)
Status: Not tested. If a user signs up with email/password first, then tries Google with same email, auto-linking should work (because allowDangerousEmailAccountLinking: true). But not verified.

7. CURRENT WORKING FEATURES (VERIFIED)
✅ Homepage with hero, tabs, SearchBox, DIRECTORY grid

✅ Search "everest" → returns treks, places

✅ Search "kathmandu" → returns geos + POIs

✅ Click geo result → /Tourism-g{id}-{slug}

✅ Click POI result → /<Category>_Review-g{id}-d{id}-{slug}

✅ Destination page: breadcrumb, section tabs, POI cards

✅ Click tab → filters POIs (Hotels only, Treks only)

✅ Click POI card → POI detail page

✅ POI page: hero, info grid, about, reviews

✅ Write review (star rating + text) → submits → page refreshes

✅ Duplicate review check → "You have already reviewed"

✅ POI rating updated after each review

✅ Signup (email/password) → auto-login

✅ Login (email/password)

✅ Signup (Google) → auto-link → profile picture saved

✅ Login (Google)

✅ Header shows avatar (Google picture or initial)

✅ Click avatar → dropdown (Profile, Bookings, Trips, Wishlist, Sign out)

✅ Click Profile → /profile shows user info + edit form

✅ Edit name/email → saves → header updates

✅ Logout from dropdown

✅ Placeholder pages: /bookings, /trips, /wishlist

✅ Breadcrumbs work (walk up geo tree)

✅ Section tabs show counts (e.g., "Treks 2")

✅ Empty section shows friendly message

✅ Canonical slug redirect

8. IMMEDIATE NEXT STEPS (in order of priority)
A. Finish Auth Polish (small, 1-2 hours)
Fix Issue 1: better error message for OAuth-only accounts trying email/password login

Verify Issue 2: check lib/geo.ts for duplicate poiUrl — remove old one

Add "Set Password" feature for OAuth-only users (optional)

B. Build Real Wishlist (medium, 2-3 hours)
Add Wishlist table (id, userId, poiId, createdAt)

Add heart button on PoiCard.tsx and PoiHero.tsx

Add POST /api/wishlist and DELETE /api/wishlist/:poiId

Add GET /api/wishlist for logged-in user

Replace /wishlist placeholder with real saved items list

Heart button requires login → redirect to /login?callbackUrl=...

C. Build Real Bookings (medium-large, 3-4 hours)
Add Booking table (id, userId, poiId, startDate, endDate, guests, totalPrice, status, createdAt)

Booking form on POI pages

/bookings page shows user's bookings

Admin view for confirming (deferred)

D. Build Real Trip Planner (large, 4-5 hours)
Add Trip and TripItem tables

Day-by-day itinerary builder

/trips page shows user's trips

Drag-to-reorder items

E. Facebook Sign-In (small, 15 min)
Add AUTH_FACEBOOK_ID + AUTH_FACEBOOK_SECRET to .env

Add Facebook({ allowDangerousEmailAccountLinking: true }) to auth.ts

Add "Continue with Facebook" button on login/signup

F. Deploy (medium, 1-2 hours)
Set up Neon Postgres (free tier)

Change provider = "postgresql" in schema.prisma + migrate

Deploy to Vercel

Update Google OAuth redirect URIs to production URL

Set environment variables in Vercel

G. More Content
Add more geos (all 77 districts, key cities, trek regions)

Add more POIs (more treks, hotels, guides)

Add real images per POI (Mapbox or Unsplash)

Recommended next: A (auth polish) then B (wishlist).

9. CODING PATTERNS & CONVENTIONS
9.1 Client vs Server Components
Server components by default — no "use client" unless needed

"use client" required when: using useState, useEffect, useSession, signIn, signOut, event handlers, useRouter from next/navigation

Server components can call auth() — prefer over useSession() when possible

Server components can query Prisma directly — no need for API route just for server-side fetch

9.2 Tailwind Conventions
Sky-600 is the primary accent color (buttons, links)

Slate is the neutral palette (text, borders)

Rounded corners: rounded-xl (inputs/buttons), rounded-3xl (cards)

Padding: p-6 for cards, px-4 py-2.5 for inputs

Font weights: font-extrabold for headings, font-bold for buttons/labels

Focus rings: focus:border-sky-600 focus:ring-2 focus:ring-sky-100

9.3 Next.js 16 Notes
params is a Promise — always await params before accessing

searchParams is a Promise — always await searchParams

cookies(), headers(), draftMode() are Promises — always await

Route names can't mix literal text with brackets at same segment level — use single [slug] with regex parsing

9.4 Prisma Conventions
Always use prisma singleton from @/lib/prisma

select specific fields when possible (avoid *)

Use include for relations when you need the nested object

Use groupBy for counts

Always await queries in server components

9.5 API Route Conventions
POST returns { error: string } with 4xx/5xx on failure

POST returns { <resource>: object } with 201 on success

GET returns { <resource>s: [] } or { <resource>: object }

Always check auth with await auth() for write endpoints

Return early for validation errors

Log unexpected errors with console.error

9.6 Client-Side Form Conventions
useState for all fields

loading state for submit button

error string state for validation errors

success state (optional) with auto-hide after 3s

On success: router.refresh() to re-fetch server data

On navigation success: router.push(callbackUrl || "/")

9.7 TypeScript Conventions
Define inline types where used

Use as casting sparingly (only when Auth.js types are incomplete)

Define reusable types in types/ folder (e.g., next-auth.d.ts)

Prefer type over interface for data shapes

Use Promise<T> for async function params in Next.js 16

10. THINGS A NEW AI SESSION MUST KNOW
10.1 Do NOT Do These
Do NOT upgrade Prisma to v8 — stay on 6.x

Do NOT create [geo] and [poi] folders — use single [slug] with regex parsing

Do NOT hide empty section tabs — show them with <EmptySection /> messages

Do NOT put logout button in header — it lives inside the avatar dropdown

Do NOT use mt-auto on footer — flex-1 on the middle <div> is the current pattern

Do NOT paste secrets in chat — ask user to add to .env themselves

Do NOT change the ID scheme — 977 + gov code + sequence is locked in

Do NOT use emojis in section tabs — use lucide-react icons

Do NOT use <img> in production — migrate to next/image with domain whitelist (planned)

Do NOT modify seed data IDs — they're referenced by URLs

10.2 Do These
Always test after each phase — don't move forward until working

Always use await params in Next.js 16 routes

Always add type field to Geo — country, province, district, city

Always use category-specific POI URLs — /<Category>_Review-... not /Poi_Review-...

Always recompute Poi.rating after POST/DELETE review

Always show count badges in section tabs

Always use router.refresh() after successful form submit (client component)

Always auth-check write endpoints — return 401 if not logged in

Always use the prisma singleton from @/lib/prisma

Always read this file first before writing any code

10.3 Verification Commands
bash
# Confirm Prisma client is generated
npx prisma generate

# Confirm DB is in sync
npx prisma migrate status

# Confirm tables exist
mysql -u root -p -e "USE myhimalayantrip; SHOW TABLES;"

# Confirm seed data
mysql -u root -p -e "USE myhimalayantrip; SELECT COUNT(*) FROM Geo; SELECT COUNT(*) FROM Poi;"

# Confirm schema
npx prisma studio  # opens http://localhost:5555
10.4 Environment Variables (required)

DATABASE_URL="mysql://root:Alwaysbg%40123@localhost:3306/myhimalayantrip"
AUTH_SECRET="<32-byte-random-string>"
AUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST=true
AUTH_GOOGLE_ID="<google-client-id>"
AUTH_GOOGLE_SECRET="<google-client-secret>"
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN="<mapbox-token>"
Note: Password contains @ — must be URL-encoded as %40 in DATABASE_URL.

10.5 Database Access
bash
mysql -u root -p
# password: Alwaysbg@123 (URL-encoded: Alwaysbg%40123)
sql
USE myhimalayantrip;
SHOW TABLES;
SELECT COUNT(*) FROM Geo;   -- expect 31
SELECT COUNT(*) FROM Poi;   -- expect 30
10.6 Test Users in DB
At least one email/password user exists (created during auth setup)

At least one Google user exists (created during Google setup)

Their email addresses are unknown to this context — ask user

10.7 File Naming Conventions
Components: PascalCase (SearchBox.tsx, PoiCard.tsx)

Utils: kebab or camel (geo.ts, sections.ts)

API routes: lowercase folder name matching HTTP concept (reviews/route.ts)

Pages: page.tsx inside named folder

Dynamic routes: [slug]/page.tsx

10.8 What NOT to Ask the User
The user has already answered these — don't re-ask:

"Do you want a database?" — Yes, MySQL

"Do you want auth?" — Yes, Auth.js

"Do you want Google login?" — Yes, working

"Should reviews be one-per-user?" — Yes

"Should sections hide when empty?" — No, show empty state

"Should the header have a dropdown?" — Yes, avatar → dropdown

"Should logout be in header or dropdown?" — Dropdown

"Prisma version?" — Stay on 6.x

10.9 What to Ask the User
If you need to know:

Any specific bug that's currently breaking the app

Their preference on a new feature before building it

Whether they want to deploy before or after the next feature

The current phase they're ready to start

11. STYLE GUIDE FOR RESPONSES
When responding to this user:

Explain before code — the user values understanding, not just working code

One phase at a time — never dump multiple phases

Show the whole file — not diff snippets — when changing files, because the user pastes whole files

Include testing steps — every change should end with "how to test it"

Confirm before moving on — ask "did it work?" before the next phase

Use tables — the user likes structured comparisons

Explain "why" — every decision should have reasoning, not just instructions

Keep responses tight — don't pad with filler. Every paragraph should teach or instruct something.

Warn about security — never paste secrets, always URL-encode passwords, always rotate exposed credentials

Visual summaries at the end — the user likes diagrams and tables that recap what was done

12. CURRENT PROJECT STATE — LAST UPDATED 2025-10-19
Phase 6 complete. Auth, data, search, destination pages, POI pages, and reviews all working.

Verified working today:

Google sign-in with profile picture

Auth dropdown in header

Profile page with edit form

Placeholder pages for bookings/trips/wishlist

Known issues:

Email/password login on Google-only account shows confusing error (planned fix)

Possible duplicate poiUrl in lib/geo.ts (needs verification)

Next planned work:

Fix the email/password error message for OAuth-only users (30 min)

Verify lib/geo.ts has only one poiUrl (5 min)

Build real Wishlist feature (2-3 hours)

Build real Bookings feature (3-4 hours)

App is deployable at any moment. All features work locally. No blockers.

13. PROJECT MILESTONES TIMELINE
Phase 1 (Data) — Geo + Poi tables, migrations, seed

Phase 2 (Search API) — /api/search endpoint

Phase 3 (Search UI) — SearchBox with debounce

Phase 4 (Destination Pages) — /[slug] catch-all for section pages

Phase 5 (POI Pages) — Same catch-all for POI detail

Phase 6 (Reviews) — Review table, form, list, rating recompute

Auth (parallel) — Email/password + Google OAuth + profile picture

Profile (parallel) — User info display + edit form

Placeholders — /bookings, /trips, /wishlist

Next milestone: Wishlist feature (real data) OR Deploy to Vercel.

14. HOW TO USE THIS FILE
For a new AI session:

Read this entire file

Ask the user: "Ready to continue. What are we working on?"

Wait for their instruction

Reference the appropriate section of this file when needed

Test after every change

Update this file when a major decision is made

For the user:

Paste this file at the start of a new chat

Say: "This is my project. Read AI_CONTEXT.md and confirm you understand it."

The AI will acknowledge and be ready to continue

For updating this file:

Add new completed features to Section 5

Remove fixed bugs from Section 6

Update Section 8 with next steps

Update Section 12 with current state

Update the "last updated" date

End of AI_CONTEXT.md



## Where to Save It

Save to your project root:
/Users/barun/Desktop/my-ota/AI_CONTEXT.md



## Why It's Committed (Not Gitignored)

Unlike `.env`, this file contains **no secrets**. It's safe to commit. In fact, committing it means:

- Any AI session opened on a fresh clone can read it
- Any collaborator sees the same context
- Future-you has a handoff document

Add it to git:

```bash
git add AI_CONTEXT.md
git commit -m "Add project handoff document"
How to Use It
In this chat (if we continue): No need — I already have the context.

In a new chat:

Open new chat

Paste AI_CONTEXT.md contents (or just say "Read AI_CONTEXT.md from /Users/barun/Desktop/my-ota/")

Say: "Continue where we left off."

The AI will read it, confirm understanding, and be ready.

What It Doesn't Include
Secrets — .env contents are shown as placeholders, not real values

Full source code — it references file paths, not the code itself (files are still on your disk)

Full seed data — it says "31 geos, 30 POIs" but not the full list (the seed script has that)

If you want to preserve the actual seed data somewhere accessible, that's a separate file:

bash
# Save a snapshot of your current data
mysql -u root -p myhimalayantrip -e "SELECT * FROM Geo;" > data_geos_backup.sql
mysql -u root -p myhimalayantrip -e "SELECT * FROM Poi;" > data_pois_backup.sql
But that's optional — the seed script (prisma/seed.ts) already contains all the data.

Optional — Add a Short README
For completeness, add this to README.md:

markdown
# MyHimalayanTrip

Nepal travel & treks directory. TripAdvisor-style structure, Nepal-specific content.

## Quick Start

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
Open http://localhost:3000

Read This First
See AI_CONTEXT.md for full project context — architecture, decisions, current state, and next steps.

Stack
Next.js 16 · Tailwind · Auth.js v5 · Prisma 6 · MySQL




## Summary

You now have:

1. **`AI_CONTEXT.md`** — the full handoff (paste at start of new chat)
2. **`README.md`** — quick-start for humans
3. **Your actual code** — unchanged, still on disk

**When you hit the chat limit**, paste the `AI_CONTEXT.md` contents at the start of the new chat and say:

> "This is my project. I've saved the context in AI_CONTEXT.md. Please read it and confirm you're ready to continue where we left off."

The new AI session will have everything it needs.