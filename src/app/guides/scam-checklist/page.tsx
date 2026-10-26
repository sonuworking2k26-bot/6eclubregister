import type { Metadata } from "next";
import { GuidePage } from "@/components/GuidePage";
import { getDoc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata(getDoc("scam"));
}

export default function ScamChecklistPage() {
  return (
    <GuidePage
      doc={getDoc("scam")}
      gallery={[
        {
          src: "/images/se-app-download-steps-site.webp",
          alt: "Only install from a host you trust — download steps",
          variant: "wide",
        },
        {
          src: "/images/se-login-screen-site.webp",
          alt: "Real login screen — check the hostname yourself",
        },
      ]}
    />
  );
}
