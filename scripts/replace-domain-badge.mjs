import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "images");
const DOMAIN = "6eclubregister.com";

/** Every asset that still carries the old 6eclub.in corner badge */
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
  "se-og.webp",
];

async function sampleColor(file, x, y) {
  const { data, info } = await sharp(file)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const i = (Math.floor(y) * info.width + Math.floor(x)) * info.channels;
  return { r: data[i], g: data[i + 1], b: data[i + 2] };
}

async function patchFile(fileName) {
  const file = path.join(dir, fileName);
  if (!fs.existsSync(file)) {
    console.log("missing", fileName);
    return;
  }

  const meta = await sharp(file).metadata();
  const w = meta.width;
  const h = meta.height;

  const coverW = Math.round(w * 0.4);
  const coverH = Math.round(h * 0.09);
  const coverLeft = Math.max(0, w - coverW - Math.round(w * 0.008));
  const coverTop = Math.max(0, h - coverH - Math.round(h * 0.008));

  const sampleX = Math.min(w - 8, coverLeft + Math.round(coverW * 0.2));
  const sampleY = Math.max(0, coverTop - 10);
  const bg = await sampleColor(file, sampleX, sampleY);
  const bgFill = `rgb(${bg.r},${bg.g},${bg.b})`;

  const pillH = Math.max(20, Math.round(h * 0.03));
  const fontSize = Math.max(11, Math.round(Math.min(w, h) * 0.018));
  const pillPadX = Math.round(fontSize * 0.9);
  const pillW = Math.round(DOMAIN.length * fontSize * 0.56 + pillPadX * 2);
  const pillLeft = Math.max(8, w - pillW - Math.round(w * 0.028));
  const pillTop = Math.max(8, h - pillH - Math.round(h * 0.022));
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

  const outName = fileName.startsWith("se-og")
    ? "se-og.webp"
    : fileName.replace(/\.webp$/i, "-site.webp");
  const outPath = path.join(dir, outName);
  const tmpPath = path.join(dir, `~${outName}`);

  await sharp(file)
    .composite([{ input: svg, top: 0, left: 0 }])
    .webp({ quality: 90 })
    .toFile(tmpPath);

  try {
    if (fs.existsSync(outPath)) fs.unlinkSync(outPath);
  } catch {
    // locked — keep writing under alternate name
  }

  try {
    fs.renameSync(tmpPath, outPath);
  } catch {
    // If rename fails (lock), leave tmp and copy bytes via new name
    const alt = path.join(dir, outName.replace(/\.webp$/i, "-fixed.webp"));
    fs.copyFileSync(tmpPath, alt);
    fs.unlinkSync(tmpPath);
    console.log("locked, wrote", path.basename(alt));
    return alt;
  }

  console.log("patched ->", outName);
  return outPath;
}

const written = [];
for (const f of targets) {
  written.push(await patchFile(f));
}

// Always rebuild OG jpeg to a fresh file then swap
const ogJpgTmp = path.join(dir, "~se-og.jpg");
const ogJpg = path.join(dir, "se-og.jpg");
const ogSrc = fs.existsSync(path.join(dir, "se-og.webp"))
  ? path.join(dir, "se-og.webp")
  : path.join(dir, "se-og-fixed.webp");
await sharp(ogSrc).jpeg({ quality: 88, mozjpeg: true }).toFile(ogJpgTmp);
try {
  if (fs.existsSync(ogJpg)) fs.unlinkSync(ogJpg);
  fs.renameSync(ogJpgTmp, ogJpg);
  console.log("patched -> se-og.jpg");
} catch {
  fs.copyFileSync(ogJpgTmp, path.join(dir, "se-og-fixed.jpg"));
  fs.unlinkSync(ogJpgTmp);
  console.log("locked, wrote se-og-fixed.jpg");
}

console.log("done — badge images now show", DOMAIN);
console.log(written.filter(Boolean).join("\n"));
