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
      gallery={[
        {
          src: "/images/se-games-screen-site.webp",
          alt: "6E Club games lobby screen",
        },
        {
          src: "/images/se-lobby-screen-site.webp",
          alt: "6E Club main lobby",
        },
        { src: "/images/se-tile-wingo.webp", alt: "WinGo", variant: "tile" },
        { src: "/images/se-tile-trx.webp", alt: "TRX Win", variant: "tile" },
        { src: "/images/se-tile-k3.webp", alt: "K3", variant: "tile" },
        { src: "/images/se-tile-5d.webp", alt: "5D", variant: "tile" },
        { src: "/images/se-tile-aviator-1.webp", alt: "Aviator", variant: "tile" },
        { src: "/images/se-tile-casino.webp", alt: "Casino", variant: "tile" },
        { src: "/images/se-tile-slots.webp", alt: "Slots", variant: "tile" },
        { src: "/images/se-tile-sports.webp", alt: "Sports", variant: "tile" },
      ]}
    />
  );
}
