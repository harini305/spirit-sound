// Verified business facts and page copy. Source: docs/source-audit/03-content-inventory.md
// Copy is verbatim from the live site unless noted; nothing here is invented.

export const SITE_URL = "https://spiritsoundbali.com";

export const business = {
  name: "The Spirit Sound Gallery",
  tagline: "Spiritual Sound Healing and Singing Bowl Art Gallery in Bali",
  address: {
    street: "Jl. Hanoman No.65",
    locality: "Padang Tegal Kelod",
    full: "Jl. Hanoman No.65, Padang Tegal Kelod, Kecamatan Ubud, Kabupaten Gianyar, Bali 80571",
    short: "Jl. Hanoman No.65, Padang Tegal Kelod, Ubud 80571",
    city: "Ubud",
    region: "Bali",
    postalCode: "80571",
    country: "ID",
  },
  geo: { lat: -8.5170239, lng: 115.2636174 },
  phoneDisplay: "+62 812 394 4292",
  phoneE164: "+628123944292",
  whatsapp: "https://wa.me/628123944292",
  email: "domagoes@gmail.com",
  instagram: "https://www.instagram.com/spiritsoundubud/",
  instagramHandle: "@spiritsoundubud",
  tripadvisor:
    "https://www.tripadvisor.com/Attraction_Review-g297701-d26133928-Reviews-The_Spirit_Sound_Gallery_Bali-Ubud_Gianyar_Regency_Bali.html",
  mapsLink: "https://maps.app.goo.gl/cFXxxBPLoBPrcavt9",
  mapsEmbed: "https://maps.google.com/maps?q=The%20Spirit%20Sound%20Gallery&t=m&z=14&output=embed&iwloc=near",
  // No verified Facebook page exists (audit C5) — intentionally omitted.
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/product/", label: "Collection" },
  { href: "/our-journey/", label: "Our Journey" },
  { href: "/contact-us/", label: "Contact" },
];

export const seo = {
  home: {
    title: "Sound Healing Ubud | Singing Bowls & Sacred Instruments Bali",
    description:
      "Explore a unique collection of singing bowls and sacred instruments in Ubud, Bali. Experience the power of sound healing at The Spirit Sound Gallery.",
    path: "/",
    og: "/media/og/home.jpg",
  },
  product: {
    title: "Singing Bowls Bali | Handmade Sound Healing Instruments",
    description:
      "Looking for authentic singing bowls in Bali? Discover handcrafted singing bowls and sacred sound healing instruments in Ubud.",
    path: "/product/",
    og: "/media/og/product.jpg",
  },
  journey: {
    title: "Our Sound Healing Journey | The Spirit Sound Gallery Bali",
    description:
      "Learn how our journey with sound healing inspired us to share peace, mindfulness, and sacred sound experiences through The Spirit Sound Gallery Bali.",
    path: "/our-journey/",
    og: "/media/og/our-journey.jpg",
  },
  contact: {
    title: "Contact The Spirit Sound Gallery Bali | Get In Touch",
    description:
      "Get in touch with The Spirit Sound Gallery Bali. Contact us for inquiries about singing bowls, sacred instruments, and sound healing experiences in Ubud.",
    path: "/contact-us/",
    og: "/media/og/contact-us.jpg",
  },
};

// Alt text describes what is visible in each photograph (rewritten from the media-library alt text,
// which was keyword-stuffed). Captions are short factual descriptions — no materials or origins claimed.
export const photos = {
  founderPortrait: {
    key: "founder-portrait",
    alt: "The founder of The Spirit Sound Gallery seated on the floor, holding a singing bowl and smiling",
  },
  bowlsBuddhasFlags: {
    key: "bowls-buddhas-flags",
    alt: "Engraved brass singing bowls with wooden strikers, small Buddha figures and prayer flags on a display table",
  },
  bowlsDisplayTable: {
    key: "bowls-display-table",
    alt: "Singing bowls, hand bells and a The Spirit Sound Gallery business card arranged on a table above prayer flags",
  },
  singingBowlGenta: {
    key: "singing-bowl-genta",
    alt: "Close-up of an engraved singing bowl on a cushion with a genta bell in front of it",
  },
  statuesShelf: {
    key: "statues-shelf",
    alt: "A shelf of brass statues, including a dancing Ganesha and Buddha heads, among bells and bowls",
  },
  galleryVisitors: {
    key: "gallery-visitors",
    alt: "Two visitors trying a singing bowl with the host inside the gallery",
  },
  gentaBells: {
    key: "genta-bells",
    alt: "Brass genta bells standing in warm light",
  },
  bowlBellCard: {
    key: "bowl-bell-card",
    alt: "A singing bowl and bell beside a The Spirit Sound Gallery business card",
  },
  lakshmiStatue: {
    key: "lakshmi-statue",
    alt: "A brass statue of a four-armed deity in warm light",
  },
  ganeshaStatue: {
    key: "ganesha-statue",
    alt: "Close-up of a brass Ganesha statue",
  },
};

