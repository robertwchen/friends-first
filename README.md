# Friends First

Friends First is a polished MVP for structured, in-person social events that help undergraduate students meet organically in real life. The product is friends-first, low pressure, and student-verified: students apply, may be selected, confirm a ticket, check in with student ID, and after the event submit the name of someone they connected with. If both people submit each other, Friends First can share contact information after consent review.

This repository is web-first and Vercel-ready, while keeping the backend shape portable enough to support a future Expo React Native client.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style component structure
- Framer Motion
- Supabase
- PostgreSQL
- Stripe placeholder integration
- Vercel deployment target

## Repository Structure

```text
.
├── app/                    # App Router pages and lightweight API routes
├── components/             # Reusable UI primitives, forms, sections, admin views
├── lib/                    # Mock data, validation, Supabase/Stripe helpers, utilities
├── supabase/
│   ├── migrations/         # SQL schema for the MVP
│   └── seed.sql            # Seed data for local/demo environments
├── types/                  # Shared types for database portability
├── .env.example
├── components.json         # shadcn/ui config
├── tailwind.config.ts
└── vercel.json
```

## MVP Features

- Warm, premium, mobile-first landing page with slightly self-aware campus branding
- How It Works page explaining the full event lifecycle
- Multi-step application form with validation
- Pending / waitlist state page
- Selected invite confirmation page with Stripe placeholder reserve flow
- Post-event connection submission flow
- Simple admin dashboard with applications and mutual match queue
- Testimonials section
- Supabase/Postgres schema covering the requested entities
- Mock/sample data for frontend development and seeding

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Start the dev server:

```bash
npm run dev
```

4. Run validation before pushing:

```bash
npm run check
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Required for the current scaffold:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`

Notes:

- Stripe is a placeholder in this MVP. The UI and `/api/stripe/reserve` route are structured so you can later replace them with a real SetupIntent or uncaptured PaymentIntent flow.
- Resend is not wired yet, but included because selection/confirmation emails are an obvious next integration.

## Supabase Setup

1. Create a new Supabase project.
2. Add the values from `.env.example` into `.env.local`.
3. Run the SQL in [`supabase/migrations/20260311133000_init.sql`](/Users/robert/dev/git/school/friends-first/supabase/migrations/20260311133000_init.sql).
4. Run the seed script in [`supabase/seed.sql`](/Users/robert/dev/git/school/friends-first/supabase/seed.sql).
5. Replace the mock frontend submission flows with inserts into Supabase or Edge Functions.

Suggested first production tables already included:

- `users`
- `profiles`
- `events`
- `applications`
- `tickets`
- `checkIns`
- `connectionSubmissions`
- `mutualMatches`
- `contactConsent`
- `testimonials`
- `adminNotes`

## Vercel Deployment

1. Import the repository into Vercel.
2. Set the project framework to Next.js if it is not auto-detected.
3. Add the environment variables from `.env.example`.
4. Deploy.

No custom server is required. The app is ready for standard Vercel builds.

## Portability Notes

- Shared data concerns live in `lib/` and `types/`, not inside page components.
- Supabase/Postgres stays backend-agnostic enough for a future mobile client.
- The current API routes can later move to `/packages/api`, Supabase Edge Functions, or a dedicated service without changing the frontend information architecture.
- A future `/apps/mobile` Expo app can reuse validation schemas, database types, and shared DTOs with minimal reshaping.

## Recommended Branch Strategy

- `main`: always deployable
- `codex/mvp-foundation`: initial scaffold branch for this MVP
- short-lived feature branches after that, for example:
  - `codex/auth`
  - `codex/supabase-write-paths`
  - `codex/stripe-reservations`
  - `codex/admin-ops`

Suggested workflow:

1. Branch from `main`.
2. Keep PRs narrow and reviewable.
3. Merge to `main` only after `npm run check` and a local smoke test pass.

## Suggested First Commit Plan

1. `chore: scaffold Next.js app shell and project config`
2. `feat: build landing, application, and post-event flows`
3. `feat: add admin dashboard and mock data layer`
4. `feat: add Supabase schema and seed data`
5. `docs: add setup, deployment, and branch strategy guidance`

If you prefer a single first push for the MVP, squash those into one PR and keep the granular plan as future issue structure.

## Recommended First Issues / Next Steps

- Wire application and connection forms to Supabase inserts
- Replace mock auth with Supabase Auth or Clerk
- Implement real Stripe reservation flow
- Add selection email and confirmation expiry automation
- Add row-level security policies and server-side action paths
- Add event check-in QR or roster tooling
- Add a shared package for future Expo/mobile reuse
- Add analytics, monitoring, and error reporting

## Branch and PR Preparation

This scaffold is organized so you can create a branch named `codex/mvp-foundation` and open a PR with:

- polished MVP UI
- Supabase schema and seed data
- placeholder API routes
- deployment and setup docs

If local `git` is unavailable, fix the Xcode command line tools license state first, then run:

```bash
git checkout -b codex/mvp-foundation
git add .
git commit -m "feat: bootstrap Friends First MVP"
git push -u origin codex/mvp-foundation
```

