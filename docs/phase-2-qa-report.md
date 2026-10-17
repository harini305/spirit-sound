# Phase 2 — QA Report: The Spirit Sound Gallery

**Date:** 2026-10-17 · **Build:** Next.js 16.4.2 production build (`next build` + `next start`), served locally at `http://localhost:3008/`
**Method:** automated browser testing in headless Chrome 155 (puppeteer-core, installed in a temporary scratch folder, not in the project), plus visual review of every screenshot. Evidence is in [phase-2-qa-screenshots/](phase-2-qa-screenshots/).
Plan and design decisions are in [phase-2-implementation-plan.md](phase-2-implementation-plan.md).

Nothing was pushed, deployed or published. There is no git repository in the workspace.

> **Revision 2 (layout pass after review).** The hero is now full-bleed and fills the screen below the header. The content container widened from 1320px to 1560px and section spacing tightened. The Home collection, gallery and visit blocks, the Collection plates, the Our Journey opening and the Contact map were re-aligned to one grid. A 1080p hero rendition was added for wide screens. A CSS Modules bug was fixed: selectors such as `.details .frame` silently never matched global classes, so they now use `:global()`. All figures below are from the **re-tested** build.
>
> **Revision 3 (edge-to-edge pass after second review).** The page-width cap was removed (`--container: 100%`), so content runs edge to edge with only a 16–56px gutter. The hero clip-path entrance animation was removed: it made the hero look inset until it expanded, and the hero is now full-cover from the first frame. Redesigned: the Home story (a full-height 50/50 split with the portrait to the screen edge, plus a two-photo strip) and the Home gallery (heading row plus a full-bleed four-photo strip with no gaps). The **Collection page was rebuilt**: a full-bleed photo opening with the title over it, a compact intro band, three edge-to-edge 50/50 category panels that touch with no gaps and alternate sides, and a closing band (gongs + visit). Our Journey and Contact use the same 50/50 split rows. Every right-column text block, including inside the split panels, now starts on grid column 8 via one token (`--split-inset`). The tables below are from the revision-3 build.
>
> **Revision 4.** The hero's bottom row (address line + visible Pause button) was removed and the hero text vertically centred. The pause control now appears only on keyboard focus (verified: hidden by default, opacity 1 on focus, Enter pauses the video). Re-test: 29/29 functional checks pass; 28 page/width combinations with 0 overflow, 0 footer gaps, 0 hidden content and 0 console errors.
>
> **Revision 5.** All CSS lengths are now rem, and the root size scales above 1600px (by the smaller of width/1600 and height/900), so wide or zoomed-out screens keep the composition instead of opening up white space. The footer went from 262px to 186px, and the final sections were compacted. Re-test on the production build:
> - 29/29 functional checks pass, and all form flows pass.
> - **Final section + footer fit one screen on 20/20 page×size combinations** (1862×900, 1613×812, 1440×900, 1366×768, 1024×768).
> - 32 page/width combinations (now including 3724×1800, a 50%-zoomed 1862×900 window) show 0 overflow, 0 footer gaps, 0 hidden content and 0 console errors. Smallest text is 14px; there are no undersized touch targets.
>
> **Revision 6.** Final section + footer now fill **exactly** one screen. Measured scrolled-to-bottom, the final section starts ≤1.5px under the header and the footer ends at the viewport bottom on **22/28** page×size combinations: all four pages at 1862×906, 1613×812, 1440×900, 1366×768 and 1024×768, plus Home and Collection at 768×1024. The other six (phones at 390×844; Our Journey and Contact at 768×1024) have more final-section content than the space beside the footer, so they scroll normally (nothing is cut). Regression: 29/29 functional checks and 32 page/width layout checks pass. End-of-page captures: `*-end.jpg` in the screenshots folder.
>
> **Revision 7.** The Collection opening was redesigned: a dark panel with the title, intro, button and a three-item category index with thumbnails, beside a full-height photograph. The opening fits one screen exactly at 1862×906, 1613×812, 1440×900, 1366×768, 1280×720 and 1024×768. Regression: 29/29 functional checks; 22/28 exact last-screen fits (unchanged); 32 page/width layout checks with 0 issues.
>
> **Revision 8.** Fixed: content in the first viewport (for example the Collection category index) stayed invisible until the page was scrolled. Elements already on screen now animate immediately. New check: load each page at 1862×906, 1366×768 and 390×844 with **no scroll or mouse input**; 12/12 pass with everything on screen visible. The Our Journey "More/Reflection" section is now a photo + text split. Regression: 29/29 functional, 22/28 exact last-screen fits (unchanged), 32 page/width layout checks with 0 issues.
>
> **Revision 9.** Page links now always open the destination at its top: 7/7 navigation cases (header, footer, logo, same-page) end at `scrollY = 0`. Section links (`/product/#statues`, `#genta`) still land on their section. Regression: 29/29 functional checks pass.
>
> **Revision 10.** The header is larger (96px desktop / 76px phones) and section spacing is about 30% tighter. All suites were re-run on the production build: 29/29 functional, 22/28 exact last-screen fits, 12/12 no-scroll visibility, 7/7 links-open-at-top, Collection opening fits at 6/6 desktop sizes, and 32 page/width layout checks with 0 issues.
>
> **Revision 11.** The Our Journey quote band was removed. Re-test: 29/29 functional, 12/12 no-scroll visibility, 32 page/width layout checks with 0 issues; Our Journey last-screen fit is exact at 5/5 desktop sizes.

