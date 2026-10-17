// Transcodes the 53 MB 4K hero video into a web delivery file plus poster frames.
// The original in docs/source-audit/assets/original/video/ is read only.
// Requires an ffmpeg binary: on PATH, or set FFMPEG_PATH. Run: npm run media:video
import { execFileSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "docs/source-audit/assets/original/video/Singing-Bowl.mp4");
const OUT = path.join(ROOT, "public/media/video");
const FFMPEG = process.env.FFMPEG_PATH || "ffmpeg";
const POSTER_AT = "10.0";

const ff = (args) => execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
const kb = async (f) => Math.round((await stat(f)).size / 102.4) / 10;

await mkdir(OUT, { recursive: true });

// H.264 renditions, no audio track, moov atom at the front for quick start.
// 720p for tablets/laptops, 1080p only for viewports ≥ 1400px (the hero is full-bleed).
const renditions = [
  { name: "singing-bowl-720.mp4", width: 1280, crf: 26 },
  { name: "singing-bowl-1080.mp4", width: 1920, crf: 27 },
];
for (const r of renditions) {
  ff([
    "-i", SRC,
    "-vf", `scale=${r.width}:-2:flags=lanczos,fps=25`,
    "-c:v", "libx264", "-preset", "slow", "-crf", String(r.crf), "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-an", "-movflags", "+faststart",
    path.join(OUT, r.name),
  ]);
}

// Poster frame → WebP at three widths (phone fallback, desktop, wide desktop)
const png = path.join(OUT, "poster-src.png");
ff(["-ss", POSTER_AT, "-i", SRC, "-frames:v", "1", "-vf", "scale=1920:-2:flags=lanczos", png]);
for (const w of [800, 1600, 1920]) {
  await sharp(png).resize({ width: w }).webp({ quality: 74 }).toFile(path.join(OUT, `poster-${w}.webp`));
}
await (await import("node:fs/promises")).rm(png);

for (const r of renditions) console.log(`${r.name} ${await kb(path.join(OUT, r.name))} KB`);
for (const w of [800, 1600, 1920]) console.log(`poster-${w}.webp ${await kb(path.join(OUT, `poster-${w}.webp`))} KB`);
