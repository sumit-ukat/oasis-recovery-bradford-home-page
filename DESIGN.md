# Oasis Recovery Bradford — Design System

Not sourced from UXKIN (not connected this session). Based on the project's
own existing tokens (`src/styles.css`) plus 7 reference sites the client
supplied directly: Medicare/General Hospital (bold-themes), MD's three demo
variants — default/Health Hub, Hospital, Private Clinic (axiomthemes), and
Advisora's light + dark demos (pikathemes). Brand colors and type are kept
exactly as they are — this system is about layout and surface conventions,
not a repaint.

## 1. Color — unchanged, just given explicit roles

All already defined as oklch tokens in `styles.css`. Never hardcode a raw
color in a component; use the token name.

| Token | Value | Role |
|---|---|---|
| `--primary` | `oklch(0.645 0.11 239)` — Oasis blue `#4496c9` | Links, icon tints, focus rings, secondary CTAs |
| `--accent` | `oklch(0.655 0.20 348)` — Oasis pink `#e84f92` | Primary CTA buttons only — never decorative |
| `--secondary` | `oklch(0.94 0.03 229)` — light blue tint | Alternating section background |
| `--sand` | `oklch(0.962 0.018 225)` | Hero / footer warm-tint background |
| `--deep` | `oklch(0.28 0.09 239)` — dark navy | "Break" sections (RecoveryBeyondRehab) — used sparingly, 1 per page max |
| `--border` | `oklch(0.885 0.025 229)` | Dividers, bordered-panel outlines |

Contrast already verified (foreground tokens paired per-background). No new
colors — the reference sites each lean on one brand color + neutrals, not a
rainbow, and Oasis should do the same.

## 2. Typography — unchanged

- Display (`h1`–`h3`): **Fraunces** — serif, weight 500, `tracking: -0.025em`
- Body: **Public Sans**
- Eyebrow label: `0.6875rem`, `tracking: 0.18em`, uppercase, `font-semibold`,
  `text-muted-foreground` — used before every section heading, sometimes
  with an icon (see Advisora's "(SCROLL)" / pill-badge pattern)
- H2 scale: `2rem` → `2.5rem` (sm) → `3rem` (lg), `leading-[1.08]`
- Body: `text-base`/`text-[1.0625rem]`, `text-muted-foreground` for
  secondary copy

## 3. Spacing & shape — unchanged

- Section padding: `py-14 sm:py-20 lg:py-24`
- Radius scale from `--radius: 0.875rem` (`rounded-xl`/`2xl`/`3xl` via the
  `@theme` calc chain)
- Shadows: `--shadow-soft` (cards at rest), `--shadow-lift` (floating
  elements, mega menu, hover states) — no new shadow values needed

## 4. Section-level conventions (the actual redesign)

This is what was missing before and made the page read as generic. Four
reusable patterns, applied site-wide instead of once:

### a) Bordered/divided panel, not N boxed cards
Reference: MD's "Complete care / Expert guidance" 2×2 grid — thin
`divide-x`/`divide-y` lines, no per-item box/shadow.
**Rule:** any section presenting 3+ parallel items (icon + title + desc)
renders as ONE bordered panel with internal dividers on desktop, never N
separate `border + shadow` boxes side by side. Mobile keeps individual
cards (needed for swipe-carousel affordance) — only the desktop static grid
changes. Applied first to TreatmentCentre's differentiators; extend to
every other icon-grid section (CQC domain grid, Facilities "typical day",
etc.).

### b) Floating stat/price pill on a photo
Reference: MD Private Clinic's "125+ Expert doctors" pill overlapping the
hero photo's corner.
**Rule:** any section pairing body copy with a single supporting photo gets
one (never more) small bordered/shadowed pill overlapping the photo's
corner, surfacing a real existing number from that section's own content
(price, stat, rating) — not invented data. Applied to Costs
(`£9,995 — 28-day programme`).

### c) Oversized ghost text as a section break
Reference: MD's huge pale "Health Hub" divider; already present once in
this codebase (RecoveryBeyondRehab's giant faint "90").
**Rule:** at most one per page already exists — do not add more; it's a
rare punctuation mark, not a repeating pattern. Noted here so it isn't
accidentally duplicated elsewhere.

### d) Scroll-reveal
Pure CSS + a native `IntersectionObserver` hook (`useReveal`, no library).
Never applied to hero/LCP content. Content always renders visible — this
is progressive enhancement, not a visibility gate (SSR-safe, no-JS-safe).
Applied to every section's intro heading block.

### e) Texture, never flat
- `.bg-grid-faint` — CSS-gradient grid pattern (zero network cost), hero
  background only
- `.bg-grain` — inline-SVG noise (zero network cost), `--deep` sections only
- Neither is decorative glassmorphism-everywhere; each used exactly once
  per its matching section type

## 5. Components

- **Buttons:** primary = solid `--accent` pill (`Speak to admissions`
  style); secondary = outlined `border-border`; both already in
  `components/ui/button.tsx` — no new variants needed
- **Icons:** Lucide only, always inside a tinted circular badge
  (`bg-primary/10 text-primary`), never bare/oversized, never emoji
- **Cards:** `rounded-2xl border border-border/60 bg-card` at rest — see
  §4a for when NOT to use a card per-item
- **Carousels:** existing horizontal/vertical snap-scroll + drag + dot
  controls pattern (built this session) — keep as the one carousel
  mechanism site-wide, don't introduce a second

## 6. What to avoid (seen in the generic-AI reference point, deliberately not repeated)

- A boxed card grid for every list of 3+ things (see §4a)
- Flat, textureless section backgrounds (see §4e)
- Centering every section — Oasis already mixes left-aligned
  (`border-l-2` eyebrow) and centered intros; keep that mix
- Gradient text on headings — not used anywhere in this system, don't add it
- Glassmorphism as a blanket style — `backdrop-blur` used exactly once
  (Costs stat pill), not as a repeating texture