---

## 1. Build

| Check | Result |
|---|---|
| `npm install` | 0 vulnerabilities (sharp pinned to ^0.35.5 after `npm audit` flagged 0.34.x) |
| `next build` | ✅ Compiled successfully. 10 static outputs: `/`, `/product`, `/our-journey`, `/contact-us`, `/_not-found`, `/robots.txt`, `/sitemap.xml`, `/icon.png`, `/apple-icon.png` — all `○ Static` |
| Runtime console errors | 0 on every page at every width tested (28 page/width combinations) |
| Dependencies | `next`, `react`, `react-dom`, `gsap`, `@gsap/react`; dev: `sharp` (media script only) |

## 2. Pages and viewports tested

Pages: `/`, `/product/`, `/our-journey/`, `/contact-us/`, plus the 404 page and the legacy redirects.
Viewports: **1862×910** and **1613×812** (the reviewer's screens), **1440×900**, **1024×768**, **768×1024** (touch), **390×844** (mobile emulation), **320×640** (narrow mobile).

### Layout metrics (production build)

| Page | Width | Page height | Horizontal overflow | Gap last section → footer | Footer height | Smallest text |
|---|---|---|---|---|---|---|
| Home | 1862 / 1613 / 1440 / 1024 / 768 / 390 / 320 | 4824 / 4541 / 4433 / 3960 / 6207 / 5687 / 5497 | 0 at all | 0 (touching, no overlap) | 262 / 262 / 262 / 247 / 310 / 430 / 451 | 14px |
| Collection | same widths | 3962 / 3794 / 3712 / 3205 / 5005 / 4221 / 4221 | 0 | 0 | same | 14px |
| Our Journey | same widths | 3419 / 3459 / 3375 / 3500 / 3880 / 4053 / 4311 | 0 | 0 | same | 14px |
| Contact | same widths | 1990 / 1990 / 1989 / 1896 / 3121 / 3202 / 3268 | 0 | 0 | same | 14px |

For comparison, the original pages were 5609 / 2621 / 4311 / 3784px tall on desktop and up to 6704px on mobile (audit 07). The original footer was ~600px tall on mobile; the new one is 430px.

- Body text is 16–17px (`--fs-body`), leads 17–20px. The smallest text anywhere is 14px (captions, copyright).
- No touch target smaller than 24×24px. Primary buttons are ≥ 48px tall; text links ≥ 44px.
- The "wide IMG" elements flagged by the overflow scan are parallax images scaled 1.12 inside `overflow: hidden` frames. They are clipped and never cause scroll; measured page overflow was 0 everywhere.

## 3. Checklist

### Routes and content
- [x] Home, Collection (`/product/`), Our Journey and Contact Us return 200 and each has exactly one `<h1>`.
- [x] Direct URL access and browser refresh work (all pages are static HTML).
- [x] Header navigation works client-side; `aria-current="page"` follows the route (tested Collection → Our Journey → Contact → Home).
- [x] Every "Explore the Collection" / "View All Products" link goes to `/product/`. The hero CTA on Collection goes to `#collection`, and the Home category tiles go to `/product/#singing-bowls`, `#genta` and `#statues`. **No collection link opens WhatsApp** (audit C4 fixed).
- [x] WhatsApp links point only to `https://wa.me/628123944292` and are labelled "WhatsApp". The link resolves to `api.whatsapp.com/send/?phone=628123944292`.
- [x] **No Facebook link exists anywhere** (no verified URL; audit C5).
- [x] No ★ characters, testimonials or ratings in the DOM.
- [x] No prices (scanned for Rp/IDR/$/USD + digits): none.
- [x] No opening hours (scanned for "opening hours", "open daily", time patterns): none. No founder name, founding date or services were added.
- [x] `/hello-world/`, `/category/blog/` and `/category/blog/page/2/` → **308 → `/`**.
- [x] Unknown route `/no-such-page/` → **404** with the branded page (not redirected).

### Typography and design
- [x] Computed `font-family` of every rendered element on all four pages is only **Poppins** or **Playfair Display**. The single "Arial" found in an early run (the honeypot input) was fixed with `font: inherit` on form controls and re-verified.
- [x] Only 4 self-hosted font files load (`/_next/static/media/*.woff2`: Playfair 400/500 + italic, Poppins 400/500). There are no requests to Google Fonts from the site itself. The only `fonts.gstatic.com` requests come from inside the Google Maps iframe on Contact (Google's own UI font, not part of the site).
- [x] Equivalent headings share one token scale. H1–H4 are Playfair 400/500; everything else is Poppins 400/500 (no 100/300 weights).
- [x] No decorative numbering, eyebrows on every heading, star rows, icons or ornaments. The only small labels are the factual category names from the Product page ("Singing Bowl", "Genta", "Statue").
- [x] The layouts differ per section and per page. The visual review is in the screenshots.

### Functionality
- [x] Desktop nav, sticky header, and the hairline that appears after scrolling.
- [x] Mobile menu: opens (`aria-expanded="true"`, focus moves to the first link), closes on **Esc** with focus returned to the toggle, and closes on route change. The brand name stays visible at 390px and 320px.
- [x] Anchor `#collection` lands 96px from the top with a 73px header, so the header doesn't hide it (`scroll-margin-top`).
- [x] Focus: 2px `:focus-visible` outlines defined globally; keyboard focus order verified in the form and the mobile menu. Hover states (nav underline, image zoom, link rule, button inversion) are implemented in CSS but were **not** exercised by the automated tests.
- [x] Google Map iframe loads and shows the pin "The Spirit Sound Gallery Bali" at Jl. Hanoman No.65 ([screenshot](phase-2-qa-screenshots/contact-us-1440-map-loaded.jpg)). It loads lazily, no overflow at 320px (4:3 on phones).
- [x] Email links (`mailto:domagoes@gmail.com`) are present. The WhatsApp destination was verified (HTTP 200).
- [x] Instagram `https://www.instagram.com/spiritsoundubud/` → 200, "The Spirit Sound Gallery Bali (@spiritsoundubud)".
- [ ] **Tripadvisor not verified.** It returns HTTP 403 to headless Chrome (anti-bot), and a web search found no listing. The link is kept because it was on the owner's live site. **A manual check in a normal browser is required.**
- [x] Form validation and submission states (see §5).
- [x] GSAP: reveals fire on scroll, and still fire correctly after 4 client-side route changes (no stale or duplicate triggers). Content near the page bottom reveals (`clamp()` start positions).
- [x] **Reduced motion:** no video element, no GSAP inline styles on any element, all content opacity 1.
- [x] **JavaScript disabled:** all content visible (0 hidden `data-motion` elements).

### Performance
- [x] The 53 MB original video is not referenced anywhere in the site. It stays untouched in `docs/source-audit/`.
- [x] Optimised videos and posters exist and play muted: 1920×1080 at ≥1400px (verified at 1440 and 1862), 1280×720 for 768–1399px.
- [x] Images are resized to their display sizes and served as WebP via `srcset`/`sizes`. Nothing is upscaled: the 650px and 375px photos are capped at their native width in CSS (`max-width: 650px` / `375px`).
- [x] `next.config.mjs` has `images: { unoptimized: true }`, so no Vercel Image Optimization is used.
- [x] CLS = 0 on all four pages (desktop and mobile). Every `<img>` carries `width`/`height`.
- [x] No duplicate assets: one file per width; no AVIF + WebP duplication.

## 4. Asset optimisation results (measured)

### Video (`scripts/optimize-video.mjs`, ffmpeg 6.1.1-essentials_build-www.gyan.dev via the ffmpeg-static npm binary, run from a scratch folder)

| File | Size | Notes |
|---|---|---|
| Original `Singing-Bowl.mp4` | **53,009,001 B (50.6 MiB)**, 3840×2160, 18.9 Mb/s, 22.5 s | Untouched |
| `public/media/video/singing-bowl-720.mp4` | **1,514,645 B (1.44 MiB)**, 1280×720, H.264 High, CRF 26, no audio, faststart | **−97.1 %**. A frame at 10 s was compared side by side with the original scaled to 1280: no visible difference at display size (the footage is dark, shallow-focus bokeh) |
| `public/media/video/singing-bowl-1080.mp4` (added in revision 2 for the full-bleed hero) | **2,465,584 B (2.35 MiB)**, 1920×1080, H.264 High, CRF 27, no audio, faststart | **−95.4 %**. Served only to viewports ≥ 1400px |
| `poster-1920.webp` / `poster-1600.webp` / `poster-800.webp` | 22.8 / 17.8 / 7.5 KB | Frame at 10 s. Shown on phones, with reduced motion and Save-Data, and before the video starts |

Delivery: a video is attached only when the viewport is ≥768px (720p up to 1399px, 1080p above), reduced motion is off and Save-Data is off. Phones never download it (verified: no `<video>` element at 390px).

### Images (`scripts/optimize-media.mjs`, sharp → WebP q78)

| Source (original) | Original | Delivered widths (WebP) | Largest delivered |
|---|---|---|---|
| about-us (founder) 1000×1088 AVIF | 72.9 KB | 480 / 800 / 1000 | 63.2 KB |
| whatsapp …m6LZ (bowls + flags) 1600×1066 JPG | 248.8 KB | 640 / 1024 / 1600 | 124.9 KB |
| whatsapp …-2 (display table) 1600×1066 JPG | 244.8 KB | 640 / 1024 / 1600 | 128.4 KB |
| singing (bowl + genta) 1600×767 JPG | 205.1 KB | 640 / 1024 / 1600 | 100.6 KB |
| ganesh (statues shelf) 1600×767 JPG | 241.2 KB | 640 / 1024 / 1600 | 134.0 KB |
| contact-me (visitors) **650×650** JPG | 106.1 KB | 400 / 650 (native max) | 61.0 KB |
| genta 768×600 AVIF | 24.3 KB | 480 / 768 | 22.4 KB |
| bowl2 (card) 768×920 AVIF | 46.7 KB | 480 / 768 | 44.7 KB |
| lakshmi 768×600 AVIF | 34.6 KB | 480 / 768 | 30.0 KB |
| ganesha **375×375** AVIF | 23.7 KB | 375 only (native) | 20.6 KB |
| Logo marks 1600² PNG (110 / 133 KB) | — | trimmed, 112px tall | **4.2 KB each** |
| OG images (4) | — | 1200×630 JPEG | 52–112 KB |
| App icons | — | `icon.png` 192², `apple-icon.png` 180² (icon mark on cream; replaces the illegible text-lockup favicon) | 6–6.5 KB |

Total `public/media/`: 5.6 MB on disk (all widths + video + OG). Originals: unchanged.

### Measured transfer per page (cache disabled, local server)

| Page | Desktop 1862 | Desktop 1440 | Mobile 390 |
|---|---|---|---|
| Home | 3,007 KB (1080p video 2,408 KB, images 271 KB, JS 188 KB, fonts 92 KB) | 3,003 KB (same 1080p video) | **402 KB** (no video) |
| Collection | 589 KB | 574 KB | 387 KB |
| Our Journey | 608 KB | 592 KB | 360 KB |
| Contact | 513 KB + Google Maps iframe (third party) | 498 KB + map | 306 KB + map |

LCP on a local server is 68–316 ms on every page and width; CLS is 0 everywhere. These are **localhost** figures. Real-network Lighthouse or field data has not been measured.

## 5. Contact form

The form is **frontend only**, as instructed: there is no backend in this project.

| Scenario | How tested | Result |
|---|---|---|
| Empty submit | Clicked Send | 4 inline errors; `aria-invalid` on each field; focus moves to First name ([screenshot](phase-2-qa-screenshots/form-errors-390.jpg)) |
| Invalid email + 2-character message | Typed values | Specific messages ("valid email address, like name@example.com", "at least 10 characters"); focus goes to Email |
| Errors clear on fix | Corrected fields | Errors removed live |
| **No endpoint configured (shipped state)** | Valid submit | "**Your message has not been sent.** Online sending is not available yet…", plus "Send by email" (a mailto pre-filled with the visitor's name, email and message) and "WhatsApp us". Never claims delivery ([screenshot](phase-2-qa-screenshots/form-unconfigured-390.jpg)) |
| Endpoint returns 500 | Test build with `NEXT_PUBLIC_CONTACT_ENDPOINT=https://form-endpoint.test/submit`; requests intercepted in the browser (nothing sent over the network) | "Sending…" disabled state, then "**Your message was not sent.**" with fallbacks. Values kept |
| Endpoint returns 200 | Same mocked build | "Thank you. Your message has been sent." shown **only** after the 2xx. Payload: `{"name","email","message","_subject"}` ([screenshot](phase-2-qa-screenshots/form-success-mocked-endpoint-390.jpg)) |
| Honeypot filled | Script filled the hidden field | No request sent |
| Keyboard | Tab from First name | First name → Last name → Email → Message → Send |

The shipped build was rebuilt **without** the endpoint after these tests.

## 6. Accessibility checks performed

- Semantic landmarks (`header`, `nav` ×2 with labels, `main#main`, `footer`), a skip link, one `h1` per page, and a logical heading order.
- All `<img>` have `alt`. Content photos have descriptive alt text. Decorative logo marks and the poster use `alt=""`, and the link carries the accessible name.
- External links announce "(opens in a new tab)" through visually hidden text.
- Colour contrast (computed WCAG ratios): ink on paper 16.2:1; body text 9.0:1 (8.1:1 on the deeper surface); muted captions 5.2:1 (4.7:1 on the deeper surface); footer text 10.3:1; copyright 8.6:1; error text 6.1:1. **Form field borders were 1.9:1 and failed WCAG 1.4.11.** They were changed to the muted tone (5.2:1) and re-verified.
- Hero video: muted, `aria-hidden`. The Pause/Play button (WCAG 2.2.2) appears only on keyboard focus (revision 4). Mouse users cannot pause it, a known trade-off made at the reviewer's request.
- Not done: manual screen-reader passes (NVDA/VoiceOver), and a full automated axe audit.

## 7. Known issues and limitations

1. **Tripadvisor link unverified** (403 to automation). Check it manually, or remove it from `src/content/site.js` (`business.tripadvisor`).
2. **Form delivery is not connected.** It needs an owner-controlled form endpoint and a confirmed recipient address (audit G10: the published address is a personal Gmail).
3. **Analytics are off.** `GT-NSL7XN7P` loads only if `NEXT_PUBLIC_GA_ID` is set (owner decision pending; consent banner not built).
4. **Low-resolution photos.** The 650px (visitors) and 375px (Ganesha) photos are shown at or below native size, so they are slightly soft on 2× screens. Higher-resolution originals would help (audit G9).
5. **No SVG logo.** The marks are trimmed 112px PNGs (crisp at 40px display on 2× screens).
6. **Content decisions taken for the build (owner to confirm):**
   - Home's third category is shown as "Statues", not "Accessories", because the only photograph is of statues (audit C1).
   - "Ganesha and Others Statue" is kept verbatim (C7).
   - Gongs appear as a text-only note with no image (C2).
   - The nav label "Product" was renamed to "Collection"; the URL `/product/` is kept.
7. **Not tested:** real devices, Safari/iOS, Firefox, landscape phones, real-network performance, and a real form submission to a live provider.
8. **Outside frontend scope (not fixed):** the Hostinger "Checking your browser" interstitial; the live staging domain `azure-bison-590473.hostingersite.com` (it should 301 or be de-indexed at the host); and DNS. The new site's canonicals, sitemap, robots and JSON-LD all use `https://spiritsoundbali.com`, and the staging host appears nowhere in the output.

## 8. Remaining setup (before any launch — none of this has been done)

1. **Contact form:** create a form at a hosted provider (e.g. Formspree) that delivers to the owner's confirmed inbox. Set `NEXT_PUBLIC_CONTACT_ENDPOINT=<form URL>` in the hosting environment and rebuild. Then send one real test message and confirm it arrives.
2. **Analytics (optional):** if the owner wants it, set `NEXT_PUBLIC_GA_ID=GT-NSL7XN7P` and decide on consent handling.
3. Manually verify the Tripadvisor URL.
4. Hosting/DNS (separate approval): point `spiritsoundbali.com` at the new build, redirect or de-index the staging domain, and disable the bot-check interstitial if it stays in front of the site.
5. Regenerate assets after replacing any originals: `npm run media:images` and `FFMPEG_PATH=<ffmpeg> npm run media:video`.

## 9. Local preview

```
npm install
npm run build
npm run start -- -p 3008      # http://localhost:3008/
```
