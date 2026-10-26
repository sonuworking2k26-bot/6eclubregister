import type { Metadata } from "next";
import { GuidePage } from "@/components/GuidePage";
import { getDoc } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return pageMetadata(getDoc("login"));
}

export default function LoginPage() {
  return (
    <GuidePage
      doc={getDoc("login")}
      gallery={[
        {
          src: "/images/se-register-v2.webp",
          alt: "6E Club register screen — same mobile login ID",
        },
      ]}
    />
  );
}
