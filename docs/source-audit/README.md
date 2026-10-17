# Source Audit — The Spirit Sound Gallery (spiritsoundbali.com)

Phase 1 research for the frontend rebuild. **Audit only — no implementation.** Captured 2026-10-17.

## Start here
1. [01-audit-report.md](01-audit-report.md) — method, coverage, key findings
2. [02-page-inventory.md](02-page-inventory.md) — routes and page-by-page sections
3. [03-content-inventory.md](03-content-inventory.md) — verbatim content (also [content.json](content.json))
4. [04-assets-manifest.csv](04-assets-manifest.csv) — asset → section map
5. [05-brand-reference.md](05-brand-reference.md) — fonts, colours, logo, identity
6. [06-functionality-and-dependencies.md](06-functionality-and-dependencies.md) — features & integrations
7. [07-responsive-observations.md](07-responsive-observations.md) — desktop/tablet/mobile
8. [08-issues-gaps-questions.md](08-issues-gaps-questions.md) — problems + questions for the owner
9. [09-phase-2-recommendations.md](09-phase-2-recommendations.md) — Phase 2 plan + **mandatory design rules (two-font rule etc.)**

## Folders
| Folder | Contents |
|---|---|
| `assets/original/images/` | 10 original photos as served by the live site (AVIF/JPEG) |
| `assets/original/logos/` | 7 logo files (icon mark black/white, full lockup) |
| `assets/original/favicon/` | 4 site-icon sizes |
| `assets/original/video/` | `Singing-Bowl.mp4` hero video (53 MB, 4K — must be transcoded before use) |
| `screenshots/` | Full-page captures `{page}--{device}-{width}.png` at 1440 / 768 / 390 + interaction shots; `_capture-report.json`, `_interaction-report.json` |
| `evidence/` | Parsed page structure (`*.parsed.txt`), sitemaps, robots.txt, REST API JSON (`rest-api/`), Elementor CSS + per-element typography maps (`css/`) |

## Screenshot index
| File | Page | Viewport |
|---|---|---|
| `home--desktop-1440.png` / `-viewport-hero.png` | Home | 1440×900 (full / first screen) |
| `home--tablet-768.png` | Home | 768×1024 |
| `home--mobile-390.png` / `-viewport-hero.png` / `-menu-open.png` | Home | 390×844 |
| `home--desktop-1440-category-cards.png` / `-category-card-hover.png` | Home collection cards (normal / hover) | 1440 |
| `home--desktop-1440-testimonial-slider.png` | Home testimonials | 1440 |
| `home--desktop-1440-gallery-lightbox.png` | Gallery lightbox open | 1440 |
| `product--{desktop-1440,tablet-768,mobile-390}.png` | Product | 3 sizes |
| `our-journey--{desktop-1440,tablet-768,mobile-390}.png` | Our Journey | 3 sizes |
| `contact-us--{desktop-1440,tablet-768,mobile-390}.png` | Contact | 3 sizes |
| `contact-us--desktop-1440-form-validation.png` | Contact form after empty submit | 1440 |
| `contact-us--desktop-1440-map-embed.png` | Google Map embed | 1440 |
| `category-blog--*`, `hello-world--*`, `404-sample--*` | Legacy/utility pages | 1440, 390 |

Note: in full-page captures the lazy Google Map area may appear blank; it renders (see map-embed shot).
Note: in `_capture-report.json` the `home / desktop` entry shows the host's bot-check page (first request). The home desktop screenshot was then recaptured after that check passed, and its measurements are in `_interaction-report.json` (`homeDesktop`).

## Status
Phase 1 complete. **Waiting for approval before Phase 2.** Owner questions are listed in [08](08-issues-gaps-questions.md).
