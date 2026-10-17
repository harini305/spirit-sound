"use client";

import { useEffect, useRef } from "react";

// Publishes the footer's rendered height as --footer-h so each page's final section can be sized
// to exactly fill the last screen (final section + footer = one viewport below the sticky header).
export default function FooterSize() {
  const ref = useRef(null);

  useEffect(() => {
    const footer = ref.current?.closest("footer");
    if (!footer) return;
    const root = document.documentElement;
    const sync = () => root.style.setProperty("--footer-h", `${footer.getBoundingClientRect().height}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  return <span ref={ref} hidden />;
}
