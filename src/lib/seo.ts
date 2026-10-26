import type { Metadata } from "next";
import type { Doc } from "./content";
import { site } from "./site";

const OG_IMAGE = {
  url: "/images/se-og-v2.jpg",
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
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    category: "guides",
    keywords: [
      "6E Club",
      "6E Club Register",
      "6E Club Login",
      "6E Club APK",
      "6E Club gift code",
      "6eclubregister",
    ],
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
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    other: {
      "article:published_time": `${modified}T00:00:00+05:30`,
      "article:modified_time": `${modified}T00:00:00+05:30`,
    },
  };
}

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        description: site.description,
        inLanguage: "en-IN",
        publisher: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        url: site.url,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/images/se-app-icon2.webp`,
        },
        description:
          "Independent India guides for 6E Club register, login, APK safety and scam checks. Not an official operator.",
      },
    ],
  };
}

export function guideJsonLd(doc: Doc) {
  const modified = doc.updated ?? "2026-10-26";
  const crumbs = [
    { name: "Home", item: site.url },
    ...(doc.path === "/"
      ? []
      : [{ name: doc.h1, item: doc.canonical }]),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${doc.canonical}#article`,
        headline: doc.h1,
        name: doc.title,
        description: clampDescription(doc.description),
        url: doc.canonical,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": doc.canonical,
        },
        datePublished: modified,
        dateModified: modified,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${site.url}/#website` },
        publisher: { "@id": `${site.url}/#organization` },
        image: [`${site.url}${OG_IMAGE.url}`],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${doc.canonical}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: c.item,
        })),
      },
      {
        "@type": "WebPage",
        "@id": doc.canonical,
        url: doc.canonical,
        name: doc.title,
        description: clampDescription(doc.description),
        isPartOf: { "@id": `${site.url}/#website` },
        breadcrumb: { "@id": `${doc.canonical}#breadcrumb` },
        datePublished: modified,
        dateModified: modified,
        inLanguage: "en-IN",
      },
    ],
  };
}
