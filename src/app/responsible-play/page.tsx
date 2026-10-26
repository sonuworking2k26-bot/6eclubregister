import type { Metadata } from "next";
import { GuidePage } from "@/components/GuidePage";
import { getDoc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata(getDoc("responsible"));
}

export default function ResponsiblePlayPage() {
  return (
    <GuidePage
      doc={getDoc("responsible")}
      gallery={[
        {
          src: "/images/se-banner-v2.webp",
          alt: "Play within limits — 6E Club guide",
          variant: "wide",
        },
      ]}
    />
  );
}
