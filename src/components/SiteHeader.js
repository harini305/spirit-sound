"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { business, nav } from "@/content/site";
import styles from "./SiteHeader.module.css";

const isActive = (pathname, href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Close the menu whenever the route changes
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.matchMedia("(min-width: 1100px)").matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={styles.header} data-scrolled={scrolled || open ? "" : undefined}>
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${business.name} — home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/brand/mark-black.png" alt="" width="34" height="40" className={styles.mark} />
          <span className={styles.wordmark}>{business.name}</span>
        </Link>

        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.link}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={business.whatsapp} className={`button ${styles.cta}`} target="_blank" rel="noopener noreferrer">
            WhatsApp<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.toggleLabel}>{open ? "Close" : "Menu"}</span>
          <span className={styles.toggleIcon} aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" ref={panelRef} className={styles.panel} hidden={!open}>
        <nav aria-label="Main (mobile)" className="wrap">
          <ul className={styles.panelLinks}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.panelLink}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.panelContact}>
            <a href={business.whatsapp} className="button" target="_blank" rel="noopener noreferrer">
              WhatsApp {business.phoneDisplay}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a href={`mailto:${business.email}`} className="text-link">
              {business.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
