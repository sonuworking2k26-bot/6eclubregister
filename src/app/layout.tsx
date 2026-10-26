import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { MobileNav } from "@/components/MobileNav";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { siteJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — India Guide`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "6E Club",
    "6E Club Register",
    "6E Club Login",
    "6E Club APK",
    "6E Club gift code",
    "6eclubregister.com",
  ],
  alternates: {
    canonical: site.url,
    types: {
      "application/rss+xml": `${site.url}/sitemap.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
    images: [
      {
        url: "/images/se-og-v2.jpg",
        width: 1200,
        height: 630,
        alt: site.name,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
    images: ["/images/se-og-v2.jpg"],
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
  icons: {
    icon: [{ url: "/images/se-app-icon2.webp", type: "image/webp" }],
    apple: [{ url: "/images/se-app-icon2.webp" }],
    shortcut: ["/images/se-app-icon2.webp"],
  },
  other: {
    "content-language": "en-IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a5c3a",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} h-full`}>
      <body className="page-with-bottom-nav flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <MobileNav />
      </body>
    </html>
  );
}
