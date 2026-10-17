# 05 — Brand Reference (Typography, Colour, Logo, Visual Identity)

Values are **verified** from the live Elementor CSS (`post-6.css` global kit, `post-{20,22,24,26,319,368}.css`, `local-*.css`) and from computed styles in headless Chrome, unless marked **estimate**. Raw CSS: [evidence/css/](evidence/css/); per-element maps: `evidence/css/typo-post-*.txt`.

---

## 1. Typography (original site)

### 1.1 Families loaded
All four are loaded from Google Fonts with **every weight 100–900 + italics** (18 styles each, `display=swap`). No font files are self-hosted and **no font files exist in the project**.

| Family | Role on the original site | Usage share (CSS rule count) |
|---|---|---|
| **Playfair Display** (serif) | All headings H1–H3, header site name, footer headings, testimonial names | ~46 rules — dominant heading face |
| **Poppins** (geometric sans) | Body paragraphs, hero eyebrows, nav, buttons, card labels, footer text | ~37 rules — dominant text face |
| Inter | Kit default `body` font (15px / 1.6em) — only visibly used in the footer copyright line and WPForms/theme fallbacks | 2 rules |
| Roboto | Elementor kit "Text"/"Accent" globals — effectively only reaches the mobile dropdown nav and unstyled widgets | 2 rules + globals |
| Times New Roman (system) | Testimonial quote text (italic, weight 100) | 1 rule |
| *DM Sans* | Only on the **host's bot-check interstitial**, not the brand | — |
| Logo lockup type | Serif small-caps "THE SPIRIT SOUND" + script "Gallery" — **baked into the PNG; typefaces unidentified** | — |

### 1.2 Type scale (verified desktop → tablet ≤1024 → mobile ≤767)

| Element | Family / weight | Size D → T → M | Line-height | Letter-spacing | Colour |
|---|---|---|---|---|---|
| Hero H1 | Playfair 600 | 68 → 40 → 27px | 1.2em (M 1.3em) | 2.5px | #FFFFFF |
| Hero eyebrow "THE SPIRIT SOUND GALLERY" | Poppins 100 | 25 → 17 → 15px | — | 1.5px (M 2px) | #FFFFFF |
| Hero paragraph | Poppins 400 | 16 → 14 → 12px | 25px | — | #FFFFFF |
| Section H2 (home) | Playfair 500 | 40 → 26/30 → 25px | (M 1.3em) | 0.5px | #0B0B0B (kit primary) / #000 |
| Section H2 (product intro, CTA) | Playfair 500 | 30 → 30 → 25px | | 0.5px | #000000 |
| Visit H2 | Playfair 500 | 33 → 25px | | 0.5px | primary |
| Card H3 (home overlay cards) | Playfair 700 | 27 → 20 → 25px | | 0.5px | #FFFFFF |
| Card H3 (product cards) | Playfair 500 | 25 → 20px | 1.3em (T) | — | #1A1A1A |
| Small-caps label (product cards) | Poppins 500 | 11px | | 2px | #333333 |
| Section label "THOUGHTFULLY CURATED" | Poppins 500 | 15 → 13px | | 2px | #555555 |
| Body paragraph | Poppins 300 | 15 → 13 → 13/12px | 25–30px | — | #555555 or inherited #333 |
| Header site name | Playfair 500 | 15px | | 1.1px | primary |
| Nav item | Poppins 400 | 14px (T 11px) | | | #444444, active/focus #000 |
| Buttons | Poppins 300 (header 400) | 14 → 13px (header 14 → 11/12) | | | see colours |
| Testimonial name | Playfair 600 | 30 → 25px | | | #000 |
| Testimonial quote | Times New Roman italic 100 | 17 → 15px | | 0.7px | #000 |
| Footer heading | Playfair 400 | 24 → 18px | | 1px | #F5F1EB |
| Footer text/links | Poppins 400 | 14 → 12px | 1.8–2.2em | | #B8B1A8, hover #FFF |
| Copyright | Inter 400 | 12 → 10px | | | #FFFFFF8C |
| Kit defaults | body Inter 15px/1.6em; h1 Playfair 45px/500; h2 30px; h3 22px | | | | |

**Observations:** the scale is inconsistent (equivalent H2s at 30/33/40px; card H3 at 25 vs 27px, weight 500 vs 700). Body text drops to 12–13px at weight 300 on tablet/mobile — low legibility. Light weights (100/300) of Poppins are used heavily.

