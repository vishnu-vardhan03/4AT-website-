---
name: ui-consistency
description: Use when building, restyling, or reviewing any UI under Frontend/ — pages, sections, hero blocks, cards, buttons, form fields, dashboard panels. Encodes the 4AT design system: where tokens live, which CSS-variable scope a component will render under, the shared primitives to reuse instead of hand-rolling, the brand palette, and the drift patterns that have already fragmented this codebase.
---

# 4AT UI consistency

The site is a **dark-only, token-driven, route-scoped** design system. Most visual
inconsistency here comes from one root cause: components hardcode colours instead of
using tokens, so the same "card" or "CTA" looks slightly different on every page.
Current drift, measured: **115 distinct hex literals** and **17 different Tailwind
named palettes** across `Frontend/src/components`, three separate `TiltCard`
implementations, and two parallel form-field systems.

Read this before writing UI. It is a contract, not a suggestion.

## Non-negotiables

1. **Never add a raw hex to a component.** Use a token or a brand-ramp value from the
   palette below. If you truly need a new value, add it to `@theme inline` in
   `Frontend/src/app/globals.css`.
2. **Never add tokens to `Frontend/tailwind.config.ts`.** It is dead — see *Tailwind v4*
   below.
3. **Check the token scope before using a token class.** Half the tokens only resolve
   under `.academy-page`. See the scope matrix; getting this wrong fails silently.
4. **Reuse the primitive before writing a new one.** Search first; the thing you are
   about to build probably exists.
5. **Use `cn()` from `@/lib/utils`** to compose classes so callers can override.
6. **Use `hover-fine:` not `hover:`** for visual hover affordances, so touch devices
   don't latch a hover state.

For anything touching Next.js APIs (routing, fonts, metadata, image), follow
`Frontend/AGENTS.md` and read `Frontend/node_modules/next/dist/docs/` first — this
Next version diverges from common knowledge.

## Where styling lives

| File | Role |
|---|---|
| `Frontend/src/app/globals.css` | Tailwind v4 entry, `@theme inline` token→class mapping, `:root` defaults, `.services-page` scope, shared `@utility` layer, global keyframes |
| `Frontend/src/styles/academy.css` | The entire `.academy-page` scope: its own token set, type scale, buttons, effects |
| `Frontend/src/components/ui/` | Cross-route primitives (`card`, `Reveal`, `SectionWrapper`, `TiltCard`, `Glyph`, `skeleton`, `MouseGlow`, `ScrollProgress`) |
| `Frontend/tailwind.config.ts` | **Inert. Do not edit.** |

### Tailwind v4 — the config file is dead

`globals.css` uses `@import "tailwindcss" source(none)` + `@source ".."` + `@theme inline`,
and there is **no `@config` directive**. A v4 build therefore never loads
`tailwind.config.ts`, so every token declared there produces no class:
`bg-void`, `bg-void-2`, `bg-glass`, `bg-grad-v`, `bg-grad-vt`, `bg-grad-t`,
`animate-flow`, `animate-shimmer`, `animate-pulse-glow`, `animate-bob`,
`animate-marquee`, `animate-marquee-r` are all no-ops. Nothing in `src` references them
today — keep it that way. New design tokens go in `@theme inline`; new keyframes go in
`globals.css` (or `academy.css` if academy-only).

## Token scope matrix

Every page mounts under a scope class that redefines CSS variables. `@theme inline` maps
those variables to utility classes, so **the same class produces different colours — or
nothing at all — depending on scope.**

