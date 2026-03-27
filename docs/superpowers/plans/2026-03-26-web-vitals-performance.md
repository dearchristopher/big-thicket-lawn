# Web Vitals Performance Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring the Real Experience Score from 26 (Poor) to 90+ (Great) by fixing LCP, INP, and CLS.

**Architecture:** Replace React state-driven slider animations with CSS custom properties and refs to eliminate re-renders during drag. Add proper image dimensions, lazy loading, and preloading to fix LCP/CLS. Throttle scroll listeners.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Vite

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/HeroGalleryCarousel.tsx` | Modify | Fix slider INP (use refs + CSS vars instead of state), add image dimensions, lazy load |
| `src/components/BeforeAfterGallery.tsx` | Modify | Fix slider INP (same pattern), add image dimensions, lazy load |
| `src/pages/components/HeroV2.tsx` | Modify | Preload hero background image, add fetchpriority hints |
| `src/components/HeaderV2.tsx` | Modify | Throttle scroll listener |
| `src/index.css` | Modify | Add font `size-adjust` to fallback stacks to reduce CLS |
| `index.html` | Modify | Add preconnect for SmugMug CDN |

---

### Task 1: Fix HeroGalleryCarousel INP — Replace state-driven slider with CSS custom properties

The core INP problem: `setSliderPosition()` is called via RAF on every frame during drag, causing full React re-renders 60x/sec. The fix is to use a CSS custom property (`--slider-pos`) updated via ref, so the DOM updates without React involvement.

**Files:**
- Modify: `src/components/HeroGalleryCarousel.tsx`

- [ ] **Step 1: Replace sliderPosition state with CSS custom property for drag interactions**

Remove `sliderPosition` from React state. Instead:
- Keep a `sliderPosRef` for the current value
- Use `containerRef.current.style.setProperty('--slider-pos', value + '%')` to update the DOM directly
- The `clipPath` and handle `left` style read from `var(--slider-pos)` via inline styles
- Only use `setSliderPosition` state for the range input (non-drag) and initial value

The key changes in the component:

1. Add a ref instead of state for position during drag:
```tsx
const sliderPosRef = useRef(50)
```

2. In `updateSliderSmooth`, instead of `setSliderPosition`, do:
```tsx
const updateSliderSmooth = useCallback(() => {
  const diff = targetPositionRef.current - sliderPosRef.current
  const newPos = Math.abs(diff) < 0.5
    ? targetPositionRef.current
    : sliderPosRef.current + diff * 0.25
  sliderPosRef.current = newPos
  if (containerRef.current) {
    containerRef.current.style.setProperty('--slider-pos', `${newPos}%`)
  }
  if (isDraggingRef.current) {
    rafRef.current = requestAnimationFrame(updateSliderSmooth)
  }
}, [])
```

3. Update the before image clip div and handle div to use CSS variable:
```tsx
style={{ clipPath: `inset(0 0 0 var(--slider-pos, 50%))` }}
```
```tsx
style={{ left: `var(--slider-pos, 50%)`, touchAction: 'none' }}
```

4. When drag ends, sync the ref value. When the range input changes or auto-advance fires, update both the ref and the CSS variable directly:
```tsx
const syncSliderPosition = useCallback((value: number) => {
  sliderPosRef.current = value
  targetPositionRef.current = value
  if (containerRef.current) {
    containerRef.current.style.setProperty('--slider-pos', `${value}%`)
  }
}, [])
```

5. Use `syncSliderPosition(50)` in auto-advance, next/prev slide, handleSliderChange, and handleDragEnd snap.

6. Remove the `sliderPosition` state entirely along with `setSliderPosition`. The range input's `value` should read from a state that only updates on non-drag interactions (or use an uncontrolled input).

For the range input specifically, keep a lightweight state `rangeValue` that only updates on `onChange` of the input (not during drag):
```tsx
const [rangeValue, setRangeValue] = useState(50)