### 1.3 Mandatory rule for the redesign — EXACTLY TWO font families
- The redesigned site must use **exactly two** font families site-wide: one for headings, one for body/UI (nav, buttons, forms, cards, footer).
- No third family for quotes, footer, logo-text, decorative headings or any component. (The original's Times New Roman testimonial italic, Inter copyright and Roboto dropdown must **not** carry over.)
- Hierarchy via size, weight, line-height and letter-spacing only.
- Both fonts must be readable, professional, not fancy. Self-host via `next/font` with only the weights actually used.
- **Final choice is deferred to Phase 2** (not selected in this audit). Notes to inform that choice:
  - The original's de-facto pair is **Playfair Display (headings) + Poppins (body)** — keeping one or both maximises brand recognition.
  - Playfair Display is a high-contrast display serif; it is fine at heading sizes but should not be used for body text. If it feels too "fancy", calmer serif alternatives with a similar tone exist (to be evaluated in Phase 2).
  - Poppins at weights 100/300 is thin on small screens; Phase 2 should use 400 for body text whichever family is chosen.

---

## 2. Colour

### 2.1 Elementor global kit (declared)
| Token | HEX | Actually visible? |
|---|---|---|
| Primary | **#0B0B0B** | Yes — default heading colour |
| Secondary | **#A68A64** (muted bronze) | **Barely** — only as default divider-icon colour; not visibly used |
| Text | **#333333** | Yes — inherited body text, card labels |
| Accent | **#C6A96B** (soft gold) | **No** in practice — Elementor default for buttons/nav underline, but every button and nav is overridden to black/white |

### 2.2 Colours actually rendered (verified)
| Role | HEX | Where |
|---|---|---|
| Near-black surfaces | #000000, #020202, #030303, #050505, #0F0F0F | Overlays, button hover, footer (#0F0F0F) |
| White | #FFFFFF | Header, page bg, card bg, hero text, buttons |
| Section tints | #FAFAFA (main alt band), #F5F5F5 (closing CTA band) | Alternating sections |
| Heading ink | #0B0B0B / #000000 / #1A1A1A | H2/H3 |
| Body grey | #555555 (muted paragraphs), #333333, #444444 (nav) | Text |
| Borders | #EBEBEB (cards), #E4E4E4, #ECECEC (hamburger bg) | Cards, dividers |
| Warm cream | **#F5F1EB** | Footer headings |
| Warm taupe | **#B8B1A8** | Footer text, social-icon circles |
| Social hover | #EBEBEB | Footer icons |
| Overlays | black at 50% (home hero), 60% (product hero), 30→50% hover (home image), 50→30% hover (collection cards) | Image treatment |
| Shadows | `0 0 10px rgba(0,0,0,.15)` cards; `rgba(0,0,0,.24)` header | Depth |

### 2.3 Incidental / not brand
- #FFBC7D — Elementor default page-transition colour (unused template default).
- #375EFB, #0C0D0E, #E0E0E0 — Elementor v4 atomic-widget base defaults.
- WPForms default greys/red for required asterisk & errors.
- Purple spinner / DM Sans — Hostinger bot-check page.

### 2.4 Brand colour summary
The live brand is **monochrome (black / white / soft greys) with warm neutral accents (#F5F1EB cream, #B8B1A8 taupe)**. The warmth and colour come almost entirely from the **photography** (amber light, brass, bronze, saffron and prayer-flag colours). The declared golds (#C6A96B, #A68A64) fit that photography and are available as a recognisable accent, but they are **not currently visible** — using them in Phase 2 would be a deliberate choice, not a carry-over.

---

## 3. Logo

| Variant | File | Use |
|---|---|---|
| Icon mark, black, transparent | `Logo-Spirit-Sound-Black.png` (1600²) | Header |
| Icon mark, white, transparent | `Logo-Spirit-Sound-White.png` (1600²) | Footer |
| Full lockup, black on opaque white | `Logo-Spirit-Sound-Putih.png` (1600²) | Schema logo only; source of favicon |
| Icon mark 512 crops (black/white, transparent) | `cropped-Logo-Spirit-Sound-{Black,White}.png` | Unused — best favicon source |

- **Mark:** a calligraphic seated meditation figure — flame/drop-shaped body with an oval "head/third-eye" dot, crossed legs formed by an infinity loop. Brush-stroke, organic, single colour.
- **Lockup:** mark above "THE SPIRIT SOUND" (serif caps, "SPIRIT SOUND" bolder) and "Gallery" in script.
- On the site the header pairs the icon mark with live text "THE SPIRIT SOUND GALLERY" in Playfair caps (not the lockup typeface). On mobile only the mark is visible.
- **No SVG / vector logo available.** No transparent version of the full lockup. → Ask the owner for vector files (see 08).

## 4. Other visual identity elements

| Element | Original treatment |
|---|---|
| Shape language | Soft rounded rectangles: **15px** radius on images and cards; **24px** pill buttons; 5px header button; circular social icons |
| Depth | Very light: single soft shadow on cards and header |
| Image treatment | Warm, low-light interior photography of brass bowls, bells (genta), deity statues, prayer flags; dark overlays (30–60%) for text on image; hover lightens overlay; gallery images "grow" on hover |
| Icons | Thin line arrow on outline buttons; WhatsApp glyph; solid social glyphs in taupe circles |
| Motifs | ★★★★★ star line in hero; uppercase spaced eyebrows; thin dividers in product cards |
| Layout | Centred, symmetrical, max content width 1140px; lots of whitespace; alternating white/#FAFAFA bands |
| Tone | Calm, reflective, spiritual, minimal, gallery-like; copy is soft and invitational ("received with care", "quiet invitation") |

**Carry forward:** monochrome + warm photography, the icon mark, serif-heading/sans-body contrast, calm spacious tone, rounded-but-restrained shapes.
**Do not carry forward:** repeated eyebrow above every hero, unattributed star rows, four font families, thin 100/300 body weights, Times New Roman quotes.
