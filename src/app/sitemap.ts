import type { MetadataRoute } from "next";
import { listDocs } from "@/lib/content";
import { site } from "@/lib/site";

const priorityByPath: Record<string, number> = {
  "/": 1,
  "/6e-club-login": 0.9,
  "/6e-club-apk": 0.85,
  "/6e-club": 0.8,
  "/6e-club-game": 0.8,
  "/guides/scam-checklist": 0.75,
  "/responsible-play": 0.5,
};

const freqByPath: Record<string, MetadataRoute.Sitemap[0]["changeFrequency"]> = {
  "/": "daily",
  "/6e-club-login": "weekly",
  "/6e-club-apk": "weekly",
  "/guides/scam-checklist": "weekly",
};

export default function sitemap(): MetadataRoute.Sitemap {
  return listDocs().map((doc) => {
    const modified = doc.updated ? new Date(`${doc.updated}T00:00:00+05:30`) : new Date("2026-10-26");
    return {
      url: `${site.url}${doc.path === "/" ? "" : doc.path}`,
      lastModified: modified,
      changeFrequency: freqByPath[doc.path] ?? "monthly",
      priority: priorityByPath[doc.path] ?? 0.6,
    };
  });
}
