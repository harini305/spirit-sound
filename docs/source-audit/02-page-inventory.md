# 02 — Page & Route Inventory

All routes discovered from: header/footer nav, internal links, `robots.txt` → Yoast `sitemap_index.xml` (post / page / category sitemaps), WordPress REST API (`/wp-json/wp/v2/pages`, `/posts`, `/media`), and probing common WordPress/e-commerce routes.

## 1. Route table

| Route | Status | Type | Source | Last modified | Recommendation for Phase 2 |
|---|---|---|---|---|---|
| `/` | 200 | Main nav — Home | nav, sitemap, REST (page id 20) | 2026-06-24 | **Implement** |
| `/product/` | 200 | Main nav — Collection (listing, no detail pages) | nav, sitemap, REST (id 22) | 2026-06-24 | **Implement** (keep the `/product/` URL, or redirect it if renamed — see 09) |
| `/our-journey/` | 200 | Main nav — About/Story | nav, sitemap, REST (id 24) | 2026-06-24 | **Implement** |
| `/contact-us/` | 200 | Main nav — Contact + enquiry form | nav, sitemap, REST (id 26) | 2026-06-24 | **Implement** |
| `/hello-world/` | 200 | Blog post — WordPress default + spam comments | post-sitemap, REST post | 2026-04-18 | **Do not implement.** Treat as legacy; 301 → `/` or let it 404 (410) |
| `/category/blog/` | 200 | Category archive (1 post) | category-sitemap | 2026-04-18 | **Do not implement** (no real content) |
| `/category/uncategorized/` | 404 | — | probe | — | n/a |
| `/?s={term}` | 200 | WP search results | schema SearchAction | — | Not needed (4 pages) |
| `/feed/` | 200 | RSS (only Hello world) | WP default | — | Not needed |
| `/wp-json/…` | 200 | REST API (public) | WP | — | n/a — backend only |
| `/blog/`, `/shop/`, `/cart/`, `/checkout/`, `/my-account/`, `/about/`, `/services/`, `/sample-page/` | 404 | Probed — do not exist | probe | — | n/a. Confirms **no e-commerce, no accounts, no services pages** |
| any unknown path | 404 | Theme 404: "The page can't be found." | — | — | Implement a simple branded 404 |
| `https://azure-bison-590473.hostingersite.com/` | 200 | **Hostinger staging/temporary domain — live duplicate of the site** | Yoast schema `@id`s, canonicals on post/category, og:image on Contact | — | Out of frontend scope; flag to owner (should 301 to the primary domain or be de-indexed) |

**Coverage:** every discovered route was fetched. No pages were found that are linked from the site but inaccessible. No hidden landing pages, drafts, product detail pages, events or retreats exist in public sitemaps or the public REST API. (Drafts/private pages cannot be seen without admin access — **unknown**.)

## 2. Shared components

