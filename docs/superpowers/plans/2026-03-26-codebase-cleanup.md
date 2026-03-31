# Codebase Cleanup & Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce bundle size, eliminate dead code, deduplicate Sanity queries, add error boundaries, and optimize SmugMug images — all without changing site behavior.

**Architecture:** Remove unused dependencies and legacy components that aren't imported. Lift `useSiteSettings` into a React Context so the query runs once. Add a React error boundary around dynamic CMS sections. Wire up SmugMug URL sizing params.

**Tech Stack:** React 19, TypeScript 5.8, Vite 5, Tailwind CSS 4, Sanity.io

**Idempotency rule:** After every task, the site must look and behave identically. Run `npm run build` and visually verify `npm run dev` after each task.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `package.json` | Modify | Remove leaflet, react-leaflet, @types/leaflet, lodash, @types/lodash |
| `src/pages/components/Quote.tsx` | Delete | Legacy form, not imported anywhere |
| `src/pages/components/Map.tsx` | Delete | Only used by Quote.tsx |
| `src/pages/Home.tsx` | Delete | Legacy page, replaced by HomeV2 |
| `src/pages/components/Hero.tsx` | Delete | Legacy, replaced by HeroV2 |
| `src/pages/components/HeroDynamic.tsx` | Delete | Not imported in HomeV2 |
| `src/pages/components/About.tsx` | Delete | Legacy, replaced by AboutDynamic |
| `src/pages/components/Services.tsx` | Delete | Legacy, replaced by ServicesDynamic |
| `src/pages/components/Pricing.tsx` | Delete | Legacy, replaced by PricingV2 |
| `src/pages/components/PricingDynamic.tsx` | Delete | Not imported in HomeV2 (PricingV2 is used) |
| `src/pages/components/WhyChooseUs.tsx` | Delete | Legacy, replaced by WhyChooseUsDynamic |
| `src/components/Header.tsx` | Delete | Legacy, replaced by HeaderV2 |
| `src/components/BigThicketLogo.tsx` | Delete | Not imported anywhere active |
| `src/components/Logo.tsx` | Delete | Not imported anywhere active |
| `src/contexts/SiteSettingsContext.tsx` | Create | Context provider for shared settings |
| `src/hooks/useSanity.ts` | Modify | Update useSiteSettings to use context |
| `src/App.tsx` | Modify | Wrap with SiteSettingsProvider |
| `src/pages/components/FinalCTA.tsx` | Modify | Fix yearEstablished default |
| `src/lib/sanity.ts` | Modify | Implement SmugMug URL sizing |
| `src/components/ErrorBoundary.tsx` | Create | React error boundary component |
| `src/pages/HomeV2.tsx` | Modify | Wrap dynamic sections in ErrorBoundary |

---

### Task 1: Remove dead dependencies and their sole consumer

The only files that import `lodash`, `leaflet`, or `react-leaflet` are `Quote.tsx` and `Map.tsx` — neither is imported by any active component. Remove the files first, then uninstall the packages.

**Files:**
- Delete: `src/pages/components/Quote.tsx`
- Delete: `src/pages/components/Map.tsx`
- Modify: `package.json`

- [ ] **Step 1: Verify Quote.tsx and Map.tsx are not imported anywhere**

Run: `grep -r "Quote\|Map" src/ --include="*.tsx" -l` and confirm only Quote.tsx and Map.tsx reference each other.

- [ ] **Step 2: Delete the files**

```bash
rm src/pages/components/Quote.tsx src/pages/components/Map.tsx
```

- [ ] **Step 3: Uninstall dead dependencies**

