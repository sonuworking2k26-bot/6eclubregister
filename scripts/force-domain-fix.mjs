import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "images");
const DOMAIN = "6eclubregister.com";

/** source -> new public filename */
const map = [
  ["se-register-screen-site.webp", "se-register-v2.webp"],
  ["se-login-screen-site.webp", "se-login-v2.webp"],
  ["se-invite-screen-site.webp", "se-invite-v2.webp"],
  ["se-lobby-screen-site.webp", "se-lobby-v2.webp"],
  ["se-games-screen-site.webp", "se-games-v2.webp"],
  ["se-gift-code-screen-site.webp", "se-gift-v2.webp"],
  ["se-how-to-play-wingo-site.webp", "se-wingo-v2.webp"],
  ["se-app-download-steps-site.webp", "se-download-v2.webp"],
  ["se-banner-1-site.webp", "se-banner-v2.webp"],
  ["se-og.webp", "se-og-v2.webp"],
];

async function sampleColor(file, x, y) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const i = (Math.floor(y) * info.width + Math.floor(x)) * info.channels;
  return { r: data[i], g: data[i + 1], b: data[i + 2] };
}

async function paint(inputPath, outputPath) {
  // If source already has our domain, still re-paint for a clean badge.
  // Prefer raw master without -site if available for cleaner base.
  const meta = await sharp(inputPath).metadata();
  const w = meta.width;
  const h = meta.height;

  const coverW = Math.round(w * 0.42);
  const coverH = Math.round(h * 0.11);
  const coverLeft = Math.max(0, w - coverW - 4);
  const coverTop = Math.max(0, h - coverH - 4);

  const bg = await sampleColor(
    inputPath,
    Math.min(w - 8, coverLeft + Math.round(coverW * 0.12)),
    Math.max(0, coverTop - 14),
  );

  const pillH = Math.max(24, Math.round(h * 0.034));
  const fontSize = Math.max(13, Math.round(Math.min(w, h) * 0.022));
  const pillW = Math.round(DOMAIN.length * fontSize * 0.54 + fontSize * 1.8);
  const pillLeft = Math.max(10, w - pillW - Math.round(w * 0.03));
  const pillTop = Math.max(10, h - pillH - Math.round(h * 0.025));

  const svg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${coverLeft}" y="${coverTop}" width="${coverW}" height="${coverH}" rx="4"
        fill="rgb(${bg.r},${bg.g},${bg.b})"/>
  <rect x="${pillLeft}" y="${pillTop}" width="${pillW}" height="${pillH}" rx="${Math.round(pillH / 2)}"
        fill="#0b1220" stroke="#e8d5a3" stroke-width="1.75"/>
  <text x="${pillLeft + pillW / 2}" y="${pillTop + pillH / 2 + 1}"
        text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="${fontSize}" font-weight="700" fill="#f5ecd2">${DOMAIN}</text>
</svg>`);

  await sharp(inputPath)
    .composite([{ input: svg, top: 0, left: 0 }])
    .webp({ quality: 90 })
    .toFile(outputPath);
}

for (const [srcName, outName] of map) {
  // Prefer unpatched master when available (cleaner), else -site
  const raw = srcName.replace("-site.webp", ".webp");
  const rawPath = path.join(dir, raw);
  const sitePath = path.join(dir, srcName);
  const input = fs.existsSync(rawPath) ? rawPath : sitePath;
  const output = path.join(dir, outName);
  if (!fs.existsSync(input)) {
    console.log("missing source", srcName);
    continue;
  }
  await paint(input, output);
  console.log("wrote", outName, "from", path.basename(input));
}

await sharp(path.join(dir, "se-og-v2.webp"))
  .jpeg({ quality: 90, mozjpeg: true })
  .toFile(path.join(dir, "se-og-v2.jpg"));
console.log("wrote se-og-v2.jpg");
console.log("DONE");
