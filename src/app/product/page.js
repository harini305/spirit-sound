import Link from "next/link";
import Picture from "@/components/Picture";
import ScrollMotion from "@/components/ScrollMotion";
import { business, product, seo } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import s from "./page.module.css";

export const metadata = pageMetadata(seo.product);

const ext = { target: "_blank", rel: "noopener noreferrer" };

// Each category = one edge-to-edge panel: photograph on one half, text on the other.
const panels = [
  { photo: "singingBowlGenta", focus: "32% 50%", tone: "paper" },
  { photo: "gentaBells", focus: "58% 50%", tone: "deep", flip: true },
  { photo: "statuesShelf", focus: "52% 50%", tone: "paper", details: ["lakshmiStatue", "ganeshaStatue"] },
];

export default function ProductPage() {
  return (
    <ScrollMotion>
      {/* Opening: dark text panel with a category index (left), photograph to the screen edge (right) */}
      <section className={`on-dark ${s.hero}`} aria-labelledby="page-title">
        <div className={s.heroPanel}>
          <div className={s.heroText}>
            <h1 id="page-title" className={s.heroTitle} data-motion="intro">
              {product.hero.title}
            </h1>
            <p data-motion="intro">{product.hero.text}</p>
            <div data-motion="intro">
              <a href={product.hero.cta.href} className="button button--light">
                {product.hero.cta.label}
              </a>
            </div>
          </div>
          <nav aria-label="Categories in this collection" className={s.index}>
            <ol data-motion="stagger">
              {product.items.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={s.indexLink}>
                    <span className={`frame ${s.indexThumb}`}>
                      <Picture photo={panels[i].photo} sizes="96px" style={{ objectPosition: panels[i].focus }} />
                    </span>
                    <span className={s.indexText}>
                      <span className={s.indexLabel}>{item.label}</span>
                      <span className={s.indexTitle}>{item.title}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className={`frame ${s.heroMedia}`} data-motion="parallax">
          <Picture photo="bowlsBuddhasFlags" sizes="(min-width: 900px) 58vw, 100vw" priority style={{ objectPosition: "50% 55%" }} />
        </div>
      </section>

      {/* Intro band */}
      <section className={s.intro} aria-labelledby="intro-title">
        <div className="wrap grid">
          <h2 id="intro-title" className={s.introTitle} data-motion="reveal">
            {product.intro.title}
          </h2>
          <p className={`lead ${s.introText}`} data-motion="reveal">
            {product.intro.text}
          </p>
        </div>
      </section>

      {/* Categories — panels touch edge to edge, sides alternate */}
      <div id="collection">
        {product.items.map((item, i) => {
          const panel = panels[i];
          return (
            <section
              key={item.id}
              id={item.id}
              className={`${s.panel} ${panel.flip ? s.flip : ""} ${panel.tone === "deep" ? s.deep : ""}`}
              aria-labelledby={`${item.id}-title`}
            >
              <div className={`frame ${s.panelMedia}`} data-motion="parallax">
                <Picture photo={panel.photo} sizes="(min-width: 900px) 50vw, 100vw" style={{ objectPosition: panel.focus }} />
              </div>
              <div className={s.panelBody}>
                <div className={s.panelText} data-motion="stagger">
                  <p className={s.label}>{item.label}</p>
                  <h3 id={`${item.id}-title`} className={s.panelTitle}>
                    {item.title}
                  </h3>
                  <p>{item.text}</p>
                  <div className="actions">
                    <a href={business.whatsapp} className="button" {...ext}>
                      Enquire on WhatsApp<span className="visually-hidden"> about {item.title} (opens in a new tab)</span>
                    </a>
                    <a
                      href={`mailto:${business.email}?subject=${encodeURIComponent(`Enquiry: ${item.title}`)}`}
                      className="text-link"
                    >
                      Ask by email<span className="visually-hidden"> about {item.title}</span>
                    </a>
                  </div>
                </div>
                {panel.details && (
                  <div className={s.details} data-motion="stagger">
                    {panel.details.map((photo) => (
                      <div className="frame" key={photo}>
                        <Picture photo={photo} sizes="(min-width: 900px) 18vw, 45vw" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* Closing band: gongs (text only — no photographs exist) + visit invitation */}
      <section className={`fit-last fit-last--center ${s.close}`} aria-label="More instruments and visiting">
        <div className="wrap grid">
          <div className={s.closeCol} data-motion="reveal">
            <h2 id="gongs-title" className={s.closeTitle}>
              Gongs and other instruments
            </h2>
            <p>
              The gallery also holds gongs and other sound healing instruments. Ask us about them on WhatsApp or by email.
            </p>
            <div className="actions">
              <a href={business.whatsapp} className="button button--ghost" {...ext}>
                WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              <a href={`mailto:${business.email}`} className="text-link">
                {business.email}
              </a>
            </div>
          </div>
          <div className={`${s.closeCol} ${s.closeVisit}`} data-motion="reveal">
            <h2 className={s.closeTitle}>Hear them in person</h2>
            <p>
              Visitors are welcome to explore and feel the instruments directly in our space, at {business.address.street},
              Ubud.
            </p>
            <div className="actions">
              <Link href="/contact-us/" className="button">
                Plan your visit
              </Link>
              <Link href="/our-journey/" className="text-link">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ScrollMotion>
  );
}
