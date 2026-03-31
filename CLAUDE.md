# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server (port 5173)
npm run build        # tsc -b && vite build → dist/
npm run lint         # ESLint 9 (flat config)
npm run preview      # Preview production build
npx tsc --noEmit     # Type check without emitting
```

Sanity Studio is a separate project in `studio/` with its own `package.json` (React 18.2.0, independent from main app). Run `cd studio && npm run dev` to work on schemas.

No test framework is configured.

## Architecture

**React 19 + TypeScript + Vite SPA** deployed on Vercel for a lawn care business in Lumberton, TX.

### Routing & Page Composition

All routes (`/`, `/quote`, `/review`) render `HomeV2.tsx`, which composes vertical page sections. Route differences control modal state: `/quote` auto-opens the YardBook iframe modal via `EstimateModalContext`.

### Data Flow: Sanity CMS

Content comes from Sanity.io (project `hj2wzg7f`, dataset `production`). The pattern:

1. GROQ queries defined in `src/lib/sanity.ts`
2. Custom hooks in `src/hooks/useSanity.ts` wrap `useSanityQuery<T>(query)`
3. Components consume hooks and fall back to hardcoded defaults when CMS data is empty

Most section components exist in two versions: static (original) and dynamic (Sanity-powered, e.g. `PricingDynamic.tsx`, `WhyChooseUsDynamic.tsx`). The dynamic versions are in use; static versions are legacy fallbacks.

### Images

Images are hosted on **SmugMug** — URLs are stored as strings in Sanity, not uploaded as Sanity assets. The `getSmugMugImageUrl()` helper in `sanity.ts` exists for future size optimization.

### API Routes (`api/`)

Three Vercel serverless functions:
- `send-quote.js` — sends email via Resend API
- `sync-facebook.js` — daily cron (9 AM UTC) syncs FB posts → Sanity as `facebookImport` docs
- `approve-facebook.js` — admin endpoint to convert imports → testimonials/galleries

### Key Components

- `EstimateModalContext` — global modal state, auto-opens on `/quote`
- `HeroGalleryCarousel` / `BeforeAfterGallery` — before/after image sliders using CSS custom properties (`--slider-pos`) for drag performance (no React state during drag)
- `TrustBar` — dynamically computes average rating from testimonials

## Code Style

- No comments unless logic is genuinely complex
- Tailwind CSS 4 for all styling; custom CSS only in `index.css` for fonts/animations
- Custom font families: `font-decorative` (Bungee), `font-main` (Roboto Condensed)
- Copy should sound local and human — avoid AI-polished corporate language

## Tailwind v4

CSS variables contain full `hsl()` values — never double-wrap:
- `color: var(--muted-foreground)` — correct
- `color: hsl(var(--muted-foreground))` — produces invalid `hsl(hsl(...))`

## Environment Variables

Frontend (must be `VITE_` prefixed):
- `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, `VITE_SANITY_API_VERSION`
- `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST`

Backend (server-side only, set in Vercel):
- `RESEND_API_KEY`, `SANITY_TOKEN`, `FACEBOOK_PAGE_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID`

<!-- VERCEL BEST PRACTICES START -->
## Vercel Best Practices

- Treat Vercel Functions as stateless + ephemeral
- Store secrets in Vercel Env Variables; not in git
- Use Cron Jobs for schedules; cron runs in UTC via HTTP GET
- Set Function regions near your primary data source
<!-- VERCEL BEST PRACTICES END -->
