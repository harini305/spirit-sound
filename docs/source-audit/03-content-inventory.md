# 03 — Content Inventory (Preservation Reference)

Source: live site `https://spiritsoundbali.com/`, captured 2026-10-17 via HTML + WordPress REST API.
Text below is **verbatim** from the live site (spelling, capitalisation and punctuation preserved).
Raw parsed evidence per page: [evidence/](evidence/) (`*.parsed.txt`). Machine-readable copy: [content.json](content.json).

Legend for the **Priority** column: **Must** = essential fact or core message; **Keep** = keep the meaning, can be shortened; **Low** = repetitive / optional; **Review** = needs business confirmation before reuse (see [08-issues-gaps-questions.md](08-issues-gaps-questions.md)).

---

## A. Business facts (verified on the live site)

| Fact | Value (verbatim) | Where it appears | Priority |
|---|---|---|---|
| Brand name (on-page) | The Spirit Sound Gallery | Header, hero eyebrows, footer, titles | Must |
| Brand name variants | "Spirit Sound Bali" (Yoast Organization/WebSite schema), "The Spirit Sound Gallery Bali" (Google Maps listing, Tripadvisor URL, Contact page title), Instagram handle `spiritsoundubud` | Schema, external | Review |
| Site tagline (WP) | Spiritual Sound Healing and Singing Bowl Art Gallery in Bali | WP settings / schema description | Keep |
| Full address | Jl. Hanoman No.65, Padang Tegal Kelod, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571 | Home + Contact "Visit Our Space in Ubud" | Must |
| Short address | Jl. Hanoman No.65 Ubud, Bali | Footer | Must |
| Phone / WhatsApp | +62 812-394-4292 · +62 812 394 4292 · +62 812 3944 292 (same number, 3 formats) | Home/Contact visit block · Footer · Contact card | Must (normalise format → Review) |
| WhatsApp link | `https://wa.me/628123944292` | Header button, footer, contact card, home final CTA | Must |
| Email | domagoes@gmail.com (`mailto:`) | Home/Contact visit block, footer, contact card | Must (Review: personal Gmail) |
| Instagram | `https://www.instagram.com/spiritsoundubud/` | Footer (Instagram icon **and** Facebook icon both point here) | Must |
| Tripadvisor | `https://www.tripadvisor.com/Attraction_Review-g297701-d26133928-Reviews-The_Spirit_Sound_Gallery_Bali-Ubud_Gianyar_Regency_Bali.html` | Footer icon | Keep |
| Google Maps short link | `https://maps.app.goo.gl/cFXxxBPLoBPrcavt9` → resolves to place "The Spirit Sound Gallery Bali", lat −8.5170239, lng 115.2636174 | Contact "Visit Us" card | Must |
| Google Maps embed | `https://maps.google.com/maps?q=The%20Spirit%20Sound%20Gallery&t=m&z=14&output=embed&iwloc=near` | Home + Contact | Keep |
| Copyright | © 2026 The Spirit Sound Gallery. All rights reserved. | Footer | Keep |
| Opening hours | **Not present anywhere on the site** | — | Gap |
| Prices / product SKUs | **Not present anywhere on the site** | — | Gap |
| Founder name | **Not stated** (founder appears in photos only; media alt text says "Founder of The Spirit Sound Gallery…") | — | Gap |

---

## B. Shared header (all pages)

| Item | Content | Link |
|---|---|---|
| Logo | Icon mark (black, transparent PNG) | `/` |
| Site name (h2, hidden on mobile) | THE SPIRIT SOUND GALLERY | `/` |
| Nav | Home · Product · Our Journey · Contact Us | `/`, `/product/`, `/our-journey/`, `/contact-us/` |
| Button | WhatsApp (WhatsApp icon) | `https://wa.me/628123944292` |

## C. Shared footer (all pages)

