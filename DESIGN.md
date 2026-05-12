# VE YRON Luxury Activewear — Dark-First Premium Design

## Purpose & Context
Mobile-first e-commerce for ultra-premium unisex activewear (trackpants & shorts) in India. Target: discerning customers matching Nike/Gymshark/Lululemon. Full flow: hero → Mens/Womens/Plus Sizes tabs → product detail → cart → checkout → confirmation. Delivery 5–7 days, returns 7-day window. Aesthetic: dark-first, cinematic, product-centric, unisex.

## Tone & Aesthetic
Uncompromising luxury minimalism—bold, geometric, obsessively refined. Saturated gold (H 47°) only on CTAs/badges, pure black backgrounds (L 0.08), crisp white text (L 0.96). Inspired by Nike App dark, Adidas flagship, Gymshark editorial. Every element earns its place. Sharp, decisive, premium.

## Visual Direction & Differentiation
Dark-first by default (L 0.08 background, L 0.96 foreground) with auto device theme detection via `prefers-color-scheme`. Gold accent (H 47°, chroma 0.20 dark / 0.18 light) used exclusively for CTAs, active states, focus rings, badges. **Unisex positioning:** Top-level navigation Mens | Womens | Plus Sizes (separate filterable tabs). **Mobile excellence:** Perfect 1:1 product image squares (object-fit: cover), aggressive whitespace, 44px+ touch targets. **Typography:** Space Grotesk (geometric display), Satoshi (refined body). **Micro-motion:** Smooth 0.3s transitions, shadow elevation on hover, no bounce.

## Color Palette

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Background | `0.98 0 0` (near-white) | `0.08 0 0` (deep black) | Page backgrounds |
| Foreground | `0.08 0 0` (deep black) | `0.96 0 0` (near-white) | Primary text |
| Card | `0.94 0 0` | `0.14 0 0` | Product cards, elevated surfaces |
| Primary (Gold) | `0.72 0.18 47` | `0.80 0.20 47` | CTAs, focus rings, badges |
| Success | `0.70 0.18 132` | `0.75 0.20 132` | Order confirmed, validation |
| Muted | `0.90 0 0` | `0.24 0 0` | Secondary text, placeholders |
| Border | `0.85 0 0` | `0.22 0 0` | Form inputs, dividers |

## Typography & Scale

| Role | Font | Scale | Weight | Usage |
|------|------|-------|--------|-------|
| Display | Space Grotesk | 48–72px | 700 | Hero, category labels, badges |
| Body | Satoshi | 14–16px | 400–500 | Descriptions, labels, copy |
| Mono | JetBrains Mono | 12–14px | 400 | Prices, order numbers, specs |

Hero text line-height 1.1 (tight), body 1.6 (open). Uppercase tracking 0.125em on badges/labels. Geometric sans-serif establishes luxury tier.

## Elevation & Depth

| Layer | Shadow | Appearance |
|-------|--------|------------|
| Base | None | Flat |
| Card | `shadow-md` (0 4px 16px, 12% darkness) | Subtle lift |
| Hover | `shadow-lg` (0 12px 32px, 16% darkness) | Interactive elevation |
| Elevated | `shadow-elevated` (0 16px 48px, 20% darkness) | Modals, sticky nav |

Shadows always dark (rgba 0,0,0), never color-tinted. Minimal shadows respect refined aesthetic.

## Structural Zones & Surface Treatment

| Zone | Background | Border | Treatment |
|------|-----------|--------|----------|
| Header/Nav | `bg-background` sticky | `border-b border-border` on scroll | Clean, grounded minimal chrome |
| Hero | Full-width cinematic | None | Space Grotesk headline, gold subheading |
| Tab Navigation | `bg-background` | Underline active (gold) | Mens \| Womens \| Plus Sizes — separate |
| Product Grid | `bg-background` | None | 2 cols mobile / 3 tablet / 4 desktop |
| Product Card | `bg-card` | `border border-border` | 1:1 image top, title/price/CTA below |
| Form Section | `bg-card` | `border border-border` | Uppercase labels, gold focus rings |
| Checkout Summary | `bg-card sticky` | `border border-border` | Desktop: sticky right sidebar |
| Footer | `bg-card` | `border-t border-border` | Muted text, clean typography |

## Spacing & Rhythm
8px base unit. Mobile padding 16px, tablet/desktop 24–32px. Gaps: 16px (compact), 24px (standard), 32px (generous). Vertical rhythm: 2–3 sections per viewport. Generous whitespace signals luxury.

## Component Patterns & Interactions
- **Buttons:** Uppercase tracking, `.btn-luxury` (gold), `.btn-success` (green). Hover: opacity -10%. Active: scale-95.
- **Tabs:** Horizontal Mens | Womens | Plus Sizes. Active: gold underline. Mobile: hamburger option.
- **Product Cards:** 1:1 image top, name/price/CTA below, border + shadow-md.
- **Forms:** Uppercase labels, clear focus. Focus ring: 2px gold.
- **Badges:** Uppercase 10px, gold bg on active.
- **Gallery:** Swipeable carousel, arrows (desktop), swipe (mobile), thumbnails, counter.

## Motion & Choreography
Global transition 0.3s ease-out on interactive elements. Entrance: fade-in + slide-up (0.4s stagger). Hover: shadow/opacity only. Respects `prefers-reduced-motion`.

## Responsive Breakpoints
- Mobile: 320–479px (single col grid, hamburger nav, full-width forms)
- Tablet: 480–1023px (2-col grid, side-by-side forms/summary)
- Desktop: 1024–1439px (3-col grid, sticky nav/summary)
- Large: 1440px+ (4-col grid, max-width container)

## Constraints & Accessibility
- WCAG AA contrast: ≥4.5:1 foreground-on-background, ≥3:1 foreground-on-primary
- Touch targets: ≥44px height (buttons, tabs, inputs)
- No motion on page load; entrance via CSS keyframes
- Dark mode as system default; light mode auto-detected via `prefers-color-scheme`
- Product images: 1:1 aspect ratio, object-fit: cover
- Focus visible: gold ring (ring-primary) on all interactive elements

## Signature Details
1. **Unisex Positioning:** Top-level Mens | Womens | Plus Sizes tabs (separate filterable views)
2. **Mobile Excellence:** Perfect 1:1 images, aggressive whitespace, 44px+ touch targets
3. **Gold Restraint:** Saturated gold (H 47°) on CTAs/focus only—never fills backgrounds
4. **Dark-First Default:** Site launches dark (L 0.08). Auto-detection respects device theme
5. **Premium Typography:** Space Grotesk (geometric display) + Satoshi (refined body) establishes luxury tier
6. **Shadow Hierarchy:** Minimal dark-tinted shadows create depth without decoration

## Learnings & Patterns
Luxury dark requires precision: deep blacks (L 0.08, not 0.1) + saturated text (L 0.96) for WCAG AA+. Gold (H 47°, chroma 0.18–0.20) creates pop without cheapness—avoid muted golds. Mobile-first + 1:1 images forces intentional whitespace. Unisex tabs (Mens | Womens | Plus Sizes) require Shopify product filtering by name/tag. Sticky checkout (≥768px) + auto-fill customer details improves conversion. Green success (not gold) differentiates confirmation state. Auto device theme (prefers-color-scheme) creates premium native feel.
