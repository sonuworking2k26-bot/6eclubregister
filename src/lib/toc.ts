/** Rough match for rehype-slug / GitHub-style heading ids. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`*_~]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export type TocItem = { id: string; text: string };

export function extractToc(body: string): TocItem[] {
  const items: TocItem[] = [];
  const seen = new Map<string, number>();

  for (const match of body.matchAll(/^##\s+(.+)$/gm)) {
    const text = match[1].replace(/[`*_~]/g, "").trim();
    if (!text) continue;
    let id = slugifyHeading(text);
    const count = seen.get(id) ?? 0;
    seen.set(id, count + 1);
    if (count > 0) id = `${id}-${count}`;
    items.push({ id, text });
  }

  return items;
}
