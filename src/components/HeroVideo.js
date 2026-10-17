"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HeroVideo.module.css";

// Poster image always renders (it is the phone / reduced-motion / Save-Data fallback).
// Video is only attached on screens ≥ 768px when motion is welcome: 720p (1.4 MB) up to 1399px, 1080p (2.4 MB) above.
export default function HeroVideo() {
  const videoRef = useRef(null);
  const [src, setSrc] = useState(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = navigator.connection?.saveData === true;
    const large = window.matchMedia("(min-width: 1400px)");
    const update = () =>
      setSrc(
        wide.matches && !calm.matches && !saveData
          ? `/media/video/singing-bowl-${large.matches ? 1080 : 720}.mp4`
          : null
      );
    update();
    const queries = [wide, calm, large];
    queries.forEach((q) => q.addEventListener("change", update));
    return () => queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!src || !v) return;
    v.play().catch(() => setPlaying(false));
  }, [src]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.media}
        src="/media/video/poster-1600.webp"
        srcSet="/media/video/poster-800.webp 800w, /media/video/poster-1600.webp 1600w, /media/video/poster-1920.webp 1920w"
        sizes="100vw"
        width="1920"
        height="1080"
        alt=""
        fetchPriority="high"
      />
      {src && (
        <>
          <video
            ref={videoRef}
            className={`${styles.media} ${styles.video}`}
            data-playing={playing ? "" : undefined}
            src={src}
            poster="/media/video/poster-1920.webp"
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
          <button type="button" className={styles.control} onClick={toggle}>
            {playing ? "Pause video" : "Play video"}
          </button>
        </>
      )}
    </>
  );
}