| Column | Content |
|---|---|
| Brand | White icon mark → `/`; heading "The Spirit Sound Gallery"; text: "Curated singing bowls, gongs, and sacred sound instruments in Ubud – Bali, thoughtfully selected to support mindfulness, meditation, and personal exploration through sound." |
| Explore | Home · Products · Our Journey · Contact Us (note "Products" plural vs header "Product") |
| Visit Our Space | "Jl. Hanoman No.65 Ubud, Bali" · "+62 812 394 4292" (→ wa.me) · "domagoes@gmail.com" (→ mailto) |
| Social icons | WhatsApp → wa.me · Envelope → mailto · Instagram → instagram · **Facebook → instagram URL (wrong)** · Tripadvisor → tripadvisor |
| Bottom bar | © 2026 The Spirit Sound Gallery. All rights reserved. |

---

## D. Home `/`

SEO title: **Sound Healing Ubud | Singing Bowls & Sacred Instruments Bali**
Meta description: **Explore a unique collection of singing bowls and sacred instruments in Ubud, Bali. Experience the power of sound healing at The Spirit Sound Gallery.**

| # | Section | Verbatim content | Priority |
|---|---|---|---|
| 1 | Hero (video background) | Eyebrow: THE SPIRIT SOUND GALLERY · **H1: Where Sound Becomes Experience** · "Discover a curated collection of Singing Bowls, Gongs, and Sound Healing instruments in Ubud - Bali, thoughtfully selected to support your personal journey through meditation, mindfulness, and sacred sound." · Button: **Explore the Collection** → `/product/` · "★★★★★" · "EXPERIENCE TRANQUILITY WITH OUR INSTRUMENTS" | Must (stars line: Review — unattributed rating) |
| 2 | Journey Guided by Sound | H2 **Journey Guided by Sound** · P1 "The Spirit Sound Gallery began as a personal exploration into the world of sound and awareness." · P2 "What started as curiosity gradually unfolded into a deeper understanding of how vibration can influence presence, balance, and connection." · P3 "Today, we offer a curated selection of singing bowls, gongs, and sound healing instruments, chosen not only for their form, but for the feeling they carry." · Button **Read Our Story** → `/our-journey/` | Must |
| 3 | Thoughtfully Curated Collection | H2 **Thoughtfully Curated Collection** · "Each piece is selected with intention, focusing on quality, character, and resonance, supporting both meditation and sound healing practices." · Cards: **Singing Bowls** — "Grounding tones for meditation and inner awareness." · **Genta** — "Expansive vibrations that transform space and energy." · **Accessories** — "Supporting tools to complete your sound experience." · Button **View All Products** → `/product/` | Must (category naming: Review — differs from Product page) |
| 4 | Testimonials (slider) | See §H below (5 quotes) | Review |
| 5 | Experience the Sound in Presence | H2 **Experience the Sound in Presence** · "Visitors are welcome to explore and feel the instruments directly in our space. Each interaction becomes a quiet moment of discovery and connection." · 9-image gallery (lightbox) | Keep |
| 6 | Visit Our Space in Ubud | H2 **Visit Our Space in Ubud** · P1 "Located in the heart of Ubud, our space offers a calm and welcoming environment for those who wish to explore sound more closely." · P2 "We invite you to visit, take your time, and experience the instruments in a simple and personal way." · **Address** Jl. Hanoman No.65, Padang Tegal Kelod, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571 · **Contact** +62 812-394-4292 / domagoes@gmail.com · Google Map embed | Must (duplicated on Contact) |
| 7 | Closing CTA | H2 **Discover the Sound That Resonates With You** · "Take your time to explore our collection, or visit our space in Ubud to experience the instruments in person." · Button **Explore the Collection** → `https://wa.me/628123944292` (label/destination mismatch) | Keep |

## E. Product `/product/`

SEO title: **Singing Bowls Bali | Handmade Sound Healing Instruments**
Meta description: **Looking for authentic singing bowls in Bali? Discover handcrafted singing bowls and sacred sound healing instruments in Ubud.**
og:image: `singing-YleWM5RbVMilQZlq.jpg`

