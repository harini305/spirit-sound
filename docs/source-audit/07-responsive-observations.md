# 07 — Responsive Observations

**Tested viewports (headless Chrome 155, 2026-10-17):** desktop **1440×900**, tablet **768×1024** (touch), mobile **390×844** (mobile emulation, touch). Full-page screenshots in [screenshots/](screenshots/) named `{page}--{device}-{width}.png`. Measurements: [screenshots/_capture-report.json](screenshots/_capture-report.json).

**Original breakpoints (Elementor):** tablet `max-width:1024px`, mobile `max-width:767px`. Container max-width 1140px (boxed).

## 1. Measured page heights & overflow

| Page | 1440 | 768 | 390 | Horizontal overflow |
|---|---|---|---|---|
| Home | 5609px | 4763px | 6704px | None (scrollWidth = viewport at all sizes) |
| Product | 2621px | 2125px | 3357px | None |
| Our Journey | 4311px | 3737px | 4952px | None |
| Contact | 3784px | 3359px | 4297px | None |
| Category/Blog, Hello world, 404 | 900 / 2037 / 900 | n/a | 1249 / 2787 / 1227 | None |

(The mobile dropdown menu's off-canvas items extend beyond the viewport while closed but are clipped — no visible scroll.)

## 2. Header & navigation
- **Desktop:** 81px tall; logo mark + "THE SPIRIT SOUND GALLERY" left, 4 nav links centred, black WhatsApp button right; 80px side padding.
- **Tablet 768:** 80px; full horizontal nav still shown (nav font drops to 11px), WhatsApp button retained.
- **Mobile 390:** 66px; **site name text hidden** (only icon mark), WhatsApp button + grey hamburger right. Menu opens a full-width white dropdown (160px, 4 items, active item on dark grey #3F4246-ish bar — estimate) that overlays the hero. Verified `aria-expanded` toggles.
- Sticky on all devices (config); computed position is static at top of page, becomes fixed on scroll via jquery.sticky.

## 3. Hero
- `min-height: 100vh` on Home and Product (centred content). H1 68 → 40 → 27px. Eyebrow 25 → 17 → 15px. Paragraph 16 → 14 → 12px.
- Home video plays on mobile too (setting `background_play_on_mobile: yes`) — the 53 MB 4K file is downloaded on phones.
- Mobile: H1 wraps to 2–3 lines; 12px hero paragraph is small.

## 4. Layout changes by section
| Section | Desktop | Tablet | Mobile |
|---|---|---|---|
| Home "Journey Guided by Sound" | 2 cols (image 470px tall left, text right) | 2 cols, narrower | Stacked, image first |
| Home collection cards | 3 cards in a row, 450px tall | 3 in a row (text cramped, 12px) | Stacked, full width |
| Testimonials | Centred single slide with arrows | Same (one capture showed the slide mid-fade/blank — capture-timing artifact, **unverified**) | Narrow, text wraps heavily |
| Gallery (justified) | 3 rows (4/3/2 images) | 3 rows | 2-up rows |
| Visit block + map | 2 cols | 2 cols | Stacked; map below text |
| Product cards | 3 in a row | 3 in a row | Stacked |
| Our Journey split sections | 2 cols | 2 cols | Stacked |
| Living With Sound pillars | 3 cols | 3 cols | Stacked |
| Contact channel cards | 3 cols | 3 cols | Stacked |
| Footer | 3 cols (brand wide left, two narrow right) | 3 cols | Stacked, left-aligned |

## 5. Typography & spacing changes
- Paragraphs drop to 13px (tablet) and 12–13px (mobile) at weight 300 — **legibility concern**.
- Many fixed `width: 500–700px` paragraph widths switch to `100%` on mobile with ad-hoc 2–20px inline padding — inconsistent side gutters across sections.
- Large vertical padding (~100px) is mostly kept on tablet, producing long scroll lengths (Home is 6704px on mobile).

## 6. Image cropping
- Wide panoramas (I4, I5 at ~2.09:1) are used as backgrounds for tall/portrait containers on mobile → heavy centre crops.
- Founder portrait (I1) crops reasonably at all sizes.
- Low-res I6 (650px) and I10 (375px) look soft on high-DPI screens.

## 7. Sticky / fixed elements
- Only the header. No floating WhatsApp bubble, no cookie banner, no fixed footer.

## 8. Mobile-specific content differences
- Site name text hidden in the header (brand name not visible until the hero eyebrow).
- No content is added/removed otherwise.

## 9. Footer behaviour
- Desktop: compact, 3 columns; ~390px tall. Mobile: stacked, ~600px tall. The last content section sits fully above the footer at all sizes (no overlap). On Contact/Home mobile, the map iframe region appeared blank in captures because it lazy-loads; a separate test confirmed it renders.

## 10. Limitations
- No real devices tested; no Safari/iOS-specific behaviour verified.
- Landscape orientations and widths between breakpoints (e.g. 1024, 1280) not captured.
- Hover states only tested on desktop.
- Animation timing (slider fade) can make individual frames in screenshots look empty.

## 11. Implications for Phase 2 (not prescriptions to copy)
- Keep a single consistent side gutter (e.g. 16–24px mobile) and one max content width.
- Body text ≥16px on mobile at regular weight.
- Provide portrait-safe crops (or `object-position`) for wide images.
- Show the brand name in the mobile header.
