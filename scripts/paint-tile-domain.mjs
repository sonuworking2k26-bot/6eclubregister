import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "..", "public", "images");
const DOMAIN = "6eclubregister.com";
const MAX_W = 400;

const tiles = [
  ["se-tile-wingo.webp", "se-tile-wingo-v2.webp"],
  ["se-tile-trx.webp", "se-tile-trx-v2.webp"],
  ["se-tile-k3.webp", "se-tile-k3-v2.webp"],
  ["se-tile-5d.webp", "se-tile-5d-v2.webp"],
  ["se-tile-aviator-1.webp", "se-tile-aviator-v2.webp"],
  ["se-tile-casino.webp", "se-tile-casino-v2.webp"],
  ["se-tile-slots.webp", "se-tile-slots-v2.webp"],
  ["se-tile-sports.webp", "se-tile-sports-v2.webp"],
];

async function sampleColor(file, x, y) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const i = (Math.floor(y) * info.width + Math.floor(x)) * info.channels;
  return { r: data[i], g: data[i + 1], b: data[i + 2] };
}

async function paintAndResize(inputPath, outputPath) {
  const meta = await sharp(inputPath).metadata();
  const w = meta.width;
  const h = meta.height;

  // Cover old 6eclub.in pill (bottom-right on tiles)
  const coverW = Math.round(w * 0.38);
  const coverH = Math.round(h * 0.14);
  const coverLeft = Math.max(0, w - coverW - 2);
  const coverTop = Math.max(0, h - coverH - 2);

  const bg = await sampleColor(
    inputPath,
    Math.min(w - 8, coverLeft + Math.round(coverW * 0.2)),
    Math.max(0, coverTop - 10),
  );

  const pillH = Math.max(22, Math.round(h * 0.075));
  const fontSize = Math.max(12, Math.round(w * 0.038));
  const pillW = Math.round(DOMAIN.length * fontSize * 0.55 + fontSize * 1.6);
  const pillLeft = Math.max(8, w - pillW - Math.round(w * 0.035));
  const pillTop = Math.max(8, h - pillH - Math.round(h * 0.04));

  const svg = Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect x="${coverLeft}" y="${coverTop}" width="${coverW}" height="${coverH}" rx="4"
        fill="rgb(${bg.r},${bg.g},${bg.b})"/>
  <rect x="${pillLeft}" y="${pillTop}" width="${pillW}" height="${pillH}" rx="${Math.round(pillH / 2)}"
        fill="#0b1220" stroke="#e8d5a3" stroke-width="1.5"/>
  <text x="${pillLeft + pillW / 2}" y="${pillTop + pillH / 2 + 1}"
        text-anchor="middle" dominant-baseline="middle"
        font-family="Arial, Helvetica, sans-serif"
        font-size="${fontSize}" font-weight="700" fill="#f5ecd2">${DOMAIN}</text>
</svg>`);

  const painted = await sharp(inputPath)
    .composite([{ input: svg, top: 0, left: 0 }])
    .webp({ quality: 82 })
    .toBuffer();

  await sharp(painted)
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(outputPath);
}

for (const [src, out] of tiles) {
  const input = path.join(dir, src);
  const output = path.join(dir, out);
  if (!fs.existsSync(input)) {
    console.log("missing", src);
    continue;
  }
  await paintAndResize(input, output);
  const kb = Math.round(fs.statSync(output).size / 1024);
  console.log("ok", out, kb + "KB");
}