| # | Section | Verbatim content | Priority |
|---|---|---|---|
| 1 | Hero (image bg) | Eyebrow THE SPIRIT SOUND GALLERY · **H1: Sacred Sound Collection** · "Explore handcrafted singing bowls, gongs, and sacred sound instruments thoughtfully selected to support meditation, mindfulness, and personal exploration." · Button **Explore Collection** → `#collection` (anchor exists; scrolls to card grid) | Must |
| 2 | Intro | Label **THOUGHTFULLY CURATED** (styled h2) · H2 **Instruments Chosen With Intention** · "Each instrument carries its own character, thoughtfully selected to create a more meaningful connection through sound." | Keep |
| 3 | Collection cards (`#collection`) | **SINGING BOWL** / H3 **Handmade Singing Bowl** — "A handcrafted singing bowl carefully selected for its resonance, character, and timeless beauty." · **GENTA** / H3 **Traditional Tibetan Genta** — "A traditional ritual bell crafted with intricate details, valued for its symbolism and elegant presence." · **STATUE** / H3 **Ganesha and Others Statue** — "A curated collection of sacred statues, celebrating spiritual symbolism and timeless craftsmanship." | Must (heading grammar: Review) |

No prices, no individual product pages, no cart/checkout, no enquiry button per item.

## F. Our Journey `/our-journey/`

SEO title: **Our Sound Healing Journey | The Spirit Sound Gallery Bali**
Meta description: **Learn how our journey with sound healing inspired us to share peace, mindfulness, and sacred sound experiences through The Spirit Sound Gallery Bali.**

| # | Section | Verbatim content | Priority |
|---|---|---|---|
| 1 | Hero | Eyebrow THE SPIRIT SOUND GALLERY · **H1: Journey Through Sound** · "This journey began with a simple curiosity, and slowly unfolded into a deeper connection with stillness, presence, and the quiet power of sound." | Must |
| 2 | Where It All Began (image left) | H2 **Where It All Began** · P1 "The journey began quietly, without a clear intention, starting from a simple curiosity toward sound and the feeling it created within. At first, it was only something to listen to, soft tones and gentle vibrations that felt calming without needing explanation." · P2 "Over time, something began to shift. Sound was no longer just heard, it was felt. It became a space to pause, to breathe, and to be present in a way that felt natural and unforced." | Must |
| 3 | When Sound Became Something More | H2 **When Sound Became Something More** · "There was a moment when everything felt different, when the vibration stayed longer than the sound itself. It was no longer about listening, but about feeling what was happening within. In a world that often moves too fast, these moments created space, not to escape, but to return to stillness, awareness, and something simple yet deeply grounding." | Keep |
| 4 | Quote banner (image bg) | H2 **Silence is not empty. It is where everything begins.** (rendered on two lines) | Keep |
| 5 | Living With Sound | H2 **Living With Sound** · H3 **Presence** — "Sound became a way to slow down, a gentle reminder to stay in the moment without rushing forward." · H3 **Awareness** — "Each tone revealed something different, not something to analyze, but something to simply notice." · H3 **Balance** — "In the simplicity of sound, there was balance, not perfect, but enough to feel grounded again." | Keep |
| 6 | Space to Experience (image right) | H2 **Space to Experience** (source contains a trailing zero-width space) · P1 "This space was never created as a place to teach or to guide, but simply as a place to experience. For those who feel curious, you are welcome to step in, to listen, to feel, and to discover what resonates with you." · P2 "There is no right way and no expectation, only a quiet invitation to be present." | Must (key positioning: not a class/teaching space) |
| 7 | Quiet Reflection | H2 **Quiet Reflection** · "In the end, this journey was never about sound itself, but about what sound reveals. It is a space within that is often forgotten, a stillness that has always been there. And perhaps, all it takes is a single vibration to remember it again." | Low (could merge with §3) |

## G. Contact Us `/contact-us/`

SEO title: **Contact The Spirit Sound Gallery Bali | Get In Touch**
Meta description: **Get in touch with The Spirit Sound Gallery Bali. Contact us for inquiries about singing bowls, sacred instruments, and sound healing experiences in Ubud.**

