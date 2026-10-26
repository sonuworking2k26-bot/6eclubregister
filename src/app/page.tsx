import type { Metadata } from "next";
import { GuidePage } from "@/components/GuidePage";
import { getDoc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata(getDoc("home"));
}

export default function HomePage() {
  return (
    <GuidePage
      doc={getDoc("home")}
      showGames
      gallery={[
        {
          src: "/images/se-banner-v2.webp",
          alt: "6E Club banner",
          variant: "wide",
        },
        {
          src: "/images/se-invite-v2.webp",
          alt: "6E Club invite code screen",
        },
        {
          src: "/images/se-gift-v2.webp",
          alt: "6E Club gift code screen",
        },
      ]}
    />
  );
}
