import Link from "next/link";
import { business, nav } from "@/content/site";
import FooterSize from "./FooterSize";
import styles from "./SiteFooter.module.css";

const ext = { target: "_blank", rel: "noopener noreferrer" };
const NewTab = () => <span className="visually-hidden"> (opens in a new tab)</span>;

export default function SiteFooter() {
  return (
    <footer className={`on-dark ${styles.footer}`}>
      <div className={`wrap ${styles.grid}`}>
        <Link href="/" className={styles.brand} aria-label={`${business.name} — home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/mark-white.png" alt="" width="34" height="40" loading="lazy" />
          <span>{business.name}</span>
        </Link>

        <nav aria-label="Footer" className={styles.col}>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <address className={styles.col}>
          <ul>
            <li>
              <a href={business.mapsLink} {...ext}>
                {business.address.street}, Ubud, Bali
                <NewTab />
              </a>
            </li>
            <li>
              <a href={business.whatsapp} {...ext}>
                WhatsApp {business.phoneDisplay}
                <NewTab />
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </li>
          </ul>
        </address>

        <ul className={styles.col} aria-label="Social">
          <li>
            <a href={business.instagram} {...ext}>
              Instagram
              <NewTab />
            </a>
          </li>
          <li>
            <a href={business.tripadvisor} {...ext}>
              Tripadvisor
              <NewTab />
            </a>
          </li>
        </ul>
      </div>
      <div className="wrap">
        <p className={styles.legal}>© 2026 {business.name}. All rights reserved.</p>
      </div>
      <FooterSize />
    </footer>
  );
}
