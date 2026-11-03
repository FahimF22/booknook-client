import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }, // banner photos
      { protocol: "https", hostname: "covers.openlibrary.org" }, // sample book covers
      { protocol: "https", hostname: "i.ibb.co" }, // uploaded book covers (imgbb)
    ],
  },
  partialPrefetching: true,
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
