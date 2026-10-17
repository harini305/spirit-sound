/* eslint-disable @next/next/no-img-element -- next/image is unoptimized here; srcset is pre-generated */
import manifest from "@/content/media-manifest.json";
import { photos } from "@/content/site";

// Responsive <img> from the generated media manifest. Files never exceed the source width.
export default function Picture({ photo, sizes = "100vw", priority = false, className, style }) {
  const { key, alt } = photos[photo];
  const m = manifest[key];
  const largest = m.widths[m.widths.length - 1];
  const srcSet = m.widths.map((w) => `/media/img/${key}-${w}.webp ${w}w`).join(", ");
  return (
    <img
      className={className}
      style={style}
      src={`/media/img/${key}-${largest}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
