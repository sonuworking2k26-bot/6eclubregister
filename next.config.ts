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
};

export default nextConfig;
