import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import ScrollMotion from "@/components/ScrollMotion";
import { business, contact, home, seo } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import s from "./page.module.css";

export const metadata = pageMetadata(seo.contact);

const ext = { target: "_blank", rel: "noopener noreferrer" };
const NewTab = () => <span className="visually-hidden"> (opens in a new tab)</span>;

export default function ContactPage() {
  return (
    <ScrollMotion>
      <section className={s.head} aria-labelledby="page-title">
        <div className="wrap grid">
          <h1 id="page-title" className={s.title} data-motion="intro">
            {contact.hero.title}
          </h1>
          <p className={`lead ${s.headText}`} data-motion="intro">
            {contact.hero.text}
          </p>
        </div>
      </section>

      {/* Split: channels on the page grid (left), form panel running to the right screen edge */}
      <section className={s.main} aria-label="Ways to reach us">
        <div className={s.channelsCol}>
          <ul className={s.channels} data-motion="stagger">
            <li>
              <h2 className={s.channelTitle}>WhatsApp</h2>
              <p>{contact.channels.whatsapp}</p>
              <a href={business.whatsapp} className={s.channelLink} {...ext}>
                {business.phoneDisplay}
                <NewTab />
              </a>
            </li>
            <li>
              <h2 className={s.channelTitle}>Email</h2>
              <p>{contact.channels.email}</p>
              <a href={`mailto:${business.email}`} className={s.channelLink}>
                {business.email}
              </a>
            </li>
            <li>
              <h2 className={s.channelTitle}>Visit us</h2>
              <p>{contact.channels.visit}</p>
              <address className={s.address}>{business.address.full}</address>
              <a href={business.mapsLink} className={s.channelLink} {...ext}>
                Get directions
                <NewTab />
              </a>
            </li>
            <li>
              <h2 className={s.channelTitle}>Follow</h2>
              <div className={s.social}>
                <a href={business.instagram} className={s.channelLink} {...ext}>
                  Instagram {business.instagramHandle}
                  <NewTab />
                </a>
                <a href={business.tripadvisor} className={s.channelLink} {...ext}>
                  Tripadvisor
                  <NewTab />
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className={s.formPanel} data-motion="reveal">
          <div className={s.formInner}>
            <h2 className={s.formTitle}>{contact.form.title}</h2>
            <p className={s.formIntro}>{contact.form.text}</p>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Split: visit text (left), map running to the right screen edge */}
      <section className={`fit-last ${s.visit}`} aria-labelledby="visit-title">
        <div className={s.visitText} data-motion="reveal">
          <h2 id="visit-title">{home.visit.title}</h2>
          {home.visit.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <a href={business.mapsLink} className="button button--ghost" {...ext}>
            Get directions
            <NewTab />
          </a>
        </div>
        <div className={s.visitMap}>
          <MapEmbed className={s.mapFill} />
        </div>
      </section>
    </ScrollMotion>
  );
}
