# 08 — Issues, Gaps, Inconsistencies & Open Questions

Severity: **High** = affects users/SEO/performance significantly or risks publishing wrong facts · **Med** · **Low**.
Nothing here has been "fixed" or decided; items marked **Q** need an answer from the business owner.

## 1. Performance
| # | Issue | Evidence | Sev |
|---|---|---|---|
| P1 | Home hero video is **53 MB, 3840×2160**, autoplays on all devices including mobile | media id 372; `background_play_on_mobile: yes`; verified playing at 390px | High |
| P2 | 4 Google Font families × 18 styles each requested on every page | stylesheet links | Med |
| P3 | Logo PNGs are 1600×1600 (~110–133 KB) for ~40px display | header/footer `<img>` | Med |
| P4 | Heavy plugin JS stack (jQuery, Swiper, SmartMenus, sticky, Magnific, ElementsKit offcanvas/search scripts not even used) | script list | Med |
| P5 | Host bot-check interstitial (up to 5 s) on first visit from a fresh browser | screenshot evidence (first capture) | Med (hosting, outside frontend) |

## 2. SEO / metadata
| # | Issue | Sev |
|---|---|---|
| S1 | **Staging domain `azure-bison-590473.hostingersite.com` is live (200)** and is referenced in Yoast schema `@id`/`url`, in canonicals of `/hello-world/` and `/category/blog/`, and in Contact's og:image → duplicate-content and brand-signal risk | High |
| S2 | No `og:image` on Home and Our Journey; Contact og:image is the WPForms spinner SVG | Med |
| S3 | Organization schema name "Spirit Sound Bali" ≠ on-page brand "The Spirit Sound Gallery"; no `LocalBusiness` schema with address/geo/phone | Med |
| S4 | Default "Hello world!" post + `/category/blog/` are indexed (in sitemaps) with **spam comments containing outbound links** | High |
| S5 | Header site name and footer headings are `<h2>` on every page → noisy heading outline | Low |
| S6 | Hero eyebrow repeated on every page as the first text | Low |

## 3. Content inconsistencies
| # | Issue | Sev |
|---|---|---|
| C1 | **Category naming differs**: Home cards = Singing Bowls / Genta / **Accessories**; Product page = Singing Bowl / Genta / **Statue**. The Home "Accessories" card shows the Ganesha statues photo. | Med — **Q** |
| C2 | Copy repeatedly mentions **gongs** ("Singing Bowls, Gongs, and Sound Healing instruments"), but no gong item or photo exists | Med — **Q** |
| C3 | Phone shown in 3 formats: `+62 812-394-4292`, `+62 812 394 4292`, `+62 812 3944 292` | Low — **Q** preferred format |
| C4 | Home closing CTA "Explore the Collection" opens **WhatsApp**, not the collection | Med |
| C5 | Footer **Facebook icon links to Instagram** | Med — **Q** Facebook URL? |
| C6 | Header "Product" vs footer "Products"; URL `/product/` for a multi-item collection | Low |
| C7 | Heading "Ganesha and Others Statue" — grammatically awkward (likely "Ganesha & Other Statues") | Low — **Q** (do not silently correct) |
| C8 | "Space to Experience" heading contains a hidden zero-width space | Low |
| C9 | Brand name variants: The Spirit Sound Gallery / The Spirit Sound Gallery Bali / Spirit Sound Bali / @spiritsoundubud | Med — **Q** canonical name |
| C10 | Heavy repetition of "curated / thoughtfully selected / with care" phrasing; three overlapping intros on Contact; overlapping reflective sections on Our Journey; Visit block duplicated on Home + Contact | Med |
| C11 | Hero shows "★★★★★" with no source/rating count | Med — **Q** |

## 4. Content gaps (not on the site — must NOT be invented)
| # | Missing | Q for owner |
|---|---|---|
| G1 | **Opening hours / days** | What are the opening hours? |
| G2 | Prices / price ranges, sizes, materials, origin of instruments | Should any be published? |
| G3 | Individual product items (only 3 category cards) | Do you want individual items shown? Photos? |
| G4 | Founder's name and story attribution | May we name the founder? |
| G5 | Whether sessions/sound healing experiences/classes are offered (Our Journey says the space is "never created as a place to teach or to guide"; meta descriptions mention "sound healing experiences") | Do you offer sessions, or retail/gallery only? |
| G6 | Shipping / international orders | Do you ship? |
| G7 | Facebook / other social URLs | |
| G8 | Vector (SVG) logo; transparent full lockup | Can you provide the logo source files? |
| G9 | Higher-res originals for `contact-me…jpg` (650px) and `ganesha…avif` (375px); the 4K video master | |
| G10 | Business email preference (currently personal Gmail `domagoes@gmail.com`) | Is this the public address to use? |

## 5. Trust / authenticity
| # | Issue | Sev |
|---|---|---|
| T1 | **5 testimonials have no source** (not linked to Tripadvisor/Google), all 5-star, generic Western names. Authenticity cannot be verified from the site. | High — **Q**: Are these real reviews? Can we link/quote the Tripadvisor or Google reviews instead? |
| T2 | Tripadvisor listing could not be fetched automatically (403 anti-bot) — existence of page plausible from URL, not verified | Low |

## 6. Accessibility / UX
| # | Issue | Sev |
|---|---|---|
| A1 | Body copy at Poppins 300, 12–13px on tablet/mobile; testimonial italic at weight 100 | Med |
| A2 | Hero white text over video relies on a 50% overlay; contrast varies with video frames | Low |
| A3 | Autoplaying slider (4 s) and video; no reduced-motion handling | Med |
| A4 | Brand name hidden in mobile header | Low |
| A5 | Contact form: no consent/privacy note; message field optional (a submission can be empty of content) | Low |
| A6 | Gallery items are links to full images with aria-labels (OK), lightbox keyboard support not verified | Low |

## 7. Asset issues
- Logo naming confusing ("Putih" = full black lockup on white). Duplicate site-icon uploads (`cropped-Logo-Spirit-Sound-Putih.png` and `-Putih-1.png`, identical size).
- Favicon is the full text lockup shrunk to 32px — illegible.
- Two photos are WhatsApp exports from 2022-07-28 with machine names.
- Same photos reused 3× across pages (I3, I4, I5) — limited photo library (10 photos total).

## 8. Audit limitations / unknowns
- No WordPress admin access: drafts, private pages, form recipient and settings unknown.
- Contact form was **not** submitted (to avoid messaging the business) → delivery unverified.
- Tripadvisor link unverified (403 to bot).
- Testing in headless Chrome only; no Safari/iOS, no real devices.
- Testimonial slider tablet frame captured mid-transition.