| Scope | Applied in | Adds |
|---|---|---|
| `:root` (everywhere) | — | `background` `foreground` `card` `popover` `primary` `secondary` `muted` `accent` `destructive` `border` `input` `ring`, `--radius`, `--font-display`, `rounded-pill/card/frame` |
| `.services-page` | `components/services/ServicesPage.tsx` | `brand` `brand-foreground` `brand-glow` `surface` `surface-muted` `ink` `ink-foreground` `ink-soft` |
| `.academy-page` | `app/academy/layout.tsx` (+ imports `academy.css`) | `canvas` `surface-raised` `surface-overlay` `ink-primary/secondary/tertiary/disabled` `accent-hover/active/subtle/border` `sky` `violet` `highlight*` `border-strong/focus/active` `success*` `warning*` `danger*` `info*` |
| `.contact-page`, `.legal-page` | `ContactPage.tsx`, `terms/page.tsx`, `privacy/page.tsx` | overrides base tokens only (`background` `foreground` `card` `border` `input` `ring`) — **no new token names** |
| `.home-page`, `.about-page` | `HomePage.tsx`, `AboutPage.tsx` | motion/marquee styles only — **no extra tokens** |
| `.constant-site-background` | home, about, `/admin`, `/dashboard` | fixed gradient+grid canvas |

### Three landmines

- **`accent` flips meaning.** `:root` sets `--accent: oklch(0.18 0 0)` (near-black grey);
  `.academy-page` sets `--accent: #2dd4bf` (teal). So `text-accent` / `focus:border-accent`
  is *teal on academy pages and dark grey everywhere else*. `academy/register/constants.ts`
  `INPUT_CLASS` relies on the academy meaning — reusing it outside academy gives an
  invisible focus ring.
- **`brand` flips meaning.** `.services-page` → blue `oklch(0.55 0.21 256)`;
  `.academy-page` → `#0a0a0a` near-black. `bg-brand` is not portable.
- **`ink-*`, `canvas`, `surface-raised`, `success/warning/danger/info` resolve to nothing
  outside `.academy-page`**, because they alias `--academy-*` variables that only exist
  there. The declaration is dropped at computed-value time, so you get inherited colour
  with no error. `surface` and `ink`/`ink-soft` work on services *and* academy, nowhere else.

**Rule:** a component intended for more than one route may only use `:root` tokens, the
shared `@utility` layer, or explicit brand-ramp values. Academy-only components may use
the full academy set.

## The brand palette

The 4AT ramp — teal → sky → violet, on near-black canvas. These are the only colours a
component should introduce:

| Role | Value | Notes |
|---|---|---|
| Canvas | `#04060f` | also `--color-black: #0a0e23`, academy canvas `#0a0a0a` |
| Teal | `#2dd4bf` | ramp start; deep `#14b8a6`, `#0f766e` |
| Sky | `#7dd3fc` | ramp middle; `#38bdf8` for brighter accents |
| Violet | `#a78bfa` | ramp end; `#c084fc` highlight, `#c4b5fd` soft text |
| Amber | `#fbbf24` | highlight / warning only |
| Danger | `#f87171` | errors only |
| Surfaces | `bg-white/[0.02]`→`[0.055]` | glass fills |
| Hairlines | `border-white/10` (`/8`, `/16` for strong) | |
| Text | `text-white`, `white/68`, `white/38` | primary / secondary / tertiary |

Gradients: `linear-gradient(90deg, #2dd4bf, #7dd3fc, #a78bfa)` — or just use
`.text-brand-gradient` / `.text-brand-gradient-flow`.

### Palettes to stop using

`emerald` (98 uses), `purple` (83), `cyan` (41) are near-duplicates of the brand
teal/violet/sky and are the single largest source of visual drift. Also present and
unjustified: `zinc` (24), `slate` (17), `neutral` (12), `indigo` (4), `yellow` (4),
`fuchsia` (3), `blue` (2), `rose` (1), `pink` (1). Never introduce a palette not already
listed here.

Map on sight: `emerald-*` → teal `#2dd4bf` · `purple-*` → violet `#a78bfa` ·
`cyan-*` → sky `#7dd3fc` · `red-*`/`rose-*` → `#f87171` · `amber-*`/`yellow-*` → `#fbbf24`
(or academy `highlight`/`warning` tokens) · `slate/zinc/neutral-*` → `white/<alpha>`. When
editing a file for another reason, convert the ones you touch; don't leave a file
half-converted.

## Reuse before you build

### Shared `@utility` layer (available in every scope)

