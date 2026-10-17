# Phase 2 — Implementation Plan: The Spirit Sound Gallery

Source of truth: [`docs/source-audit/`](source-audit/README.md) (Phase 1, 2026-10-17). This plan was written before implementation and updated with the final decisions after the build (see the "As built" notes). QA results are in [phase-2-qa-report.md](phase-2-qa-report.md).

Workspace state at start: only `docs/source-audit/` existed. No project, no git repository, no font files, no backend. A fresh Next.js project was created at the workspace root.

---

## 1. Visual direction — "The Listening Room"

A contemporary instrument gallery, art-directed like an exhibition catalogue rather than a wellness template.

- **Ground and ink.** Warm paper (`#F5F1EB`) with a warm near-black ink. The UI stays almost monochrome so the amber, brass and prayer-flag colour in the photographs is the only real colour on the page.
- **Framed media, not full-bleed overlays.** Photographs and the hero video sit inside inset frames aligned to the content grid, like works hung on a wall, with small factual captions beneath (what is in the picture, taken from the media library's own alt text — no invented materials or provenance).
- **Exhibition labels.** Category names, captions and the address line use a quiet "wall label" treatment: Poppins at reading size, hairline rules in taupe. This replaces the original's uppercase eyebrows above every heading.
- **Asymmetric editorial grid.** A 12-column grid with deliberate offsets: text blocks start on column 2 or 7, images span uneven column ranges, wide panoramas are used wide (never forced into portrait cards). Each page uses different compositions; no repeated "image left / text right" stack.
- **One dark moment per page at most.** The home hero (the dark video) and the Our Journey quote band. Everything else is light.
- **Motion is slow and small**: content settles into place, images drift a few percent on scroll. Nothing loops, bounces or pins.

Things deliberately absent: star ratings, testimonials (unverified — audit T1), decorative numbering, mandalas/lotus motifs, icon rows, gradients, shadows on cards, eyebrow text on every heading.

## 2. Typography — exactly two families

| Role | Family | Weights loaded |
|---|---|---|
| H1–H4, the pull quote, large statements | **Playfair Display** | 400, 500 (+ 400 italic for the single pull quote — same family) |
| Body, navigation, buttons, forms, captions, footer, everything else | **Poppins** | 400, 500 |

Rationale: the original site's de-facto pair (audit 05 §1.3) — keeps brand recognition. Poppins is never used below 400 (the original's 100/300 weights were the legibility problem). Fonts are self-hosted through `next/font/google` (downloaded at build time, served from the site's own origin — no runtime request to Google). Times New Roman, Inter and Roboto are not used anywhere.

Type scale (CSS custom properties, fluid via `clamp()`):

| Token | Range | Use |
|---|---|---|
| `--fs-display` | 40 → 72px | H1 |
| `--fs-h2` | 30 → 48px | Section headings |
| `--fs-h3` | 22 → 30px | Category / sub headings |
| `--fs-h4` | 18 → 20px | Pillar headings, form heading |
| `--fs-lead` | 17 → 20px | Intro paragraphs |
| `--fs-body` | 16 → 17px | Body |
| `--fs-small` | 14 → 15px | Captions, labels, footer |

## 3. Colour palette and tokens

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F5F1EB` (verified brand cream) | Page background |
| `--paper-deep` | `#ECE6DC` | Alternate surface (form, band) |
| `--ink` | `#171512` | Headings, primary buttons, dark sections |
| `--ink-soft` | `#46413B` | Body text (9.0:1 on paper) |
| `--muted` | `#6B645C` | Captions, secondary text (5.2:1 on paper, 4.7:1 on paper-deep) |
| `--taupe` | `#B8B1A8` (verified brand taupe) | Hairlines, footer secondary text on dark |
| `--line` | `#DCD4C9` | Borders, form fields |
| `--error` | `#9B2C1F` | Form errors only |

The unused theme golds (`#C6A96B`, `#A68A64`) are **not** used — the photography already provides the warmth.

Other tokens: spacing scale `--space-1…9` (4px base, fluid at the large end), section rhythm `--section`, container `--container: 1320px`, gutter `clamp(16px, 4vw, 48px)`, radius `--radius: 2px` (frames are nearly square-cornered — a gallery, not an app), ease `--ease: cubic-bezier(.22,.61,.36,1)`, durations 0.2s (UI) / 0.9–1.2s (reveals).

## 4. Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/product/` | Collection (nav label "Collection"; URL kept as audited) |
| `/our-journey/` | Our Journey |
| `/contact-us/` | Contact |
| `/hello-world/`, `/category/blog/` (+ children) | **308 permanent redirect → `/`** via `next.config.mjs` (legacy WP sample content, audit S4) |
| anything else | Branded 404 (`not-found.js`) — unknown routes are **not** redirected |

`trailingSlash: true` matches the audited WordPress URLs, so existing indexed URLs keep working.

## 5. Layouts and components

Shared: `SiteHeader` (sticky, brand mark + wordmark visible at every width, accessible mobile disclosure menu), `SiteFooter` (compact, dark), `Picture` (responsive `<img srcset>` from a generated manifest), `Button`/link styles, `ScrollMotion` (GSAP client island), `ContactForm` (client), `MapEmbed`.

| Page | Composition |
|---|---|
| Home | (1) Framed video hero with H1/intro/CTA set on the dark frame + address "wall label" beneath. (2) Story teaser: large serif statement + founder portrait offset on the grid, "Read our story". (3) Collection index: three categories as an editorial row of differently-proportioned images with labels, "View the collection". (4) "Experience the Sound in Presence": an asymmetric photo mosaic. (5) Visit + closing invitation merged: address, WhatsApp, email, two actions. |
| Collection | Short title block + wide gallery photograph; intro statement; three category "plates" each with its own composition (panorama-wide for singing bowls, paired images for genta, a small group for statues); a text-only note for gongs (mentioned in copy, no photos); enquiry close. |
| Our Journey | Title + intro; "Where It All Began" with portrait; "When Sound Became Something More" (merged with "Quiet Reflection", which overlaps it — audit 02 §3.3); full-bleed quote band; "Living With Sound" three pillars as a typographic row; "Space to Experience" with the shop photo at its native small size; contact link. |
| Contact | Title + one intro; channel list (WhatsApp, email, address, Instagram, Tripadvisor) beside the form; map + directions. The three repetitive intros are consolidated into one. |

## 6. GSAP / ScrollTrigger plan

- `@gsap/react` `useGSAP` with a scope ref → automatic `context.revert()` on unmount, so route changes never leave duplicate triggers.
- One `ScrollMotion` client component per page reads `data-motion` attributes inside its scope:
  - `reveal` — opacity 0→1, y 24→0, 0.9s, staggered children, `once: true`.
  - `parallax` — inner image `yPercent` −6→6, `scrub`, image pre-scaled 1.12 so no edges show.
  - `frame` — hero frame `clip-path: inset()` opening + headline lines rising (entrance only).
- `gsap.matchMedia()` with `(prefers-reduced-motion: no-preference)` — with reduced motion nothing is animated.
- Content is visible in the HTML; animations use `gsap.from`, so if JS fails nothing stays hidden.
- `ScrollTrigger.refresh()` after fonts load; matchMedia handles resize.
- Header: CSS-only hover/focus; a hairline appears after scrolling (tiny scroll listener, no GSAP needed).

## 7. Image and video optimisation

Originals in `docs/source-audit/assets/original/` are never modified. A reproducible script `scripts/optimize-media.mjs` writes delivery files to `public/media/`:

- Images → WebP (q≈78) at widths appropriate to their largest display size, never above the source width (no upscaling; the 650px and 375px photos are only ever displayed at or below their native size). A `media-manifest.json` records widths/heights for `srcset`, `width`/`height` attributes (no CLS).
- Logo marks → small transparent PNG/WebP (≤ 2× display size). Favicons/app icons generated from the icon mark (not the illegible text lockup).
- Open Graph images → 1200×630 JPEG per page from original photos.
- Video → `scripts/optimize-video.mjs` (ffmpeg): 1280×720 H.264 MP4, CRF ≈ 26, no audio track, `+faststart`; poster frame as WebP at 1600 and 800 wide.
- Delivery: video only on viewports ≥ 768px, no `prefers-reduced-motion`, no Save-Data; it is attached after hydration (`preload="none"` until then). Phones and reduced-motion users get the static poster.

`next.config.mjs` contains `images: { unoptimized: true }` so the Vercel Image Optimization quota is never used; responsive delivery is handled by the pre-generated files.

## 8. Functionality

- Navigation, sticky header with `scroll-margin-top` on anchors, mobile menu (button + `aria-expanded`, Esc closes, closes on route change, focus returns to toggle).
- WhatsApp `https://wa.me/628123944292`, `mailto:domagoes@gmail.com`, Instagram `spiritsoundubud`, Tripadvisor (verified manually during QA). **Facebook omitted** — no verified URL exists (audit C5).
- Collection CTAs go to `/product/` or `#collection`; WhatsApp only on explicit WhatsApp actions (fixes audit C4).
- Contact form (**frontend only** — this project has no backend): name (first/last), email, message; client-side validation, honeypot, loading/success/error states. It POSTs JSON to `NEXT_PUBLIC_CONTACT_ENDPOINT` (a hosted form service chosen by the owner) and shows success **only** on a 2xx response. With no endpoint configured, the form says the message was **not** sent and offers WhatsApp and a pre-filled email (mailto) with the visitor's text.
- Map: Google Maps embed (audited URL), native lazy loading, fixed aspect ratio, "Get directions" link to the audited short link.
- Analytics: `GT-NSL7XN7P` is **not** loaded by default (owner decision pending, audit 06). Setting `NEXT_PUBLIC_GA_ID` enables a single gtag snippet.
- SEO: per-page titles/descriptions verbatim from the audit; canonical URLs on `https://spiritsoundbali.com`; OG images; `robots.txt`; `sitemap.xml` (4 pages); `Store` JSON-LD with verified address, geo, phone, email, sameAs.

## 9. Unresolved questions and limitations (carried from audit 08)

- Category naming (Home "Accessories" vs Product "Statue"): **resolved for the build** by using "Statues" everywhere, because the only photographs are of statues; no accessories are shown. Owner to confirm.
- Gongs: mentioned in copy, no images → a text-only mention with an enquiry link; no gong imagery.
- "Ganesha and Others Statue" heading kept verbatim on the Collection page (grammar flagged, not silently rewritten).
- Testimonials and ★★★★★: omitted (unverified).
- Opening hours, prices, founder name, shipping: absent — not invented.
- Phone display format: uses `+62 812 394 4292` (the footer format) consistently; link is E.164.
- Form delivery: needs a hosted form endpoint (owner account) and the owner's confirmed recipient address.
- Analytics on/off: owner decision.
- Hostinger bot-check interstitial and the live staging domain are hosting/DNS issues — **not** fixed by this frontend.
- Higher-resolution originals for the 650px and 375px photos and an SVG logo would improve quality.

---

## 10. As built (2026-10-17)

The plan above was implemented as written, with these confirmed details and deviations:

- **Frontend only.** At the owner's instruction during the build, no backend/API route was created. The contact form posts directly from the browser to a hosted form endpoint set in `NEXT_PUBLIC_CONTACT_ENDPOINT` (any service that accepts a JSON POST with CORS and answers 2xx, e.g. Formspree). Not configured by default.
- **Stack:** Next.js 16.4.2 (App Router, Turbopack), React 19.3.1, GSAP 3.15.0 + `@gsap/react` 2.1.2, CSS Modules + one global token sheet, JavaScript only. `sharp` is a dev dependency used by the media script only. No other packages.
- **All four routes and the 404 are statically prerendered** (`○ Static` in the build output).
- **Header:** sticky, 72px (64px on phones); a hairline appears after scrolling. Below 900px the nav collapses to a "Menu" disclosure; at ≤380px the word "Menu" is visually hidden but kept for screen readers.
- **Hero video control:** a visible "Pause video / Play video" button was added (WCAG 2.2.2, moving content over 5 s).
- **Tripadvisor:** the URL is kept because the owner placed it on the live site, but it could not be verified automatically (HTTP 403 to headless Chrome, and no search-engine match). It needs a manual check in a normal browser before launch.
- **ScrollTrigger start positions use `clamp()`** so content near the very bottom of a page always reveals, even on tall screens where the normal start line can't be reached.

### File map

| Path | Purpose |
|---|---|
| `src/app/layout.js`, `globals.css` | Fonts, tokens, header/footer, JSON-LD, optional GA |
| `src/app/page.js` (+ `page.module.css`) | Home |
| `src/app/product/`, `our-journey/`, `contact-us/` | The other three routes |
| `src/app/not-found.js`, `robots.js`, `sitemap.js`, `icon.png`, `apple-icon.png` | Utility routes |
| `src/components/` | `SiteHeader`, `SiteFooter`, `HeroVideo`, `ScrollMotion`, `Picture`, `ContactForm`, `MapEmbed` |
| `src/content/site.js` | All verified facts and page copy (single source) |
| `src/content/media-manifest.json` | Generated image dimensions/widths |
| `src/lib/metadata.js` | Per-page metadata + `Store` JSON-LD |
| `scripts/optimize-media.mjs`, `scripts/optimize-video.mjs` | Reproducible asset pipeline |
| `public/media/` | Delivery assets only (originals untouched in `docs/source-audit/assets/original/`) |
| `.env.example` | `NEXT_PUBLIC_CONTACT_ENDPOINT`, `NEXT_PUBLIC_GA_ID` |

## 11. Revision 2 — layout pass after review (2026-10-17)

Feedback: the hero didn't fill the screen (it was an inset frame), there was too much white space, and images and text didn't line up well. Changes:

- **Hero is full-bleed.** It runs edge to edge at `100svh − header`, with its text aligned to the page container. The address line and the Pause button sit on one meta row at the bottom of the hero.
- **Tokens.** `--container` went from 1320 to **1560px**, `--gutter` to 16–56px and `--section` to 56–104px (was 72–136px). `--space-8` is now 40–64px.
- **Home:**
  - Collection is a three-up row of equal 4:5 cards (4:3 on phones), with a head row of title left and intro + link right.
  - "Experience the Sound in Presence" is a sticky text column beside a 2×2 grid of square photos. The 375px Ganesha photo moved to the Collection page so no tile is upscaled.
  - The visit block is split by a vertical hairline, with both columns top-aligned.
- **Collection:** a full-bleed opening photograph. The three plates use one 4:3 image size with text vertically centred beside it, alternating left / right / left. The statue thumbnails sit under the statue text. The gongs note is a hairline row on the same grid.
- **Our Journey:** "Where It All Began" now shares the title's left edge, and the portrait spans both rows. The quote aligns to the container. Space to Experience uses a square frame of at most 650px (the source width).
- **Contact:** the map starts on the same column as the form panel.
- **Frames:** every `.frame` image is now absolutely positioned to fill its aspect ratio, so landscape photos can't collapse square frames.
- **CSS Modules:** module selectors that reference global classes (`.frame`, `.lead`, `.actions`, `.wrap`) now use `:global()`. Before this they silently never matched.
- **Video:** a 1080p rendition (2.35 MB) is served at ≥1400px, because the full-bleed hero reaches ~1920px wide. The 720p rendition stays for 768–1399px; phones still get the poster only.

## 12. Revision 3 — edge-to-edge pass after second review (2026-10-17)

Feedback:
- The story section was too simple and left a lot of empty space.
- The Collection page needed a complete redesign with no empty space and no alignment issues.
- There were left/right gaps on every page.
- The hero "became full when the cursor moves".

Changes:

- **No page-width cap.** `--container: 100%`, so every page runs edge to edge with only the gutter (16–56px) beside text.
- **Hero motion removed.** The GSAP `frame` clip-path entrance (inset → full) caused the "fills up on mouse move" effect and has been deleted from `ScrollMotion`. The hero is full-cover from the first frame; only the text fades in.
- **One alignment token.** `--col-gap` drives the grid gap, and `--split-inset` is the padding that puts text inside a 50/50 split panel on grid column 8 (or column 1 when flipped). Right-column text in normal sections uses `grid-column: 8 / 13`, so all right-hand text starts on one vertical line site-wide.
- **Home:**
  - The story is a full-height 50/50 split, with the portrait to the left screen edge and the text panel holding the copy, two actions and a two-photo strip.
  - The gallery is a heading row plus a full-bleed four-photo strip with no gaps (2×2 on phones).
  - The visit block aligns to column 8.
- **Collection (rebuilt):** a full-bleed photo opening with the title over it, a compact intro band, and three edge-to-edge 50/50 category panels. The panels touch, alternate sides and backgrounds, and the statue panel carries two detail thumbnails. A closing band pairs gongs with the visit invitation.
- **Our Journey:** the opening is a full-height split with the portrait to the right edge. Space to Experience pairs two photos (the visitors photo stays ≤ 650px).
- **Contact:** channels | form panel, and visit text | map, are both 50/50 splits. The form panel and the map each run to the right screen edge.

## 13. Revision 4 — hero clean-up (2026-10-17)

- Removed the hero's bottom row (the name + address line and the visible "Pause video" button), at the reviewer's request.
- Hero text is now vertically centred on desktop and tablet. Its left edge sits on the page gutter, the same line as the header logo. On phones it stays bottom-aligned over the darker part of the scrim.
- The pause control is still in the DOM (WCAG 2.2.2) but is invisible until reached with the keyboard (`:focus-visible`). Mouse users can't pause the video. Visitors with reduced motion, Save-Data or phone-width screens never get the video. This is a deliberate trade-off, recorded here for the owner.

## 14. Revision 5 — proportional scaling + "last screen fits" (2026-10-17)

Feedback (screenshots taken on a very wide / zoomed-out browser): there was large white space in the story panel, Collection, Our Journey and the Home closing section, and the final section was cut off above the footer.

- **All sizes are rem.** 69 pixel lengths in the stylesheets were converted. Hairlines, outline offsets and media-query breakpoints stay in px.
- **Proportional scaling above 1600px:** `html { font-size: max(16px, min(1vw, 1.7778vh)) }`. On large or zoomed-out screens the whole composition (type, spacing, max-widths) scales up in proportion, by whichever is smaller relative to 1600×900: the screen's width or its height. Between 320 and 1599px nothing changes. Trade-off: zooming the browser out above 1600px no longer makes the page look smaller; the layout re-fills the screen instead.
- **Final section + footer fit in one screen** (below the sticky header) on every page at 1862×900, 1613×812, 1440×900, 1366×768 and 1024×768. A measurement script (`fit.js`) passes 20/20.
  - Footer: 262px → 186px. The page links sit in a 2×2 block, with tighter rows.
  - Home closing: the visit paragraph was dropped from the aside (it's on Contact), address and contact sit side by side, the heading is two lines, and padding is `--space-8`.
  - Our Journey: "Quiet Reflection" moved into the "When Sound Became Something More" section as its right-hand column (the audit recommended merging them; this also fills that section's empty column). "Space to Experience" uses square photo frames and compact padding.
  - Contact: the map row's minimum height went from 520px to 22rem; the map now matches the text column.
- **Home story panel:** the text and the two-photo strip now fill the panel's width instead of stopping short of the right edge.

## 15. Revision 6 — final section + footer fill exactly one screen (2026-10-17)

Requested: every page should end like Our Journey did. Scrolled to the bottom, the final section should start right under the header and the footer should end at the bottom of the screen, with no partial section and no empty band.

- `FooterSize` (a tiny client component inside the footer) uses a ResizeObserver to publish the footer's live height as `--footer-h`.
- `.fit-last` gives the final section `min-height: calc(100svh − header − footer)`. `.fit-last--center` centres its content vertically. It's applied to Home "Discover the Sound…", Collection gongs/visit band, Our Journey "Space to Experience" and the Contact visit/map split.
- The section is deliberately ~1px taller than the space (the header hairline isn't subtracted), so its top edge tucks under the header and no sliver of the previous section can show.
- Where the final section's content is taller than the space (phones, and Our Journey/Contact in tablet portrait), the page just scrolls normally. No content is cut or shrunk.

## 16. Revision 7 — Collection opening redesigned (2026-10-17)

Feedback: the full-bleed photo with overlaid title felt too simple and left empty space.

- The opening is now a full-height split. On the left (5/12) is a dark panel with the title, intro and "Explore Collection" button at the top, and a **category index** at the bottom: three jump links, each with a thumbnail, the category label and the item heading verbatim, going to `#singing-bowls`, `#genta` and `#statues`. On the right (7/12) the bowls photograph runs to the screen edge. On phones the photo stacks above the panel.
- On desktop the panel's spacing, title size and thumbnail size follow the screen height (`vh` clamps), so the whole opening fits one screen. It was measured to fit exactly at 1862×906, 1613×812, 1440×900, 1366×768, 1280×720 and 1024×768. The section uses `min-height`, never a fixed height, so content can't spill over on unusual screens. At 900–1199px the panel takes half the width so the intro wraps less.

## 17. Revision 8 — reveal bug + Our Journey "More" section (2026-10-17)

- **Bug fixed: content on the first screen stayed hidden until the page was scrolled or the mouse wheel moved.** One example was the Collection category index. ScrollTrigger doesn't fire for a trigger whose start resolves to scroll position 0 until the first scroll event. `ScrollMotion` now checks each `reveal`/`stagger` element when it sets up: anything already on screen animates straight away, and only below-the-fold content waits for a ScrollTrigger (`start: "top bottom"`). Verified by loading every page at 1862×906, 1366×768 and 390×844 with no scroll or mouse input: everything in the first viewport ends fully visible.
- **"When Sound Became Something More" + "Quiet Reflection" redesigned** as a full-bleed 50/50 split, on the same pattern as the Collection panels. The bowls-and-bells photograph (`bowls-display-table`, 1600px source) fills the left half to the screen edge. The right panel holds the heading, the serif paragraph and, under a hairline, Quiet Reflection, with text on grid column 8. The two empty columns are gone.

## 18. Revision 9 — page links always open at the top (2026-10-17)

- Bug: after clicking a header, footer or logo link from part-way down a page, the new page opened at the old scroll position (e.g. 2,940px down). Clicking the current page's link did nothing.
- `ScrollToTop` (mounted in the root layout) jumps to the top on every route change (`useLayoutEffect`, repeated after the next paint so a late scroll restore can't win). A capture-phase click listener smooth-scrolls to the top when a link points at the page you're already on. URLs with a `#hash` are left alone, so section links still land on their section. `<html data-scroll-behavior="smooth">` tells Next.js to suspend CSS smooth scrolling during route changes.
- Verified from the bottom of each page: header ×4, footer, logo and the same-page link all land at `scrollY = 0`. `/product/#statues` from the Home cards and `#genta` from the Collection index land on their sections just below the header. Regression: 29/29 functional and 12/12 no-scroll visibility checks.

## 19. Revision 10 — bigger header, tighter section rhythm (2026-10-17)

- **Header:**
  - Height: 72 → 96px on desktop (`--header-h: 6rem`) and 64 → 76px on phones.
  - Logo mark: 40 → 56px. Wordmark: 19 → 26px. Nav links: 15 → 17px with wider spacing. WhatsApp button: 50px tall.
  - The full nav now shows from 1100px; below that the Menu button is used, because the larger brand and links no longer fit at 900–1099px.
  - On phones the menu button is icon-only (the "Menu" text stays for screen readers) so the larger wordmark never collides with it.
- **Section spacing:** `--space-9` (section padding) clamp(56–104px) → clamp(40–72px), and `--space-8` clamp(40–64px) → clamp(32–48px). Gaps between sections drop by about 30% on every page.
- Collection opening: its height-driven spacing was tightened slightly so it still fits one screen under the taller header (verified at 1862×906, 1613×812, 1440×900, 1366×768, 1280×720 and 1024×768).
- Regression:
  - 29/29 functional checks.
  - 22/28 exact last-screen fits (the same set as before).
  - 12/12 no-scroll visibility checks.
  - 7/7 page links open at the top, and section links land just below the taller header.
  - 32 page/width layout checks with 0 issues.

## 20. Revision 11 — quote band removed (2026-10-17)

- The full-bleed "Silence is not empty. It is where everything begins." band was removed from Our Journey at the reviewer's request. Its markup, its CSS and the `journey.quote` content entry are deleted. The page now runs: opening split → "When Sound Became Something More / Quiet Reflection" split → Living With Sound → Space to Experience.
- Regression: 29/29 functional checks, 12/12 no-scroll visibility checks, 32 page/width layout checks with 0 issues, and Our Journey's final section + footer still fill exactly one screen at all 5 desktop sizes.

## 21. Deployment (2026-10-17) — approved by the owner

- **GitHub:** https://github.com/harini305/spirit-sound (branch `main`). Excluded from the repo (kept on local disk): the 53 MB 4K master video and the QA/audit screenshot folders. `.env*` files are never committed.
- **Vercel:** project `harini-658e/spirit-sound`, Next.js preset, connected to the GitHub repo, so pushes to `main` deploy to production. Public production URL: **https://spirit-sound.vercel.app**. Per-deployment URLs keep Vercel's default Standard Protection (login required). Only the production domain is public.
- **Upload contents:** `.vercelignore` leaves out `docs/`, `scripts/`, the README and `.env.example`. Everything served comes from `public/media` (35 files, 5.6 MB, all referenced by the site: WebP photos at display sizes, two compressed hero video renditions, 3 posters, 2 logo marks, 4 OG images) plus the Next.js build.
- **Not configured** (owner action): `NEXT_PUBLIC_CONTACT_ENDPOINT` (the form says it can't send yet and offers email/WhatsApp), `NEXT_PUBLIC_GA_ID` (analytics off), the custom domain `spiritsoundbali.com` (DNS unchanged; canonical URLs already point to it).
