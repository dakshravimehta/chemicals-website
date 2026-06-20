# Design

Visual system for Aurelis Chemicals. Aesthetic lane: **industrial spec-sheet**, a precision
material datasheet turned into a brand. Deliberately not the navy + gold "premium corporate"
template, not a cluttered trader listing site, not web3 gloss.

## Theme

Light-first (warm "bone paper") with committed graphite-dark sections for the hero, the
"why us" band, and the footer. The contrast between bone daylight and graphite night is part
of the voice: a clean datasheet punctuated by heavy machined panels.

## Color

Strategy: **Committed.** Warm graphite + bone neutrals carry the surface; one ownable accent,
**signal orange** (the vermilion of hazard signage and engineered equipment), does the
pointing. All values OKLCH; neutrals are tinted warm (never pure black or white).

| Role | Token | OKLCH |
|---|---|---|
| Paper (page bg) | `--paper` | `oklch(0.976 0.006 75)` |
| Panel | `--paper-2` | `oklch(0.954 0.008 74)` |
| Surface | `--surface` | `oklch(0.992 0.004 75)` |
| Ink (text) | `--ink` | `oklch(0.23 0.013 65)` |
| Ink muted | `--ink-2` | `oklch(0.45 0.013 66)` |
| Hairline | `--line` | `oklch(0.88 0.008 72)` |
| Graphite (dark bg) | `--graphite` | `oklch(0.205 0.012 66)` |
| Graphite raised | `--graphite-2` | `oklch(0.255 0.013 66)` |
| On-graphite text | `--on-graphite` | `oklch(0.95 0.006 78)` |
| **Signal (accent)** | `--signal` | `oklch(0.66 0.192 42)` |
| Signal (text on paper) | `--signal-strong` | `oklch(0.58 0.195 40)` |
| Signal wash | `--signal-soft` | `oklch(0.95 0.030 62)` |

Rules: accent is for CTAs, the logo mark, eyebrows, hover states, and one keyword per
headline, never large fills of body area. Body text is always `--ink` / `--on-graphite`,
never orange. Orange text on light uses `--signal-strong` for AA.

## Typography

- **Display / headings:** Archivo (700–800), tight tracking (-0.02 to -0.035em). Stamped,
  industrial, confident. Used big.
- **Body / UI:** Hanken Grotesk (400–700). Clean, legible, neutral.
- **Data / labels:** Martian Mono (400–600). CAS codes, product codes, section indices
  (`01 / What we supply`), spec metadata, eyebrows. Uppercase, wide tracking (0.1–0.2em).

Fluid scale via `clamp()`, ≥1.25 between steps: `--t-display` up to 6.5rem, `--t-h2` to
2.85rem, body ~1.05rem. Headlines `text-wrap: balance`, body `text-wrap: pretty`, measure
capped ~64ch.

## Layout

- Visible structure: hairline rules, numbered section eyebrows (the `.eyebrow` ::before tick),
  bordered metric cells, a faint engineering grid behind the hero.
- Asymmetric and left-aligned by default; not centered stacks. Hero is a 1.05/0.95 split.
- Category list is a ruled, full-width row list (index · icon · name+desc · browse link), not
  a uniform card grid. Capabilities use a hairline-separated 4-up panel on graphite.
- Engineered radii: mostly sharp (`--r-sm` 2px / `--r-md` 4px / `--r-lg` 8px). No pills.
- `--maxw: 1240px` container; section padding fluid `clamp(3.5rem, …, 7rem)`.

## Components

- **Buttons:** `.btn-primary` (signal fill, dark ink text), `.btn-dark` (ink fill), `.btn-outline`
  (hairline, ink), `.btn-on-dark` (for graphite sections). Squared, Archivo 700, subtle
  `translateY(-2px)` on hover, arrow icons nudge on hover. No pill shape, no sweep fills.
- **Eyebrow:** mono label with a leading orange tick. `.eyebrow--on-dark` variant.
- **Cards/panels:** flat, hairline-bordered, low warm-tinted shadows. No glassmorphism.
- **Image treatment:** duotone/overlay (graphite + signal gradient, reduced saturation) so
  photography reads as one branded world, framed with a hairline and a mono corner tag.

## Motion

One ease-out reveal per section via the `Reveal` component (IntersectionObserver + `.reveal`/
`.is-in`), staggered by index. Curve `cubic-bezier(0.22, 1, 0.36, 1)`. No bounce, no parallax,
no animate-on-everything. `prefers-reduced-motion` disables transforms globally.

## Accessibility

WCAG 2.1 AA. Visible `:focus-visible` ring in `--signal-strong`. Skip-link to `#main`.
Body text contrast against both bone and graphite exceeds AA. Reduced-motion honored.

## Anti-patterns (do not reintroduce)

Navy + metallic gold, glassmorphism, gradient text, pill buttons, uniform icon-card grids,
the big-gradient hero-metric template, side-stripe accent borders, em dashes in copy.
