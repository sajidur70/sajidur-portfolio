import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let other devices on my Wi-Fi (e.g. my phone) use the dev server
  allowedDevOrigins: ["192.168.1.101"],
  // Next.js 16: pages are static by default; "use cache" marks cached parts
  cacheComponents: true,
  // Prefetch only the static "shell" of each route (needs cacheComponents)
  partialPrefetching: true,
  // Dev-only "N" badge: move it right so it doesn't cover the palette bar (bottom-left)
  devIndicators: {
    position: "bottom-right",
  },
  // Run Tailwind CSS on every .css file with Turbopack
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
