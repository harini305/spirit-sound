"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/*
  Reads data-motion attributes inside its own subtree:
    intro     – opening lines of a page, rise in on load (staggered)
    reveal    – element settles in when it enters the viewport
    stagger   – direct children settle in one after another
    parallax  – the frame's <img> drifts a few percent while scrolling
  Everything is authored with gsap.from(), so the HTML is fully visible without JS.
  useGSAP reverts every tween and ScrollTrigger on unmount (route change).
*/
export default function ScrollMotion({ children, className }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(scope);
        const ease = "power3.out";

        const intro = q('[data-motion~="intro"]');
        if (intro.length) {
          gsap.fromTo(intro, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1.1, ease, stagger: 0.12, delay: 0.15 });
        }

        // Already on screen at load → play now. ScrollTrigger would wait for the first scroll,
        // leaving visible content hidden until the page moves. Below the fold → play on entry.
        const onScreen = (el) => el.getBoundingClientRect().top < window.innerHeight;
        const play = (el) => (onScreen(el) ? { delay: 0.2 } : { scrollTrigger: { trigger: el, start: "top bottom", once: true } });

        q('[data-motion~="reveal"]').forEach((el) => {
          gsap.from(el, { autoAlpha: 0, y: 32, duration: 1, ease, ...play(el) });
        });

        q('[data-motion~="stagger"]').forEach((el) => {
          gsap.from(el.children, { autoAlpha: 0, y: 28, duration: 0.9, ease, stagger: 0.14, ...play(el) });
        });

        q('[data-motion~="parallax"]').forEach((el) => {
          const img = el.querySelector("img");
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: -5 },
            { yPercent: 5, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } }
          );
        });
      });

      // Web fonts change line breaks → recalculate trigger positions once they are in
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      return () => mm.revert();
    },
    { scope }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
