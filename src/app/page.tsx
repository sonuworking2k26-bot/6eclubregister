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
      gallery={[
        {
          src: "/images/se-banner-1-site.webp",
          alt: "6E Club banner",
          variant: "wide",
        },
        {
          src: "/images/se-invite-screen-site.webp",
          alt: "6E Club invite code screen",
        },
        {
          src: "/images/se-gift-code-screen-site.webp",
          alt: "6E Club gift code screen",
        },
      ]}
    />
  );
}
