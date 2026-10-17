# 09 — Phase 2 Recommendations & Mandatory Requirements

> Phase 2 must not start until the owner/user explicitly approves. Nothing in this file has been implemented.

## 1. Stack (as specified)
Next.js (App Router) · JavaScript (not TypeScript) · React · GSAP + ScrollTrigger · responsive CSS. Workspace `d:\spiritsoundbali8` is currently **empty except for this audit** — Phase 2 starts from a fresh Next.js project.

## 2. Proposed sitemap (recommendation)

| Route | Content source | Notes |
|---|---|---|
| `/` | 03 §D | Hero → story teaser → 3 categories → (testimonials only if confirmed) → visit/contact + map → footer |
| `/product/` | 03 §E | Keep URL (existing indexed URL). Nav label could stay "Product" or become "Collection" — if the URL changes, add a 301 from `/product/` |
| `/our-journey/` | 03 §F | Condensed to ~4 beats |
| `/contact-us/` | 03 §G | Channels + form + map once |
| `not-found` | 03 §J | Branded 404 |
| Legacy `/hello-world/`, `/category/blog/` | — | Not built; 301 → `/` via `next.config` redirects (merge with existing config) |
| Blog | — | **No real posts exist.** Do not build a blog unless requested. If later requested: simple listing, ≤10 images on its initial presentation, no invented posts |

## 3. Content approach
- Use [content.json](content.json) as the single content source; keep facts verbatim.
- Shorten and consolidate repeated prose (see 03 §L) without changing meaning; no new marketing claims.
- Do not publish: testimonials, ★★★★★ rating, opening hours, prices, founder name, gong/accessory categories — **until the owner confirms** (08 §3–5).
- Use one phone display format consistently once confirmed (E.164 `+628123944292` for links).
- Fix only objective link bugs (Facebook icon, closing CTA destination) after confirmation; flag wording issues rather than rewriting them silently.

## 4. Assets
- Originals are in [assets/original/](assets/original/) — copy (don't move) into `public/` during implementation, renamed to meaningful kebab-case names (e.g. `founder-portrait.avif`, `singing-bowls-table.jpg`).
- **Video:** transcode the 53 MB 4K MP4 to ≈1280–1920px H.264 MP4 + WebM (target 2–6 MB), extract a poster JPG/AVIF; `preload="none"`/`metadata`; disable autoplay for `prefers-reduced-motion`; consider poster-only on small screens.
- **Images:** resize locally to sensible widths (e.g. 640/1024/1600) and compress to AVIF/WebP with JPEG fallback where needed; lazy-load below the fold; explicit width/height or aspect-ratio to avoid CLS; portrait-safe `object-position` for wide panoramas.
- **Logo:** use the transparent icon marks (L1/L2); request SVG. Generate favicon/app icons from `cropped-Logo-Spirit-Sound-Black.png` (icon mark), not the text lockup.
- Never substitute stock or AI imagery while originals exist.

## 5. Image configuration (mandatory)
Avoid consuming the Vercel Image Optimization quota:
```js
// next.config.mjs — MERGE into the existing config; do not replace other settings
images: { unoptimized: true }
```
Responsive delivery must then be handled manually: pre-generated sizes + `srcSet`/`sizes` (or `<picture>`), modern formats, lazy loading, correct dimensions. Configuration is **not** changed during this audit.

## 6. Functionality to rebuild
| Feature | Recommendation |
|---|---|
| Navigation | Semantic `<nav>`, accessible mobile menu (button with `aria-expanded`, focus management, Esc to close), brand name visible on mobile |
| WhatsApp | Prominent primary action (header + contact). Same wa.me URL |
| Contact form | Replace WPForms: Next.js Route Handler + transactional email provider, or a hosted form endpoint; fields Name (first/last), Email (required), Message; honeypot; server-side validation; success/error states. **Recipient address must be confirmed by owner.** Do not claim it works until a real test submission is confirmed |
| Map | Lazy/click-to-load Google Maps embed + "Get directions" link to `maps.app.goo.gl/cFXxxBPLoBPrcavt9` |
| Gallery | Simple responsive grid; optional accessible lightbox |
| Testimonials | Only if confirmed; static or accessible carousel with pause control |
| Analytics | Owner decision on `GT-NSL7XN7P` |
| SEO | Per-page metadata from 03 (titles/descriptions verbatim unless owner changes), og:image per page from original photos, canonical to primary domain, `LocalBusiness` JSON-LD with verified address/geo/phone/sameAs, sitemap.xml + robots.txt |

## 7. Motion (GSAP / ScrollTrigger)
Original site has almost no motion. Use GSAP sparingly and purposefully (e.g. gentle reveal of section content, subtle image scale on scroll in hero). Respect `prefers-reduced-motion`. No scroll-jacking, no pinned sequences that lengthen pages.

---

## 8. MANDATORY DESIGN REQUIREMENTS FOR PHASE 2

### Typography
- **Exactly TWO font families across the entire website** — one for headings, one for body text, navigation, buttons, forms, cards, footer and all other UI.
- Both readable, professional, not overly fancy. Final pair selected in Phase 2 (informed by [05 §1.3](05-brand-reference.md): original de-facto pair is Playfair Display + Poppins).
- No third family for decorative headings, quotes, special sections, the footer or individual components.
- Consistent heading/body sizes across equivalent components; one controlled, responsive type scale (e.g. `clamp()`-based).
- Hierarchy via size, weight, line-height, letter-spacing only.

### Visual design
- Professional, human-designed appearance; intentional image/text alignment.
- Consistent content widths, margins and spacing (single container system and gutter).
- **No** unnecessary decorative numbering, eyebrow text, random symbols, floating badges or ornamental elements.
- Avoid repetitive AI-looking layouts and generic template patterns.
- Visual effects only where they serve a clear purpose.
- Preserve recognisable brand identity: icon mark, monochrome base with warm neutrals, warm original photography, calm spacious tone.

### Content
- Concise, focused pages; no repeated paragraphs, unnecessary sections or excessive length.
- Preserve meaningful facts and essential information.
- Do not invent claims, testimonials, FAQs, prices, opening hours or blog posts.

### Footer
- Compact and content-driven; only necessary, verified information (brand line, nav, address, WhatsApp, email, verified socials, copyright).
- No excessive padding, unnecessary columns, duplicated content or oversized layout.
- Final content section fully visible above the footer; natural transition; no overlap, clipping, excess blank space or fixed-footer interference.

### Images & performance
- Prefer original assets; resize and compress locally; avoid duplicate copies and large downloads.
- `images: { unoptimized: true }` merged into existing Next.js config.
- Sensible dimensions, modern formats, lazy-load below the fold, responsive sizing.

### Process
- No GitHub push or Vercel deploy unless explicitly requested.
- Do not delete/overwrite the audit or original assets in `docs/source-audit/`.
