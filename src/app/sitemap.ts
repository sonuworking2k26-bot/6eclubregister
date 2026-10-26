import type { MetadataRoute } from "next";
import { listDocs } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return listDocs().map((doc) => ({
    url: `${site.url}${doc.path === "/" ? "" : doc.path}`,
    lastModified: new Date("2026-10-26"),
    changeFrequency: doc.path === "/" ? "weekly" : "monthly",
    priority: doc.path === "/" ? 1 : 0.7,
  }));
}