```bash
npm uninstall leaflet react-leaflet @types/leaflet lodash @types/lodash
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds. Bundle size should drop noticeably.

---

### Task 2: Remove legacy components not imported by active code

These files are not imported by `HomeV2.tsx`, `App.tsx`, or any other active component. They are leftover from earlier iterations.

**Files to delete:**
- `src/pages/Home.tsx`
- `src/pages/components/Hero.tsx`
- `src/pages/components/HeroDynamic.tsx`
- `src/pages/components/About.tsx`
- `src/pages/components/Services.tsx`
- `src/pages/components/Pricing.tsx`
- `src/pages/components/PricingDynamic.tsx`
- `src/pages/components/WhyChooseUs.tsx`
- `src/components/Header.tsx`
- `src/components/BigThicketLogo.tsx`
- `src/components/Logo.tsx`

- [ ] **Step 1: Verify none of these are imported by active code**

For each file, run grep to confirm no active component imports it. The active entry points are `App.tsx` → `HomeV2.tsx` and the components HomeV2 imports. Check transitive imports too.

Files that ARE actively imported (do NOT delete):
- `HomeV2.tsx` imports: `HeroV2`, `TrustBar`, `PricingV2`, `BeforeAfterGallery`, `WhyChooseUsDynamic`, `ServicesDynamic`, `TestimonialsSection`, `FAQSection`, `FinalCTA`, `ReviewCTA`, `ReviewModal`, `FloatingCTA`
- `App.tsx` imports: `HomeV2`, `HeaderV2`, `Footer`, `EstimateModalProvider`

- [ ] **Step 2: Delete all legacy files**

```bash
rm src/pages/Home.tsx
rm src/pages/components/Hero.tsx
rm src/pages/components/HeroDynamic.tsx
rm src/pages/components/About.tsx
rm src/pages/components/Services.tsx
rm src/pages/components/Pricing.tsx
rm src/pages/components/PricingDynamic.tsx
rm src/pages/components/WhyChooseUs.tsx
rm src/components/Header.tsx
rm src/components/BigThicketLogo.tsx
rm src/components/Logo.tsx
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no missing import errors.

- [ ] **Step 4: Verify type check**

Run: `npx tsc --noEmit`
Expected: No errors.

---

### Task 3: Deduplicate useSiteSettings with a Context provider

Currently 15+ components each independently call `useSiteSettings()`, which triggers a separate `sanityClient.fetch()` per component. Create a context that fetches once and shares the result.

**Files:**
- Create: `src/contexts/SiteSettingsContext.tsx`
- Modify: `src/hooks/useSanity.ts`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create SiteSettingsContext**

Create `src/contexts/SiteSettingsContext.tsx`:

```tsx
import { createContext, useContext, useState, useEffect } from 'react'
import { sanityClient, queries, type SiteSettings } from '../lib/sanity'

interface SiteSettingsContextValue {
  data: SiteSettings | null
  loading: boolean
  error: Error | null
}

const SiteSettingsContext = createContext<SiteSettingsContextValue>({
  data: null,
  loading: true,
  error: null,
})

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    sanityClient.fetch<SiteSettings>(queries.siteSettings)
      .then(setData)
      .catch(err => setError(err instanceof Error ? err : new Error('Unknown error')))
      .finally(() => setLoading(false))
  }, [])

  return (
    <SiteSettingsContext.Provider value={{ data, loading, error }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettingsContext() {
  return useContext(SiteSettingsContext)
}
```

- [ ] **Step 2: Update useSiteSettings in useSanity.ts**

Replace the `useSiteSettings` function to use the context instead of making a new query:

```tsx
import { useSiteSettingsContext } from '../contexts/SiteSettingsContext'

export function useSiteSettings() {
  return useSiteSettingsContext()
}
```

Remove the old implementation. Keep the import of `SiteSettings` type from `../lib/sanity` for re-export if needed.

- [ ] **Step 3: Wrap App with SiteSettingsProvider**

In `src/App.tsx`, import `SiteSettingsProvider` and wrap it around the existing providers:

```tsx
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext"

// In the return:
<EstimateModalProvider>
  <SiteSettingsProvider>
    <div className="min-h-screen bg-green-50">
      ...
    </div>
  </SiteSettingsProvider>
</EstimateModalProvider>
```

- [ ] **Step 4: Verify build and type check**

Run: `npm run build && npx tsc --noEmit`
Expected: Both pass. All 15+ components still get their settings data, but now from a single fetch.

- [ ] **Step 5: Verify dev server**

Run: `npm run dev`
Verify: All sections load with CMS content. Check hero, pricing, FAQ, footer — all should show Sanity data as before.

---

### Task 4: Fix yearEstablished default mismatch

`FinalCTA.tsx` defaults `yearEstablished` to `2025`, but the business was established in 2018 (per Sanity schema default and `index.html` structured data).

**Files:**
- Modify: `src/pages/components/FinalCTA.tsx`

- [ ] **Step 1: Fix the default**

Change line 14:
```tsx
// Before:
const yearEstablished = settings?.yearEstablished || 2025
// After:
const yearEstablished = settings?.yearEstablished || 2018
```

- [ ] **Step 2: Verify build**

Run: `npx tsc --noEmit`

---

### Task 5: Implement SmugMug URL image optimization

SmugMug supports URL-based image sizing. The `getSmugMugImageUrl()` helper in `sanity.ts` is currently a no-op. Wire it up to append SmugMug size keywords, and use it in the gallery components.

