// Generates delivery images in public/media/ from the untouched originals in
// docs/source-audit/assets/original/. Run: npm run media:images
import sharp from "sharp";
import { mkdir, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "docs/source-audit/assets/original");
const OUT = path.join(ROOT, "public/media");
const APP = path.join(ROOT, "src/app");
const PAPER = "#F5F1EB";

// key → source file + the widths it is ever displayed at (capped at the source width; never upscaled)
const photos = {
  "founder-portrait": { src: "images/about-us-AQExJVgWMbfjwRjr.avif", widths: [480, 800, 1000] },
  "bowls-buddhas-flags": { src: "images/whatsapp-image-2022-07-28-at-10.56.14-m6LZvrB2n1IEjbQn.jpg", widths: [640, 1024, 1600] },
  "bowls-display-table": { src: "images/whatsapp-image-2022-07-28-at-10.56.14-2-mnlW35R4MqCpaEDZ.jpg", widths: [640, 1024, 1600] },
  "singing-bowl-genta": { src: "images/singing-YleWM5RbVMilQZlq.jpg", widths: [640, 1024, 1600] },
  "statues-shelf": { src: "images/ganesh-A85eprO9q1h3EDK1.jpg", widths: [640, 1024, 1600] },
  "gallery-visitors": { src: "images/contact-mePxLLj1goco0eD5.jpg", widths: [400, 650] },
  "genta-bells": { src: "images/genta-AE0PpvJWXpHX7rlo.avif", widths: [480, 768] },
  "bowl-bell-card": { src: "images/bowl2-YBg7pyNw81T0NPJR.avif", widths: [480, 768] },
  "lakshmi-statue": { src: "images/lakshmi-mk3vD5RGMZHqe4NQ.avif", widths: [480, 768] },
  "ganesha-statue": { src: "images/ganesha-m5KMvr1kD9IrGX01.avif", widths: [375] },
};

const og = {
  home: { src: "images/whatsapp-image-2022-07-28-at-10.56.14-m6LZvrB2n1IEjbQn.jpg", position: "centre" },
  product: { src: "images/singing-YleWM5RbVMilQZlq.jpg", position: "centre" },
  "our-journey": { src: "images/about-us-AQExJVgWMbfjwRjr.avif", position: "north" },
  "contact-us": { src: "images/whatsapp-image-2022-07-28-at-10.56.14-2-mnlW35R4MqCpaEDZ.jpg", position: "centre" },
};

const kb = async (f) => Math.round((await stat(f)).size / 102.4) / 10;

async function run() {
  await mkdir(path.join(OUT, "img"), { recursive: true });
  await mkdir(path.join(OUT, "og"), { recursive: true });
  await mkdir(path.join(OUT, "brand"), { recursive: true });
  const manifest = {};
  const report = [];

  for (const [key, { src, widths }] of Object.entries(photos)) {
    const input = path.join(SRC, src);
    const meta = await sharp(input).metadata();
    const usable = widths.filter((w) => w <= meta.width);
    const height = (w) => Math.round((meta.height / meta.width) * w);
    manifest[key] = { width: meta.width, height: meta.height, widths: usable };
    for (const w of usable) {
      const file = path.join(OUT, "img", `${key}-${w}.webp`);
      await sharp(input).resize({ width: w }).webp({ quality: 78, effort: 6 }).toFile(file);
      report.push(`${key}-${w}.webp ${w}x${height(w)} ${await kb(file)} KB`);
    }
  }

  for (const [key, { src, position }] of Object.entries(og)) {
    const file = path.join(OUT, "og", `${key}.jpg`);
    await sharp(path.join(SRC, src))
      .resize(1200, 630, { fit: "cover", position })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(file);
    report.push(`og/${key}.jpg 1200x630 ${await kb(file)} KB`);
  }

  // Logo mark: trim transparent padding, export at 2x the largest display height (56px)
  for (const tone of ["Black", "White"]) {
    const file = path.join(OUT, "brand", `mark-${tone.toLowerCase()}.png`);
    await sharp(path.join(SRC, `logos/cropped-Logo-Spirit-Sound-${tone}.png`))
      .trim()
      .resize({ height: 112 })
      .png({ compressionLevel: 9, palette: true })
      .toFile(file);
    report.push(`brand/mark-${tone.toLowerCase()}.png ${await kb(file)} KB`);
  }

  // App icons from the icon mark (the old favicon used the illegible text lockup)
  const markBuf = await sharp(path.join(SRC, "logos/cropped-Logo-Spirit-Sound-Black.png")).trim().toBuffer();
  for (const [name, size] of [["icon.png", 192], ["apple-icon.png", 180]]) {
    const inner = Math.round(size * 0.68);
    const mark = await sharp(markBuf).resize({ width: inner, height: inner, fit: "inside" }).toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: PAPER } })
      .composite([{ input: mark, gravity: "centre" }])
      .png({ compressionLevel: 9 })
      .toFile(path.join(APP, name));
    report.push(`app/${name} ${size}x${size} ${await kb(path.join(APP, name))} KB`);
  }

  await writeFile(path.join(ROOT, "src/content/media-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(report.join("\n"));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