export const home = {
  hero: {
    title: "Where Sound Becomes Experience",
    text: "Discover a curated collection of Singing Bowls, Gongs, and Sound Healing instruments in Ubud - Bali, thoughtfully selected to support your personal journey through meditation, mindfulness, and sacred sound.",
    cta: { label: "Explore the Collection", href: "/product/" },
  },
  story: {
    title: "Journey Guided by Sound",
    lead: "The Spirit Sound Gallery began as a personal exploration into the world of sound and awareness.",
    paragraphs: [
      "What started as curiosity gradually unfolded into a deeper understanding of how vibration can influence presence, balance, and connection.",
      "Today, we offer a curated selection of singing bowls, gongs, and sound healing instruments, chosen not only for their form, but for the feeling they carry.",
    ],
    cta: { label: "Read Our Story", href: "/our-journey/" },
  },
  collection: {
    title: "Thoughtfully Curated Collection",
    text: "Each piece is selected with intention, focusing on quality, character, and resonance, supporting both meditation and sound healing practices.",
    // Third category shown as "Statues" (Product page naming) because the only photograph is of statues.
    // The Home page's original "Accessories" label had no matching imagery (audit C1).
    items: [
      { name: "Singing Bowls", text: "Grounding tones for meditation and inner awareness.", photo: "bowlsDisplayTable", anchor: "singing-bowls" },
      { name: "Genta", text: "Expansive vibrations that transform space and energy.", photo: "gentaBells", anchor: "genta" },
      { name: "Statues", text: "A curated collection of sacred statues, celebrating spiritual symbolism and timeless craftsmanship.", photo: "statuesShelf", anchor: "statues" },
    ],
    cta: { label: "View All Products", href: "/product/" },
  },
  presence: {
    title: "Experience the Sound in Presence",
    text: "Visitors are welcome to explore and feel the instruments directly in our space. Each interaction becomes a quiet moment of discovery and connection.",
  },
  visit: {
    title: "Visit Our Space in Ubud",
    paragraphs: [
      "Located in the heart of Ubud, our space offers a calm and welcoming environment for those who wish to explore sound more closely.",
      "We invite you to visit, take your time, and experience the instruments in a simple and personal way.",
    ],
  },
  closing: {
    title: "Discover the Sound That Resonates With You",
    text: "Take your time to explore our collection, or visit our space in Ubud to experience the instruments in person.",
  },
};

export const product = {
  hero: {
    title: "Sacred Sound Collection",
    text: "Explore handcrafted singing bowls, gongs, and sacred sound instruments thoughtfully selected to support meditation, mindfulness, and personal exploration.",
    cta: { label: "Explore Collection", href: "#collection" },
  },
  intro: {
    title: "Instruments Chosen With Intention",
    text: "Each instrument carries its own character, thoughtfully selected to create a more meaningful connection through sound.",
  },
  items: [
    {
      id: "singing-bowls",
      label: "Singing Bowl",
      title: "Handmade Singing Bowl",
      text: "A handcrafted singing bowl carefully selected for its resonance, character, and timeless beauty.",
    },
    {
      id: "genta",
      label: "Genta",
      title: "Traditional Tibetan Genta",
      text: "A traditional ritual bell crafted with intricate details, valued for its symbolism and elegant presence.",
    },
    {
      id: "statues",
      label: "Statue",
      // Verbatim heading; grammar flagged to the owner (audit C7), not silently rewritten
      title: "Ganesha and Others Statue",
      text: "A curated collection of sacred statues, celebrating spiritual symbolism and timeless craftsmanship.",
    },
  ],
};

export const journey = {
  hero: {
    title: "Journey Through Sound",
    text: "This journey began with a simple curiosity, and slowly unfolded into a deeper connection with stillness, presence, and the quiet power of sound.",
  },
  began: {
    title: "Where It All Began",
    paragraphs: [
      "The journey began quietly, without a clear intention, starting from a simple curiosity toward sound and the feeling it created within. At first, it was only something to listen to, soft tones and gentle vibrations that felt calming without needing explanation.",
      "Over time, something began to shift. Sound was no longer just heard, it was felt. It became a space to pause, to breathe, and to be present in a way that felt natural and unforced.",
    ],
  },
  more: {
    title: "When Sound Became Something More",
    text: "There was a moment when everything felt different, when the vibration stayed longer than the sound itself. It was no longer about listening, but about feeling what was happening within. In a world that often moves too fast, these moments created space, not to escape, but to return to stillness, awareness, and something simple yet deeply grounding.",
  },
  living: {
    title: "Living With Sound",
    pillars: [
      { title: "Presence", text: "Sound became a way to slow down, a gentle reminder to stay in the moment without rushing forward." },
      { title: "Awareness", text: "Each tone revealed something different, not something to analyze, but something to simply notice." },
      { title: "Balance", text: "In the simplicity of sound, there was balance, not perfect, but enough to feel grounded again." },
    ],
  },
  space: {
    title: "Space to Experience",
    paragraphs: [
      "This space was never created as a place to teach or to guide, but simply as a place to experience. For those who feel curious, you are welcome to step in, to listen, to feel, and to discover what resonates with you.",
      "There is no right way and no expectation, only a quiet invitation to be present.",
    ],
  },
  reflection: {
    title: "Quiet Reflection",
    text: "In the end, this journey was never about sound itself, but about what sound reveals. It is a space within that is often forgotten, a stillness that has always been there. And perhaps, all it takes is a single vibration to remember it again.",
  },
};

export const contact = {
  hero: {
    title: "Get in Touch With Us",
    text: "If you have any questions or simply wish to connect, we are here to listen. Feel free to reach out and we will respond with care.",
  },
  channels: {
    whatsapp: "Reach us directly for a quicker response and personal assistance.",
    email: "Send us your message and we will respond thoughtfully.",
    visit: "Experience the space and connect with sound in person.",
  },
  form: {
    title: "Send Us a Message",
    text: "Whether it is a question, a thought, or something you wish to share, we will receive it with care.",
  },
};