| Component | Where | Notes |
|---|---|---|
| Header (Elementor template 319) | All pages | White bar, shadow `0 0 10px rgba(0,0,0,.24)`, 80px side padding desktop. Left: black icon logo + "THE SPIRIT SOUND GALLERY" (Playfair 15px/500, ls 1.1px, rendered as `h2`). Centre: nav (Poppins 14px, #444, active #000). Right: black "WhatsApp" button (5px radius). **Sticky top on desktop/tablet/mobile** (Elementor sticky). Mobile: site name hidden, hamburger (grey #ECECEC square) opens full-width dropdown. |
| Footer (Elementor template 368) | All pages | Background #0F0F0F; 3 columns (brand blurb · Explore links · Visit Our Space + social icons); thin divider; centred copyright (Inter 12px, white 55% alpha). |
| Page hero | All 4 pages | Full-viewport (min-height 100vh) dark-overlay image/video, centred: eyebrow "THE SPIRIT SOUND GALLERY" (Poppins 25px/100, ls 1.5px) + H1 (Playfair 68px/600, ls 2.5px) + paragraph (Poppins 16px, max 690px) + optional pill button (white, 24px radius). |
| Pill outline button with arrow | Home | "Read Our Story", "View All Products", "Explore the Collection" — white bg, thin border, arrow icon, hover → near-black #020202 bg + white text (0.5s). |
| Image + text split | Home (Journey), Our Journey (×2) | Image with 15px radius, text column with Playfair H2 + Poppins 300 paragraphs. |
| Overlay image cards | Home (Collection) | 3 tall cards (min-h 450px), bg photo + dark overlay that lightens on hover (0.7s), title + text bottom-aligned. |
| Bordered product cards | Product | White card, 1px #EBEBEB border, 15px radius, soft shadow, image + small caps label + Playfair H3 + divider + text. |
| Centred text section | Many | Playfair H2 30–40px + Poppins 300 15px #555 paragraph, max ~600px. |
| Visit block + map | Home, Contact | Two columns: text (address/contact) + Google Map iframe (400px). |

## 3. Page-by-page

### 3.1 Home `/`
1. **Purpose:** brand introduction; drive to collection, story, WhatsApp and physical visit.
2. **Sections (original order):** Header → Hero (video) → Journey Guided by Sound (image + text) → Thoughtfully Curated Collection (3 overlay cards + button) → Testimonials slider (5) → Experience the Sound in Presence (justified gallery, 9 images) → Visit Our Space in Ubud (text + map) → Closing CTA (light grey #F5F5F5 band) → Footer.
3. **Content to retain:** H1, hero paragraph, story teaser, 3 categories, gallery, address/contact/map, WhatsApp CTA. Full text: [03 §D](03-content-inventory.md).
4. **Assets:** V1 (hero video), I1, I3, I7, I5, gallery I6/I3/I10/I8/I7/I2/I9/I4/I5, L1/L2. See [04-assets-manifest.csv](04-assets-manifest.csv).
5. **Typography/colour:** Hero white on black overlay (50%); sections alternate #FFFFFF / #FAFAFA; testimonial name Playfair 30px/600, quote Times New Roman italic 17px/100.
6. **Interactive:** video autoplay; overlay card hover; testimonial slider (autoplay 4 s, fade, arrows + dots, pause on hover); gallery "grow" hover + lightbox; map; sticky header.
7. **Responsive:** see [07](07-responsive-observations.md). Total page height 5609px desktop / 4763 tablet / 6704 mobile.
8. **SEO:** title + description present; **no og:image**; canonical correct; schema references staging domain.
9. **Dependencies:** self-hosted video, Swiper, e-gallery lightbox, Google Maps embed, wa.me.
10. **Risks:** 53 MB video; "Accessories" card shows statues; final "Explore the Collection" opens WhatsApp; unattributed ★★★★★ and testimonials.
11. **Recommendation:** keep the overall story (hero → story → collection → visit), but cut repetition: one visit/contact block, shorter testimonials area (only if confirmed genuine), gallery trimmed or kept as a single strong band.

### 3.2 Product `/product/`
1. **Purpose:** showcase the three instrument/object categories. *Not* a shop: no prices, no product details, no add-to-cart, no per-item enquiry.
2. **Sections:** Header → Hero (I2 bg, 60% overlay, "Explore Collection" → `#collection`) → Intro (label + H2 + text) → 3 bordered cards (`#collection`, #FAFAFA bg) → Footer.
3. **Retain:** H1, intro, 3 items with labels and descriptions.
4. **Assets:** I2, I4, I7, I5.
5. **SEO:** title/description good; og:image = I4.
6. **Interactive:** anchor scroll only.
7. **Risks:** Thin page (3 items). Category naming differs from Home (Accessories vs Statue). Copy mentions "gongs" but no gong item/image exists.
8. **Recommendation:** implement as a "Collection" page with the 3 categories and a clear "Ask about this piece / enquire on WhatsApp" action per category (destination = existing wa.me link, no invented prices). Add gongs/accessories only if the owner supplies content.

### 3.3 Our Journey `/our-journey/`
1. **Purpose:** founder/brand story and philosophy.
2. **Sections:** Header → Hero (I5 bg) → Where It All Began (I1 left + text) → When Sound Became Something More (centred, #FAFAFA) → Quote banner (I4 bg, Playfair white) → Living With Sound (3 pillars) → Space to Experience (text + I6 right, #FAFAFA) → Quiet Reflection (centred) → Footer.
3. **Retain:** story beats, quote, three pillars, "a place to experience, not to teach" positioning.
4. **Assets:** I5, I1, I4, I6.
5. **SEO:** title/description good; no og:image.
6. **Risks:** 7 sections of similar reflective prose — long and repetitive. I6 is low-res.
7. **Recommendation:** condense to ~4 beats: origin (image + text) → quote → three pillars → space to experience/visit invitation. Merge "When Sound Became Something More" and "Quiet Reflection".

### 3.4 Contact Us `/contact-us/`
1. **Purpose:** enquiries via WhatsApp/email/form, directions.
2. **Sections:** Header → Hero (I3 bg) → A Simple Way to Connect (centred, #FAFAFA) → 3 contact cards (WhatsApp / Email / Visit Us) → Send Us a Message (WPForms in white card on #FAFAFA) → Visit Our Space in Ubud + map → Footer.
3. **Retain:** all 3 channels, form fields, address, map.
4. **SEO:** title/description good; og:image wrongly = WPForms spinner SVG on staging domain.
5. **Interactive:** form with client validation (verified), map, links.
6. **Risks:** form delivery backend unverified (not submitted, to avoid messaging the business); three overlapping intro texts; visit block duplicates Home.
7. **Recommendation:** one intro, channels + form side by side, address + map once. Form needs a new backend in Phase 2 (see [06](06-functionality-and-dependencies.md)).

### 3.5 Hello world! `/hello-world/` (legacy)
WordPress default post; default comment + 3 spam comments with outbound links; open comment form posting to `wp-comments-post.php`; canonical points to staging domain. **Not to be rebuilt.**

### 3.6 Category: Blog `/category/blog/` (legacy)
Lists only "Hello world!". Canonical points to staging domain. **Not to be rebuilt.**

### 3.7 404
Theme default text, header/footer present. Rebuild as a simple branded 404 with links to the 4 main pages.