| Utility | Use for |
|---|---|
| `site-section` | section padding — `py-14 md:py-24 px-6 md:px-12 lg:px-20` |
| `site-hero-heading` / `site-hero-subheading` | above-the-fold h1 + lede |
| `site-heading` / `site-subheading` | section h2 + supporting copy |
| `section-badge` | pill label above a heading |
| `eyebrow` (+ `.dot`) | small uppercase kicker |
| `text-brand-gradient` / `-flow` | gradient text emphasis (static / animated) |
| `glass` / `glass-card` | translucent surface (card is the heavier, shadowed variant) |
| `section` / `section-inner` | full-bleed section + `max-w-[75rem]` centred content |
| `no-scrollbar` | hide scrollbars on horizontal rails |

Dead: `site-section-y` and `.text-brand-accent` have zero call sites — don't start using
them; prefer `site-section` and `text-[#7dd3fc]`.

Academy pages additionally get a fluid type scale (`text-hero`, `text-h1`–`text-h3`,
`text-lead`, `text-body`, `text-small`, `text-label`, `text-eyebrow`) and effect classes
(`fx-primary-btn`, `fx-ghost-btn`, `primary-gradient-button`, `secondary-gradient-button`,
`sheen-container`/`sheen-overlay`, `pill`, `feature-tile`, `link-underline`,
`section-title`/`-desc`/`-eyebrow`, `shadow-glow`). These are scoped to `.academy-page`
and **will not work** elsewhere.

### Components

| Need | Use | Don't |
|---|---|---|
| Card surface | `Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardContent` from `@/components/ui/card` | re-type `rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl` |
| Scroll-in reveal | `@/components/ui/Reveal` | a fresh `motion.div` with new timings |
| Section scroll fade | `@/components/ui/SectionWrapper` | per-section `useScroll` |
| Tilt-on-hover card | `@/components/ui/TiltCard` | `home/TiltCard` or `services/TiltCard` (duplicates — consolidate onto `ui/`) |
| Academy CTA | `@/components/academy/Button` (`variant` primary/secondary/ghost/nav, `size` sm/md/lg, `href` → renders Link/anchor) | inline button class strings |
| Academy form field | `academy/register/FormField` + `INPUT_CLASS` / `SELECT_CLASS` / `INPUT_ERROR_CLASS` / `INPUT_DISABLED_CLASS` from `academy/register/constants` | new input class strings |
| Marketing form field | `TextField` / `SelectField` / `TextareaField` from `@/components/lead-collection/FormFields` — they own the shared `baseFieldClass`, label, required marker and error slot | a raw `<input>` plus a hand-written class string |
| Loading state | `@/components/ui/skeleton` | ad-hoc pulsing divs |

**There is no cross-route Button.** `academy/Button` depends on `.academy-page .fx-*`
classes, so outside academy every CTA is currently an ad-hoc class string. Until a shared
one exists, non-academy CTAs must use exactly this, via `cn()`:

```tsx
// primary
"inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#04060f] bg-gradient-to-r from-[#2dd4bf] via-[#7dd3fc] to-[#a78bfa] transition hover-fine:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7dd3fc]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060f] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"

// secondary / ghost
"inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white/70 backdrop-blur-sm transition hover-fine:border-white/20 hover-fine:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7dd3fc]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060f] active:scale-[0.98]"
```

If you find yourself pasting either string a third time, extract
`Frontend/src/components/ui/Button.tsx` with those two variants and migrate call sites —
that is the correct fix, not another copy.

## Section skeleton

Every marketing section follows this shape. Match it.

```tsx
<section className="site-section relative overflow-hidden">
  <div className="mx-auto w-full max-w-[75rem]">
    <span className="section-badge">Why 4AT</span>
    <h2 className="site-heading mt-5">
      Finance-native <span className="text-brand-gradient">intelligence</span>
    </h2>
    <p className="site-subheading text-white/68">One or two lines of support copy.</p>
    <Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{/* cards */}</div>
    </Reveal>
  </div>
</section>
```

Spacing scale in use: `gap-5`/`gap-6` in grids, `mt-4`/`mt-5` heading→copy,
`mt-10`/`mt-12` copy→content, `p-6` card padding. Radii: `rounded-full` (pills, CTAs),
`rounded-xl` (inputs), `rounded-2xl` (cards), `rounded-[28px]` / `rounded-frame` (frames).

