import type { Metadata } from "next";
import { GuidePage } from "@/components/GuidePage";
import { getDoc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata(getDoc("game"));
}

export default function GamePage() {
  return (
    <GuidePage
      doc={getDoc("game")}
      showGames
      gallery={[
        {
          src: "/images/se-games-v2.webp",
          alt: "6E Club games lobby screen",
        },
        {
          src: "/images/se-lobby-v2.webp",
          alt: "6E Club main lobby",
        },
      ]}
    />
  );
}
