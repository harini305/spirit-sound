# 01 — Audit Report: spiritsoundbali.com

**Audit date:** 2026-10-17 · **Phase:** 1 (research only — no implementation)
**Site:** https://spiritsoundbali.com/ — *The Spirit Sound Gallery*, a singing-bowl and sacred-instrument gallery/shop at Jl. Hanoman No.65, Ubud, Bali.

## 1. Method
1. Workspace check: `d:\spiritsoundbali8` was **empty** (no project files, no prior evidence, not a git repo).
2. Route discovery: `robots.txt` → Yoast sitemap index (post/page/category), WordPress REST API (pages, posts, media — public), header/footer/internal links, probes of 12 common routes.
3. Content: full HTML of every route + REST `content.rendered`, parsed into ordered section/widget structure ([evidence/*.parsed.txt](evidence/)).
4. Design tokens: downloaded all Elementor CSS (kit, per-page, header, footer, atomic-widget CSS) and mapped every element's font/size/weight/colour per breakpoint ([evidence/css/](evidence/css/)).
5. Visual & behaviour: headless Chrome 155 via puppeteer-core (installed in a temporary scratch folder, **not** in the project): 19 full-page screenshots at 1440 / 768 / 390, plus interaction tests (mobile menu, slider autoplay, hover, lightbox, form validation, anchor, map).
6. Assets: downloaded all 10 photos, 7 logo files, 4 favicons and the hero video into [assets/original/](assets/original/) and measured actual dimensions.
7. External links status-checked (WhatsApp, Instagram, Tripadvisor, Maps, staging domain).

## 2. Coverage

| Category | Items |
|---|---|
| **Fully inspected** | `/`, `/product/`, `/our-journey/`, `/contact-us/` (desktop, tablet, mobile; content, CSS, assets, interactions) |
| **Inspected (desktop + mobile; legacy)** | `/hello-world/`, `/category/blog/`, 404 template, `/?s=` search results |
| **Partially inspected** | Contact form (validation tested, submission not sent); Tripadvisor link (403 to automated client) |
| **Discovered but inaccessible** | None among public routes. Admin-only content (drafts/private pages, form settings) not accessible |
| **Broken / non-existent** | `/blog/`, `/shop/`, `/cart/`, `/checkout/`, `/my-account/`, `/about/`, `/services/`, `/sample-page/`, `/category/uncategorized/` → 404 (expected — none are linked). **Broken link:** footer Facebook icon → Instagram URL |
| **Interactive states not verified** | Real form submission/delivery; lightbox keyboard navigation; sticky-header visual state while scrolling (config verified); Safari/iOS behaviour; hover on touch devices |
| **Technical limitations** | Hostinger bot-check interstitial on first visit (worked around by waiting); headless Chrome only; no admin access |

## 3. Site overview
- **4 real pages** (Home, Product, Our Journey, Contact Us) built with WordPress 7 + Elementor 4 + PRO Elements + ElementsKit + WPForms on Hostinger, last edited 2026-06-24.
- **No e-commerce, booking, accounts, prices, events, or blog content.** The only post is WordPress's default "Hello world!" with spam comments.
- Business model visible on site: physical gallery/shop in Ubud; visitors try instruments in person; enquiries via WhatsApp (primary), email, contact form.
- Offerings shown: Singing bowls, Genta (Tibetan ritual bells), Statues (Ganesha and others) — Home labels the third category "Accessories".

## 4. Key findings (summary)
1. **Content is small and clean to migrate** — ~2,000 words total, all captured verbatim ([03](03-content-inventory.md), [content.json](content.json)).
2. **Brand = monochrome UI + warm photography**; de-facto fonts Playfair Display (headings) + Poppins (body), but 4 families + Times New Roman are loaded ([05](05-brand-reference.md)).
3. **Biggest technical issue:** 53 MB 4K hero video autoplaying on all devices.
4. **Biggest SEO issue:** live Hostinger staging domain referenced in schema/canonicals; indexed default post with spam comments.
5. **Biggest content risks:** unattributed testimonials and star rating; inconsistent category naming; no opening hours; facts like "gongs" without supporting items.
6. **Limited photo library:** 10 photos (2 low-res), reused across pages; 1 video; icon-mark logos only as large PNGs (no SVG).
7. **Functionality is simple:** links, sticky header, mobile menu, slider, gallery lightbox, map, one contact form — all reproducible; only the form needs a new backend.

## 5. Document map
| Doc | Content |
|---|---|
| [02-page-inventory.md](02-page-inventory.md) | Routes, shared components, page-by-page sections |
| [03-content-inventory.md](03-content-inventory.md) / [content.json](content.json) | Verbatim content + priorities |
| [04-assets-manifest.csv](04-assets-manifest.csv) | Every asset → page/section, dims, size, concerns |
| [05-brand-reference.md](05-brand-reference.md) | Typography, colours, logo, visual identity |
| [06-functionality-and-dependencies.md](06-functionality-and-dependencies.md) | Feature matrix with verification levels |
| [07-responsive-observations.md](07-responsive-observations.md) | 1440/768/390 findings |
| [08-issues-gaps-questions.md](08-issues-gaps-questions.md) | Issues, gaps, owner questions |
| [09-phase-2-recommendations.md](09-phase-2-recommendations.md) | Phase 2 plan + mandatory design rules |

## 6. Confirmation
- No code, redesign, components, packages or configuration were added to the project. Only `docs/source-audit/` was created.
- No GitHub push, no Vercel deployment.
- No original website data was modified; the contact form was not submitted.