SmugMug URL sizing works by appending size suffixes before the file extension, e.g.:
- Original: `https://photos.smugmug.com/photos/abc/0/X3/abc-X3.jpg`
- The size is embedded in the URL path. SmugMug generates multiple sizes: `Th` (thumbnail), `S` (small), `M` (medium), `L` (large), `XL`, `X2`, `X3` (original).

Since the URLs stored in Sanity are already full SmugMug URLs with size info baked in, the optimization approach is different: we should add `width` and `height` attributes to `<img>` tags for CLS prevention, and ensure `loading="lazy"` is on below-fold images (already done in perf task). The `getSmugMugImageUrl` helper should remain as-is since SmugMug URLs are opaque and resizing requires the SmugMug API.

Instead, the real optimization is adding `decoding="async"` to below-fold images and ensuring the hero image uses `fetchPriority="high"` (already done).

**Files:**
- Modify: `src/components/BeforeAfterGallery.tsx` — add `decoding="async"` to images
- Modify: `src/components/HeroGalleryCarousel.tsx` — add `decoding="async"` to images
- Modify: `src/components/TestimonialsSection.tsx` — add `loading="lazy"` and `decoding="async"` to testimonial photos

- [ ] **Step 1: Add decoding="async" to BeforeAfterGallery images**

Both `<img>` tags (after photo and before photo) should get `decoding="async"`.

- [ ] **Step 2: Add decoding="async" to HeroGalleryCarousel images**

Both `<img>` tags should get `decoding="async"`.

- [ ] **Step 3: Add loading="lazy" and decoding="async" to TestimonialsSection photos**

The testimonial photo `<img>` at line 49 should get both `loading="lazy"` and `decoding="async"`.

- [ ] **Step 4: Verify build**

Run: `npx tsc --noEmit`

---

### Task 6: Add React ErrorBoundary for dynamic CMS sections

If Sanity goes down or returns unexpected data, individual sections should fail gracefully instead of crashing the entire page.

**Files:**
- Create: `src/components/ErrorBoundary.tsx`
- Modify: `src/pages/HomeV2.tsx`

- [ ] **Step 1: Create ErrorBoundary component**

Create `src/components/ErrorBoundary.tsx`:

```tsx
import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }
    return this.props.children
  }
}
```

The boundary renders `null` by default when a child throws — the section silently disappears rather than crashing the page. No error UI needed for a marketing site.

- [ ] **Step 2: Wrap dynamic CMS sections in HomeV2.tsx**

Import `ErrorBoundary` and wrap each CMS-powered section. The sections to wrap are all the ones that fetch from Sanity: `TrustBar`, `PricingV2`, `BeforeAfterGallery`, `WhyChooseUsDynamic`, `ServicesDynamic`, `TestimonialsSection`, `FAQSection`, `FinalCTA`, `ReviewCTA`.

Do NOT wrap `HeroV2` (the hero should always render — it has its own fallbacks).

Example pattern:
```tsx
<ErrorBoundary>
  <TrustBar />
</ErrorBoundary>
<ErrorBoundary>
  <ServicesDynamic />
</ErrorBoundary>
```

- [ ] **Step 3: Verify build and type check**

Run: `npm run build && npx tsc --noEmit`
Expected: Both pass.

- [ ] **Step 4: Verify dev server**

Run: `npm run dev`
Verify: All sections still render normally. The error boundary should be invisible during normal operation.

---

### Task 7: Final verification and confidence assessment

- [ ] **Step 1: Run full production build**

Run: `npm run build`
Expected: Build succeeds. Note the new bundle size vs the previous 620KB.

- [ ] **Step 2: Run type check**

Run: `npx tsc --noEmit`
Expected: No errors.

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: No errors.

- [ ] **Step 4: Visual verification on dev server**

Run: `npm run dev`
Check every section:
- Header navigation and scroll behavior
- Hero image, logo, CTA buttons
- Hero gallery carousel (drag slider, auto-advance, next/prev)
- Trust bar
- Services section
- Pricing cards
- Before/after gallery (drag slider, navigate)
- Why Choose Us
- Testimonials
- FAQ accordion
- Review CTA
- Final CTA
- Footer
- Floating CTA on mobile
- /quote route opens estimate modal
- /review route shows review mode

- [ ] **Step 5: Report confidence score**

Assess confidence against the Refactor Completion Confidence Gate:
- Testing evidence (40%): manual visual verification, build passes, type check passes, lint passes
- Code review evidence (30%): all changes are deletions or additive (context, error boundary), no behavioral changes
- Logical inspection (30%): import graph verified, no transitive dependencies broken, error boundary is additive safety net
