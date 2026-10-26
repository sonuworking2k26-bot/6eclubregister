import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "6E Club",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f3faf5",
    theme_color: "#0a5c3a",
    lang: "en-IN",
    icons: [
      {
        src: "/images/se-app-icon2.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
      {
        src: "/images/se-app-icon2.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "maskable",
      },
    ],
  };
}
