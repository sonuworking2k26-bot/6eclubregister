import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "images");
const previewDir = path.join(__dirname, "..", ".tmp-img-preview");
fs.mkdirSync(previewDir, { recursive: true });

const DOMAIN = "6eclubregister.com";

/** Masters that still show 6eclub.in in the corner badge */
const targets = [
  "se-register-screen.webp",
  "se-login-screen.webp",
  "se-invite-screen.webp",
  "se-lobby-screen.webp",
  "se-games-screen.webp",
  "se-gift-code-screen.webp",
  "se-how-to-play-wingo.webp",
  "se-app-download-steps.webp",
  "se-banner-1.webp",
];

async function sampleColor(file, x, y) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const i = (Math.floor(y) * info.width + Math.floor(x)) * info.channels;
  return { r: data[i], g: data[i + 1], b: data[i + 2] };
}

async function replaceBadge(fileName) {
  const file = path.join(dir, fileName);
  const outName = fileName.replace(/\.webp$/i, "-site.webp");
  const outFile = path.join(dir, outName);
  const meta = await sharp(file).metadata();
  const w = meta.width;
  const h = meta.height;

  const coverW = Math.round(w * 0.38);
  const coverH = Math.round(h * 0.08);
  const coverLeft = w - coverW - Math.round(w * 0.01);
  const coverTop = h - coverH - Math.round(h * 0.01);

  const sampleX = Math.min(w - 8, coverLeft + Math.round(coverW * 0.2));
  const sampleY = Math.max(0, coverTop - 12);
  const bg = await sampleColor(file, sampleX, sampleY);
  const bgFill = `rgb(${bg.r},${bg.g},${bg.b})`;

  const pillH = Math.max(20, Math.round(h * 0.028));
  const fontSize = Math.max(11, Math.round(Math.min(w, h) * 0.018));
  const pillPadX = Math.round(fontSize * 0.9);
  const pillW = Math.round(DOMAIN.length * fontSize * 0.56 + pillPadX * 2);
  const pillLeft = w - pillW - Math.round(w * 0.03);
  const pillTop = h - pillH - Math.round(h * 0.025);
  const pillRx = Math.round(pillH / 2);

  const svg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${coverLeft}" y="${coverTop}" width="${coverW}" height="${coverH}" rx="4" fill="${bgFill}"/>
  <rect x="${pillLeft}" y="${pillTop}" width="${pillW}" height="${pillH}" rx="${pillRx}"
        fill="#12182a" stroke="#e8d5a3" stroke-width="1.5"/>
  <text x="${pillLeft + pillW / 2}" y="${pillTop + pillH / 2 + 1}"
        text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="${fontSize}" font-weight="600" fill="#f3e6c4">${DOMAIN}</text>
</svg>`);

  await sharp(file)
    .composite([{ input: svg, top: 0, left: 0 }])
    .webp({ quality: 90 })
    .toFile(outFile);

  const cw = Math.min(300, w);
  const ch = Math.min(90, h);
  await sharp(outFile)
    .extract({ left: w - cw, top: h - ch, width: cw, height: ch })
    .png()
    .toFile(path.join(previewDir, `after-${outName.replace(".webp", ".png")}`));

  console.log("ok", fileName, "->", outName);
  return outName;
}

for (const f of targets) {
  await replaceBadge(f);
}
console.log("done");
