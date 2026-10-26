import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { pages, type PageKey } from "./site";

function resolveDraftsDir(): string {
  const candidates = [
    path.join(process.cwd(), "content", "drafts"),
    path.join(process.cwd(), "..", "content", "drafts"),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(dir)) return dir;
  }
  return candidates[0];
}

const draftsDir = resolveDraftsDir();

export type Doc = {
  key: PageKey;
  path: string;
  title: string;
  h1: string;
  description: string;
  canonical: string;
  body: string;
  updated?: string;
  image?: string;
  imageAlt?: string;
};

/** Drop chrome that the page UI already renders (TOC / related grid). */
export function prepareGuideBody(body: string): string {
  let text = body.trim();

  // Leading markdown H1 (hero already shows it)
  text = text.replace(/^#\s+[^\n]+\n+/, "");

  // Inline "On this page" lists
  text = text.replace(
    /\*\*On this page\*\*\s*\n+(?:(?:\d+\.\s*)?\[[^\]]+\]\([^)]+\)[^\n]*\n+)+\n*(?:---\s*\n+)?/i,
    "",
  );

  // Related guides table/section — RelatedGuides component handles this
  text = text.replace(
    /\n(?:---\s*\n+)?## Related 6E Club guides[\s\S]*?(?=\n(?:---\s*\n+)?## Bottom line|\s*$)/i,
    "\n",
  );

  return text.trim();
}

export function shortLead(meta: string, max = 155): string {
  const clean = meta.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const sentence = clean.split(/(?<=\.)\s+/)[0] ?? clean;
  if (sentence.length <= max) return sentence;
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

export function getDoc(key: PageKey): Doc {
  const meta = pages[key];
  const full = path.join(draftsDir, meta.file);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);

  return {
    key,
    path: meta.path,
    title: String(data.title ?? "6E Club"),
    h1: String(data.h1 ?? data.title ?? "6E Club"),
    description: String(data.meta ?? ""),
    canonical: String(data.canonical ?? `https://6eclubregister.com${meta.path}`),
    body: content.trim(),
    updated: data.updated ? String(data.updated) : undefined,
    image: meta.image,
    imageAlt: meta.imageAlt,
  };
}

export function listDocs(): Doc[] {
  return (Object.keys(pages) as PageKey[]).map((key) => getDoc(key));
}
