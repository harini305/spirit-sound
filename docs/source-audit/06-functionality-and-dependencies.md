# 06 — Functionality & Technical Dependencies

Testing was done with headless Chrome 155 (puppeteer-core) on 2026-10-17. Results: [screenshots/_interaction-report.json](screenshots/_interaction-report.json).

Verification levels: **Observed** · **Interaction tested** · **Functionality verified** · **Partially verified** · **Unverified**.

## 1. Platform (original)

| Layer | Detail |
|---|---|
| CMS | WordPress 7.0.7, theme Hello Elementor 3.4.7 |
| Page builder | Elementor 4.1.4 (incl. v4 "atomic" paragraph widgets) + **PRO Elements 3.35.0** (GPL fork of Elementor Pro: sticky, nav menu, slides, gallery) + ElementsKit Lite 4.0.7 |
| Forms | WPForms Lite 2.0.2.2 (form id 288) |
| SEO | Yoast SEO (sitemaps, meta, JSON-LD) |
| Analytics | Google Site Kit 1.188.0 → gtag `GT-NSL7XN7P`; Site Kit also tracks WPForms submission events |
| Performance plugins | LiteSpeed Cache, Smush (images resized to max 1600px on serve), Hostinger CDN (`server: hcdn`) |
| Other namespaces | All-in-One WP Migration (`ai1wm`), Elementor AI, Hostinger hub connector |
| Hosting | Hostinger; **bot-protection interstitial** ("Checking your browser before accessing spiritsoundbali.com", up to 5 s) appears on a fresh browser's first visit |
| JS libs | jQuery + migrate, jQuery UI core, Swiper 8.4.5, e-gallery, SmartMenus, jquery.sticky, Magnific Popup, imagesLoaded |

## 2. Feature matrix

| Feature | Where | Level | Detail / destination | Phase 2 consideration |
|---|---|---|---|---|
| Main navigation | Header | **Functionality verified** | 4 links all return 200; active state = #000 | Static Next.js routes |
| Sticky header | Header | **Observed (config)** | Elementor `sticky: top` on desktop/tablet/mobile, offset 0 | Optional; if kept, ensure it does not hide anchors (`scroll-margin-top`) |
| Mobile menu | Header ≤767px | **Functionality verified** | Hamburger (aria-label "Menu Toggle") toggles `aria-expanded=true`; full-width 160px dropdown with Home / Product / Our Journey / Contact Us, overlaying the hero | Build accessible disclosure/menu; close on route change & Esc |
| WhatsApp CTA | Header, footer, contact card, home closing CTA | **Interaction tested** | `https://wa.me/628123944292` → redirects (200) to `api.whatsapp.com/send/?phone=628123944292` | Keep link; optionally add pre-filled `?text=` only if owner provides wording |
| Email links | Footer, contact | **Observed** | `mailto:domagoes@gmail.com` | Keep |
| Hero background video | Home | **Functionality verified** | Self-hosted MP4 3840×2160, 22.5 s, autoplay muted loop playsinline, **plays on mobile** | Transcode + poster; respect `prefers-reduced-motion`; consider static image on mobile/data-saver |
| Anchor scroll | Product hero | **Functionality verified** | `#collection` exists (card grid container, ~1291px from top) | Smooth scroll via CSS or GSAP ScrollTo |
| Overlay card hover | Home collection | **Interaction tested** | Overlay opacity changes over 0.7s (screenshot pair saved) | Keep subtle; add focus-visible equivalent |
| Button hover | All pill buttons | **Functionality verified** | White → #020202 bg, text → white, 0.5s | Keep simple |
| Testimonial slider | Home | **Functionality verified** | Swiper, 5 slides, fade 800ms, autoplay 4000ms (observed advancing), arrows + dots, pause on hover/interaction, infinite | Only if testimonials are confirmed genuine; prefer static layout or accessible carousel with pause |
| Gallery + lightbox | Home | **Functionality verified** | Justified layout (row height 250px, gap 12px), hover "grow", click opens Elementor lightbox (visible, slideshow) | Next.js grid + lightweight accessible lightbox (or none) |
| Google Map embed | Home, Contact | **Functionality verified** | iframe 582×400, lazy; renders place "The Spirit Sound Gallery Bali" | Click-to-load or lazy iframe; link to maps.app.goo.gl for directions |
| Contact form | Contact | **Partially verified** | WPForms #288, POST to `/contact-us/` (WP backend). Empty submit → client validation "This field is required." ×3 (First, Last, Email). Message optional. Hidden extra field `wpforms[fields][4]` (likely anti-spam) + time token. **Real submission NOT tested** (would send a message to the business). Email recipient, auto-reply, spam handling = **unknown** | **Needs a new backend in Phase 2**: e.g. a Next.js Route Handler sending via an email service, or a form service (Formspree/Web3Forms/etc.), or simply WhatsApp/mailto only. Owner must confirm the recipient address. Add honeypot + server validation |
| Search | WP `/?s=` | **Functionality verified** (backend only) | Works but no UI on site | Not needed |
| Comments | /hello-world/ | **Observed** | Open WP comments; spam present | Do not rebuild |
| Social links | Footer | **Partially verified** | Instagram 200 ✔; Tripadvisor returned **403** to automated request (anti-bot; manual check needed); **Facebook icon → Instagram URL** (bug) | Use only verified URLs; ask owner for Facebook URL or drop icon |
| Analytics | All | **Observed** | GA via Site Kit `GT-NSL7XN7P` | Owner decides whether to keep; if yes add via `next/script` / `@next/third-parties` with consent consideration |
| Structured data | All | **Observed** | Yoast WebPage/WebSite/Organization/BreadcrumbList; Organization name "Spirit Sound Bali", `@id`s on staging domain; no LocalBusiness | Phase 2: emit `LocalBusiness`/`Store` JSON-LD with verified address, geo, phone, sameAs |
| Translation / language | — | **Observed** | English only, `lang="en-US"`; no translation plugin | — |
| Booking / e-commerce / login | — | **Not present** | `/shop`, `/cart`, `/checkout`, `/my-account` all 404; no payment providers | Do not build |
| Downloads (PDF/brochure) | — | **Not present** | None found | — |
| Page transitions / scroll animations | — | **Observed** | No entrance animations configured except slider `fadeInRight` and gallery hover grow; no parallax/motion FX | GSAP/ScrollTrigger in Phase 2 is a new addition — keep restrained |

## 3. Dependencies to retain or replace

| Dependency | Retain? |
|---|---|
| wa.me WhatsApp link | **Retain** (primary conversion path) |
| Google Maps embed + short link | **Retain** |
| Instagram, Tripadvisor URLs | **Retain** after manual verification |
| WPForms backend | **Replace** (WordPress will not be behind the Next.js frontend unless decided otherwise) |
| Google Analytics GT-NSL7XN7P | **Owner decision** |
| Google Fonts CDN | **Replace** with self-hosted `next/font` (2 families) |
| Elementor/ElementsKit/Swiper/jQuery | **Drop** |

## 4. Unknowns
- Form email recipient, notification template, spam settings (admin-only).
- Whether WordPress stays live as CMS/back-end or the Next.js site replaces it entirely (hosting/DNS decision).
- Whether the Hostinger bot-check will also sit in front of the new site.
- Draft or private WordPress content (admin-only).