## Motion

- **`framer-motion` only** — all 34 imports use it. Do not introduce `motion/react`.
- Canonical entrance is `Reveal`: `y: 80`, `blur(12px) → 0`, `scale 0.98 → 1`,
  `duration 1`, `ease [0.22, 1, 0.36, 1]`, `viewport={{ once: true, amount: 0.15 }}`.
  Reuse those values if you must animate inline.
- Standard transition for CSS hover/state changes: `transition duration-300 ease-out`.
- Long-running ambient animation (marquees, orbits, glows) belongs in CSS keyframes in
  `globals.css`/`academy.css`, not JS.
- **Respect reduced motion.** Only 9 files do today, in a heavily animated site. Guard
  JS-driven motion with `useReducedMotion()` from framer-motion, and CSS-driven motion
  with `@media (prefers-reduced-motion: reduce)`.

## Accessibility floor

Currently only 3 of 22 interactive component files mention `focus-visible`. Do not add to
that gap.

- Every interactive element needs a visible focus ring:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7dd3fc]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#04060f]`
  (inside `.academy-page`, `ring-accent` + `ring-offset-canvas` is equivalent and preferred).
- Icon-only controls need `aria-label`. Decorative glows/orbs need `aria-hidden="true"`
  and `pointer-events-none`.
- Labels use `htmlFor` tied to the input `id`; errors render adjacent and are referenced
  with `aria-describedby` / `aria-invalid`.
- Body text stays at or above `text-white/68`; `white/38` is for tertiary metadata only,
  never for copy the user must read.

## Fonts

Space Grotesk is currently loaded **twice** — a render-blocking
`@import url('https://fonts.googleapis.com/...')` at `globals.css:1` *and* `next/font/google`
in `app/academy/layout.tsx` and `app/product/layout.tsx` — while the root layout loads
Geist, which nothing uses (`body` resolves `--font-display` to Space Grotesk).

Do not add another font, and do not add another loader for Space Grotesk. Use
`font-display` (or academy's `font-sans`, which maps to the same face). Fixing the
duplication means one `next/font` load wired into `--font-display` and deleting the CSS
`@import` — worth doing, but do it deliberately, not as a side effect.

## Checklist before you finish

- [ ] No new hex literal in a component; no new Tailwind named-palette colour.
- [ ] Every token class used actually resolves in the scope this component renders under.
- [ ] Reused `Card` / `Reveal` / `SectionWrapper` / `ui/TiltCard` / `FormField` / `skeleton`
      rather than re-implementing; no new duplicate primitive.
- [ ] Section uses `site-section` + `site-heading`/`site-subheading` + `section-badge`;
      no bespoke padding or type sizes.
- [ ] Class strings composed with `cn()`; `className` prop respected and last.
- [ ] `hover-fine:` used for hover affordances.
- [ ] Visible `focus-visible` ring on every interactive element; icon-only controls labelled.
- [ ] Motion reuses the `Reveal` timings and honours reduced motion.
- [ ] Nothing added to `tailwind.config.ts`.
- [ ] Dark-only — no light-mode branch.

## Known drift worth fixing on contact

Not a to-do list to attack wholesale; fix the ones you touch.

- `TiltCard` exists 3× (`ui/`, `home/`, `services/`); `Hero.tsx` and `HowItWorks.tsx` exist 2×.
- `tailwind.config.ts` is inert and unreferenced — deletable.
- `SectionWrapper.tsx` carries an empty `style` object and a stripped-out transform from an
  abandoned edit.
- Two parallel form-field systems remain: `lead-collection/FormFields` (marketing pages) and
  `academy/register/FormField` + `INPUT_CLASS` (academy). Pick by which scope you are in;
  don't add a third.
- `country-state-city` is now an unused dependency — nothing imports it since the academy
  location fields became free text.
- `Frontend/public` (126 MB) and `Frontend/src/assets` (106 MB) hold largely duplicated assets.
- No shared `Button`; ~102 component files and every non-academy CTA is bespoke.
