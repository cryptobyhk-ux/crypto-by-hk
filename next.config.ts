import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Client-side demo app (localStorage state + live clock): classic
  // dynamic rendering instead of the Cache Components model.
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
