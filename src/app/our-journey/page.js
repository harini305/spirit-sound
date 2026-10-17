import Link from "next/link";
import Picture from "@/components/Picture";
import ScrollMotion from "@/components/ScrollMotion";
import { journey, seo } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import s from "./page.module.css";

export const metadata = pageMetadata(seo.journey);

export default function JourneyPage() {
  return (
    <ScrollMotion>
      {/* Opening + where it began */}
      {/* Split: text on the page grid (left), portrait running to the right screen edge */}
      <section className={s.opening} aria-labelledby="page-title">
        <div className={s.openingBody}>
          <div className={s.openingText}>
            <h1 id="page-title" data-motion="intro">
              {journey.hero.title}
            </h1>
            <p className="lead" data-motion="intro">
              {journey.hero.text}
            </p>
          </div>
          <div className={s.began} data-motion="stagger">
            <h2 id="began-title">{journey.began.title}</h2>
            {journey.began.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className={`frame ${s.portrait}`} data-motion="parallax">
          <Picture photo="founderPortrait" sizes="(min-width: 900px) 50vw, 100vw" priority style={{ objectPosition: "50% 20%" }} />
        </div>
      </section>

      {/* When sound became something more + quiet reflection: photograph left, text panel right */}
      <section className={s.more} aria-labelledby="more-title">
        <div className={`frame ${s.moreMedia}`} data-motion="parallax">
          <Picture photo="bowlsDisplayTable" sizes="(min-width: 900px) 50vw, 100vw" style={{ objectPosition: "40% 55%" }} />
        </div>
        <div className={s.moreBody} data-motion="stagger">
          <h2 id="more-title">{journey.more.title}</h2>
          <p className={s.moreText}>{journey.more.text}</p>
          <div className={s.reflection}>
            <h3>{journey.reflection.title}</h3>
            <p>{journey.reflection.text}</p>
          </div>
        </div>
      </section>

      {/* Living with sound */}
      <section className={`section ${s.living}`} aria-labelledby="living-title">
        <div className="wrap grid">
          <h2 id="living-title" className={s.livingTitle} data-motion="reveal">
            {journey.living.title}
          </h2>
          <ul className={s.pillars} data-motion="stagger">
            {journey.living.pillars.map((p) => (
              <li key={p.title}>
                <h3 className={s.pillarTitle}>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Space to experience — compact: it shares the last screen with the footer */}
      <section className={`section fit-last fit-last--center ${s.space}`} aria-labelledby="space-title">
        <div className="wrap grid">
          <figure className={s.spacePair} data-motion="stagger">
            <div className="frame">
              <Picture photo="galleryVisitors" sizes="(min-width: 900px) 26vw, 50vw" style={{ objectPosition: "45% 50%" }} />
            </div>
            <div className="frame">
              <Picture photo="bowlBellCard" sizes="(min-width: 900px) 26vw, 50vw" />
            </div>
          </figure>
          <div className={s.spaceText} data-motion="stagger">
            <h2 id="space-title">{journey.space.title}</h2>
            {journey.space.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="actions">
              <Link href="/contact-us/" className="button">
                Visit the gallery
              </Link>
              <Link href="/product/" className="text-link">
                View the collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ScrollMotion>
  );
}
