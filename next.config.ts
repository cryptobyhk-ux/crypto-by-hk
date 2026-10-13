import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Client-rendered animated landing page: skip the Cache Components model. */
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
