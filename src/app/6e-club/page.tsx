import type { Metadata } from "next";
import { GuidePage } from "@/components/GuidePage";
import { getDoc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata(getDoc("brand"));
}

export default function BrandPage() {
  return (
    <GuidePage
      doc={getDoc("brand")}
      gallery={[
        {
          src: "/images/se-banner-1-site.webp",
          alt: "6E Club brand banner",
          variant: "wide",
        },
        {
          src: "/images/se-games-screen-site.webp",
          alt: "6E Club games lobby",
        },
        { src: "/images/se-tile-wingo.webp", alt: "WinGo", variant: "tile" },
        { src: "/images/se-tile-trx.webp", alt: "TRX", variant: "tile" },
        { src: "/images/se-tile-k3.webp", alt: "K3", variant: "tile" },
        { src: "/images/se-tile-5d.webp", alt: "5D", variant: "tile" },
      ]}
    />
  );
}
