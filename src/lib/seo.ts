import type { Metadata } from "next";
import type { Doc } from "./content";
import { site } from "./site";

const OG_IMAGE = {
  url: "/images/se-og.jpg",
  width: 1200,
  height: 630,
  alt: site.name,
  type: "image/jpeg",
} as const;

/** Keep meta descriptions in the ~150–160 char SERP window. */
export function clampDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1).replace(/\s+\S*$/, "");
  return `${cut}…`;
}

export function pageMetadata(doc: Doc): Metadata {
  const description = clampDescription(doc.description);
  const modified = doc.updated ?? "2026-10-26";

  return {
    title: { absolute: doc.title },
    description,
    alternates: { canonical: doc.canonical },
    openGraph: {
      type: "article",
      locale: site.locale,
      url: doc.canonical,
      siteName: site.name,
      title: doc.title,
      description,
      publishedTime: `${modified}T00:00:00+05:30`,
      modifiedTime: `${modified}T00:00:00+05:30`,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description,
      images: [OG_IMAGE.url],
    },
    other: {
      "article:published_time": `${modified}T00:00:00+05:30`,
      "article:modified_time": `${modified}T00:00:00+05:30`,
    },
  };
}

export function guideJsonLd(doc: Doc) {
  const modified = doc.updated ?? "2026-10-26";
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: doc.h1,
    name: doc.title,
    description: clampDescription(doc.description),
    url: doc.canonical,
    mainEntityOfPage: doc.canonical,
    datePublished: modified,
    dateModified: modified,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/se-app-icon2.webp`,
      },
    },
    image: [`${site.url}${OG_IMAGE.url}`],
  };
}
