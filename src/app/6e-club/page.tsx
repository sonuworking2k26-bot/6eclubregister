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
      showGames
      gallery={[
        {
          src: "/images/se-banner-v2.webp",
          alt: "6E Club brand banner",
          variant: "wide",
        },
        {
          src: "/images/se-games-v2.webp",
          alt: "6E Club games lobby",
        },
      ]}
    />
  );
}