| # | Section | Verbatim content | Priority |
|---|---|---|---|
| 1 | Hero | Eyebrow THE SPIRIT SOUND GALLERY · **H1: Get in Touch With Us** · "If you have any questions or simply wish to connect, we are here to listen. Feel free to reach out and we will respond with care." | Must |
| 2 | A Simple Way to Connect | H2 **A Simple Way to Connect** · "Whether you are curious about sound, seeking guidance, or simply want to ask something, this space is open for you. Every message is received with attention and care." | Low (overlaps hero) |
| 3 | Contact cards | H3 **WhatsApp** — "Reach us directly for a quicker response and personal assistance." — **+62 812 3944 292** → wa.me · H3 **Email** — "Send us your message and we will respond thoughtfully." — **domagoes@gmail.com** → mailto · H3 **Visit Us** — "Experience the space and connect with sound in person." — **Ubud, Bali** → maps.app.goo.gl | Must |
| 4 | Send Us a Message | H2 **Send Us a Message** · "If you feel called to reach out, you can leave your message here. Whether it is a question, a thought, or something you wish to share, we will receive it with care." · WPForms form #288: **Name \*** (First, Last — required) · **Email \*** (required) · **Your Message** (textarea, optional) · **Submit** | Must |
| 5 | Visit Our Space in Ubud + map | Identical to Home §6 | Low (duplicate) |

## H. Testimonials (Home slider) — **Review before reuse**

Verbatim. Source of these reviews is not stated or linked (no Tripadvisor/Google attribution on the page). Do not reuse without business confirmation that they are genuine customer reviews.

| Name | Rating shown | Quote |
|---|---|---|
| Amelia Thompson | ★★★★★ | "A calm and meaningful place. I found an instrument that truly resonates with my practice." |
| Daniel Schneider | ★★★★★ | "Beautiful collection and a very welcoming space. I was able to explore the instruments and find what feels right for me." |
| Lena Hoffmann | ★★★★★ | "A unique experience in Ubud. The atmosphere is peaceful, and the instruments feel authentic and carefully selected." |
| Michael Carter | ★★★★★ | "You can really take your time here. I appreciated being able to try different singing bowls and feel the difference." |
| Sofia Martinez | ★★★★★ | "A simple yet special place. It's not just about buying, but about connecting with the sound." |

## I. Blog / editorial

- Only post: **"Hello world!"** (`/hello-world/`, WordPress default, 2026-04-18) — "Welcome to WordPress. This is your first post. Edit or delete it, then start writing!" It has 1 default WordPress comment + 3 **spam comments** with outbound links (letco.vn, cwwp.sublimarte.net, bhgm.x533863.com).
- Category archive `/category/blog/` lists only that post.
- **There is no real editorial content.** Nothing to migrate. Do not invent posts.

## J. Utility content

- 404 page: H1 "The page can't be found." / "It looks like nothing was found at this location." (theme default)
- Search results (`/?s=…`) work via WordPress but no search UI is exposed.

## K. Image alt text (media library, verbatim — reusable)

See the `alt_text` column in [04-assets-manifest.csv](04-assets-manifest.csv).

## L. Duplicated / repetitive content (for consolidation)

| Content | Occurrences |
|---|---|
| Address | Home visit block, Contact visit block, footer (short), Contact "Visit Us" card (city only) — 4× |
| Phone | Header button, Home, Contact card, Contact visit block, footer text, footer icon — 6× in 3 formats |
| "Visit Our Space in Ubud" section + map | Home and Contact — identical |
| Eyebrow "THE SPIRIT SOUND GALLERY" | Every hero (4×) plus header and footer |
| "curated / thoughtfully selected" phrasing | Hero, Journey teaser, Collection intro, Product hero, Product intro, footer — heavy repetition |
| Contact page intro | Hero paragraph + "A Simple Way to Connect" + form intro say the same thing 3× |
| Our Journey | "Where It All Began", "When Sound Became Something More" and "Quiet Reflection" overlap in meaning |