const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = parseInt(e.target.value)
  setRangeValue(val)
  syncSliderPosition(val)
}
```

And sync `rangeValue` when auto-advancing or pressing next/prev by calling `setRangeValue(50)` alongside `syncSliderPosition(50)`.

- [ ] **Step 2: Verify the carousel still works — drag, auto-advance, next/prev, range input**

Run: `npm run dev`
Test manually:
- Drag the slider handle — should be smooth with no jank
- Let auto-advance cycle through slides
- Click next/prev arrows
- Use the range input (desktop only, hidden on mobile)

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: No errors

---

### Task 2: Fix BeforeAfterGallery INP — Same CSS custom property pattern

Same problem as Task 1 but in the standalone gallery component. This one is simpler since it doesn't have RAF smoothing — it directly calls `setSliderPositions` state on every drag move.

**Files:**
- Modify: `src/components/BeforeAfterGallery.tsx`

- [ ] **Step 1: Replace sliderPositions state with CSS custom property during drag**

1. Remove `sliderPositions` state and `isDragging` state.
2. Use refs for drag state and slider position:
```tsx
const isDraggingRef = useRef(false)
const sliderPosRef = useRef(50)
```

3. `updateSliderPosition` writes directly to the container DOM:
```tsx
const updateSliderPosition = useCallback((clientX: number) => {
  if (!containerRef.current) return
  const rect = containerRef.current.getBoundingClientRect()
  const x = clientX - rect.left
  let percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
  if (percentage < 5) percentage = 0
  else if (percentage > 95) percentage = 100
  sliderPosRef.current = percentage
  containerRef.current.style.setProperty('--slider-pos', `${percentage}%`)
}, [])
```

4. `handleDragStart`, `handleDragMove`, `handleDragEnd` use refs only — no state:
```tsx
const handleDragStart = useCallback((clientX: number) => {
  isDraggingRef.current = true
  updateSliderPosition(clientX)
}, [updateSliderPosition])

const handleDragMove = useCallback((clientX: number) => {
  if (!isDraggingRef.current) return
  updateSliderPosition(clientX)
}, [updateSliderPosition])

