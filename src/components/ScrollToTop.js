"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

// Every page opens at its top:
// - after a route change, jump straight to the top (unless the URL targets an #anchor);
// - clicking a link to the page you are already on scrolls smoothly back to the top.
export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.location.hash) return;
    toTop();
    // Run again once the new page has committed and painted, in case the router or the browser
    // re-applied the previous scroll position after the first jump.
    const raf = requestAnimationFrame(() => requestAnimationFrame(toTop));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  useEffect(() => {
    // Capture phase: runs before Next's <Link> handler marks the event as handled.
    const onClick = (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && !url.hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
