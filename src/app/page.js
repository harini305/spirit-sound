import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import Picture from "@/components/Picture";
import ScrollMotion from "@/components/ScrollMotion";
import { business, home, seo } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import s from "./page.module.css";

export const metadata = pageMetadata(seo.home);

const ext = { target: "_blank", rel: "noopener noreferrer" };

// Focal points for the 4:5 collection crops (wide originals are cropped around the subject)
const focus = { "singing-bowls": "42% 55%", genta: "62% 50%", statues: "52% 45%" };

export default function HomePage() {
  return (
    <ScrollMotion>
      {/* Hero — full-bleed film of the gallery, text aligned to the page grid */}
      <section className={`on-dark ${s.hero}`} aria-labelledby="hero-title">
        <HeroVideo />
        <div className={s.heroScrim} aria-hidden="true" />
        <div className={`wrap ${s.heroInner}`}>
          <div className={s.heroContent}>
            <h1 id="hero-title" className={s.heroTitle} data-motion="intro">
              {home.hero.title}
            </h1>
            <p className={s.heroText} data-motion="intro">
              {home.hero.text}
            </p>
            <div data-motion="intro">
              <Link href={home.hero.cta.href} className="button button--light">
                {home.hero.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story — full-height split: portrait to the screen edge, text panel with gallery details */}
      <section className={s.story} aria-labelledby="story-title">
        <div className={`frame ${s.storyMedia}`} data-motion="parallax">
          <Picture photo="founderPortrait" sizes="(min-width: 900px) 45vw, 100vw" style={{ objectPosition: "50% 22%" }} />
        </div>
        <div className={s.storyBody}>
          <div className={s.storyText} data-motion="stagger">
            <h2 id="story-title">{home.story.title}</h2>
            <p className={s.statement}>{home.story.lead}</p>
            {home.story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="actions">
              <Link href={home.story.cta.href} className="button">
                {home.story.cta.label}
              </Link>
              <Link href="/contact-us/" className="text-link">
                Visit the gallery
              </Link>
            </div>
          </div>
          <div className={s.storyStrip} data-motion="stagger">
            <div className="frame">
              <Picture photo="bowlsBuddhasFlags" sizes="(min-width: 900px) 24vw, 50vw" style={{ objectPosition: "55% 50%" }} />
            </div>
            <div className="frame">
              <Picture photo="ganeshaStatue" sizes="(min-width: 900px) 24vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Collection — three categories, one consistent row */}
      <section className={`section ${s.collection}`} aria-labelledby="collection-title">
        <div className="wrap">
          <div className={`grid ${s.sectionHead}`}>
            <h2 id="collection-title" className={s.headTitle} data-motion="reveal">
              {home.collection.title}
            </h2>
            <div className={s.headAside} data-motion="reveal">
              <p>{home.collection.text}</p>
              <Link href={home.collection.cta.href} className="text-link">
                {home.collection.cta.label}
              </Link>
            </div>
          </div>
          <ul className={s.cards} data-motion="stagger">
            {home.collection.items.map((item) => (
              <li key={item.anchor}>
                <Link href={`/product/#${item.anchor}`} className={s.card}>
                  <div className={`frame ${s.cardFrame}`}>
                    <Picture
                      photo={item.photo}
                      sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
                      style={{ objectPosition: focus[item.anchor] }}
                    />
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* In the gallery — heading row on the grid, then a full-bleed strip of four photographs, no gaps */}
      <section className={s.presence} aria-labelledby="presence-title">
        <div className={`wrap grid ${s.sectionHead} ${s.presenceHead}`}>
          <h2 id="presence-title" className={s.headTitle} data-motion="reveal">
            {home.presence.title}
          </h2>
          <div className={s.headAside} data-motion="reveal">
            <p>{home.presence.text}</p>
            <Link href="/contact-us/" className="text-link">
              Plan your visit
            </Link>
          </div>
        </div>
        <div className={s.strip} data-motion="stagger">
          <div className="frame">
            <Picture photo="galleryVisitors" sizes="(min-width: 900px) 25vw, 50vw" />
          </div>
          <div className="frame">
            <Picture photo="bowlBellCard" sizes="(min-width: 900px) 25vw, 50vw" style={{ objectPosition: "50% 60%" }} />
          </div>
          <div className="frame">
            <Picture photo="lakshmiStatue" sizes="(min-width: 900px) 25vw, 50vw" style={{ objectPosition: "62% 50%" }} />
          </div>
          <div className="frame">
            <Picture photo="singingBowlGenta" sizes="(min-width: 900px) 25vw, 50vw" style={{ objectPosition: "30% 50%" }} />
          </div>
        </div>
      </section>

      {/* Closing — invitation + visit details */}
      <section className={`section fit-last fit-last--center ${s.visit}`} aria-labelledby="visit-title">
        <div className="wrap grid">
          <div className={s.visitMain} data-motion="stagger">
            <h2 id="visit-title">{home.closing.title}</h2>
            <p className="lead">{home.closing.text}</p>
            <div className="actions">
              <Link href="/product/" className="button">
                Explore the Collection
              </Link>
              <a href={business.whatsapp} className="button button--ghost" {...ext}>
                Ask on WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <div className={s.visitAside} data-motion="reveal">
            <h3>{home.visit.title}</h3>
            <dl className={s.details}>
              <div>
                <dt>Address</dt>
                <dd>
                  <address>{business.address.full}</address>
                </dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>
                  <a href={business.whatsapp} {...ext}>
                    {business.phoneDisplay}
                    <span className="visually-hidden"> (WhatsApp, opens in a new tab)</span>
                  </a>
                  <br />
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                </dd>
              </div>
            </dl>
            <a href={business.mapsLink} className="text-link" {...ext}>
              Get directions<span className="visually-hidden"> (opens Google Maps in a new tab)</span>
            </a>
          </div>
        </div>
      </section>
    </ScrollMotion>
  );
}