const handleDragEnd = useCallback(() => {
  isDraggingRef.current = false
}, [])
```

5. Clip and handle use CSS variable:
```tsx
style={{ clipPath: `inset(0 0 0 var(--slider-pos, 50%))` }}
style={{ left: `var(--slider-pos, 50%)`, touchAction: 'none' }}
```

6. Range input: use an uncontrolled approach or a lightweight state that only updates on input change (not drag). On `onChange`, also update the CSS variable:
```tsx
const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const val = parseInt(e.target.value)
  sliderPosRef.current = val
  if (containerRef.current) {
    containerRef.current.style.setProperty('--slider-pos', `${val}%`)
  }
}
```

7. When `activeIndex` changes (next/prev gallery), reset slider to 50%:
```tsx
const handleGalleryChange = (index: number) => {
  setActiveIndex(index)
  sliderPosRef.current = 50
  if (containerRef.current) {
    containerRef.current.style.setProperty('--slider-pos', '50%')
  }
}
```

- [ ] **Step 2: Verify gallery slider works — drag, next/prev, range input**

Run: `npm run dev`
Test manually in the gallery section below the hero.

- [ ] **Step 3: Run type check**

Run: `npx tsc --noEmit`
Expected: No errors

---

### Task 3: Throttle Header Scroll Listener

The scroll handler in `HeaderV2.tsx` fires on every scroll pixel, calling `setShowLogo` which triggers a re-render each time.

**Files:**
- Modify: `src/components/HeaderV2.tsx`

- [ ] **Step 1: Add throttling to the scroll handler**

Replace the current `handleScroll` with a throttled version using a ref-based approach (no extra dependencies):

```tsx
useEffect(() => {
  let ticking = false
  const handleScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      const heroHeight = window.innerHeight
      setShowLogo(window.scrollY > heroHeight * 0.5)
      ticking = false
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

Key changes:
- RAF-gated so it only runs once per frame
- `{ passive: true }` tells the browser this handler won't call `preventDefault`, enabling scroll optimizations

- [ ] **Step 2: Verify header logo toggle still works on scroll**

Run: `npm run dev`
Scroll past hero — header background should still transition.

---

### Task 4: Fix LCP — Hero Background Image Preloading + Image Optimization

The hero background image loads from Sanity (SmugMug URL) via inline CSS `background-image`. The browser can't discover it until the React component renders and the Sanity fetch completes. This is the primary LCP bottleneck.

**Files:**
- Modify: `index.html` — add preconnect for SmugMug
- Modify: `src/pages/components/HeroV2.tsx` — switch from background-image to `<img>` element with fetchpriority

- [ ] **Step 1: Add preconnect hints in index.html**

Add before the Google Fonts preconnect:
```html
<link rel="preconnect" href="https://photos.smugmug.com" crossorigin>
<link rel="preconnect" href="https://cdn.sanity.io" crossorigin>
```

- [ ] **Step 2: Convert hero from background-image to an `<img>` element**

Background images can't use `fetchpriority` or `loading` attributes. Convert to an `<img>` tag with absolute positioning behind the content:

Replace the hero container div:
```tsx
<div className="relative min-h-screen flex items-center justify-center py-12">
  <img
    src={settings?.heroImageUrl || '/images/lawn-placeholder.png'}
    alt=""
    className="absolute inset-0 w-full h-full object-cover"
    fetchPriority="high"
  />
  {/* Dark overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
  ...
```

The `fetchPriority="high"` tells the browser to prioritize this image download. The `alt=""` marks it as decorative.

- [ ] **Step 3: Add `loading="lazy"` to HeroGalleryCarousel images**

These images are below the fold (inside the hero but below the CTA buttons). Add lazy loading:

```tsx
<img
  src={currentGallery.afterPhotoUrl}
  alt={`${currentGallery.title} - After`}
  className="w-full h-full object-cover pointer-events-none"
  draggable={false}
  loading="lazy"
  onLoad={() => handleImageLoad(currentGallery.afterPhotoUrl)}
/>
```

Same for the before image.

- [ ] **Step 4: Add `loading="lazy"` to BeforeAfterGallery images**

Both before and after images in the standalone gallery (well below fold):
```tsx
loading="lazy"
```

- [ ] **Step 5: Verify hero loads quickly**

Run: `npm run dev`
Open DevTools Network tab — hero image should appear in the first few requests with high priority.

---

### Task 5: Fix CLS — Image Dimensions and Font Fallback Metrics

**Files:**
- Modify: `src/components/HeroGalleryCarousel.tsx` — container already has fixed height classes, images inside are fine
- Modify: `src/components/BeforeAfterGallery.tsx` — same, container has fixed height
- Modify: `src/index.css` — add `size-adjust` to font fallback
- Modify: `src/pages/components/HeroV2.tsx` — hero image container needs explicit min-height before image loads

- [ ] **Step 1: Add font size-adjust to CSS fallbacks**

The `font-display: swap` on Google Fonts means the browser renders with the fallback font (Impact/Arial Black for Bungee, sans-serif for Roboto Condensed), then swaps when the web font loads. If the fallback has different metrics, content shifts.

Add `@font-face` override declarations in `index.css` with `size-adjust`:

```css
@font-face {
  font-family: 'Bungee Fallback';
  src: local('Impact');
  size-adjust: 105%;
  ascent-override: 95%;
  descent-override: 22%;
  line-gap-override: 0%;
}

@font-face {
  font-family: 'Roboto Condensed Fallback';
  src: local('Arial');
  size-adjust: 93%;
  ascent-override: 97%;
  descent-override: 25%;
  line-gap-override: 0%;
}
```

Then update the font stacks:
```css
--font-decorative: 'Bungee', 'Bungee Fallback', 'Impact', 'Arial Black', sans-serif;
--font-futura: 'Roboto Condensed', 'Roboto Condensed Fallback', 'Arial', sans-serif;
```

And the utility classes:
```css
.font-decorative {
  font-family: 'Bungee', 'Bungee Fallback', 'Impact', 'Arial Black', sans-serif;
}

.font-main {
  font-family: 'Roboto Condensed', 'Roboto Condensed Fallback', 'Arial', sans-serif;
}
```

- [ ] **Step 2: Ensure hero section reserves space before image loads**

The hero already has `min-h-screen` which reserves full viewport height. The `<img>` element (from Task 4) is absolutely positioned inside it, so it won't cause shifts. No additional changes needed here — just verify.

- [ ] **Step 3: Verify no layout shifts on page load**

Run: `npm run dev`
Open DevTools → Performance → record page load → check for layout shift entries.
The CLS indicator in the Performance panel should show minimal shifts.

- [ ] **Step 4: Run type check**

Run: `npx tsc --noEmit`
Expected: No errors

---

### Task 6: Final Verification

- [ ] **Step 1: Run full build to ensure no errors**

Run: `npm run build`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Run Lighthouse audit on dev server**

Run: `npm run dev`
Open Chrome DevTools → Lighthouse → run Mobile performance audit.
Target scores:
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- RES > 90

- [ ] **Step 3: Cross-browser check**

Test in Chrome and Firefox:
- Hero image loads promptly
- Slider interaction is smooth
- No layout jumps on page load
- Header scroll transition works
