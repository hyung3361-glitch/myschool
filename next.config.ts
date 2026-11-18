import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: "/logo.jpg",
          destination: "https://www.shalomfree.kr/images/logo.jpg",
        },
      ],
    };
  },
};

export default nextConfig;
