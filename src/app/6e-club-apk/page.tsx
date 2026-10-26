import type { Metadata } from "next";
import { GuidePage } from "@/components/GuidePage";
import { getDoc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata(getDoc("apk"));
}

export default function ApkPage() {
  return (
    <GuidePage
      doc={getDoc("apk")}
      gallery={[
        {
          src: "/images/se-lobby-screen-site.webp",
          alt: "6E Club lobby after install",
        },
        {
          src: "/images/se-games-screen-site.webp",
          alt: "Games list inside the app",
        },
      ]}
    />
  );
}
