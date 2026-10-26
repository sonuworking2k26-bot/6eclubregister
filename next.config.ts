import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep Turbopack root inside this app so parent monorepo lockfiles are ignored. */
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 750, 1080, 1200],
    imageSizes: [96, 128, 160, 200, 280, 360],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
