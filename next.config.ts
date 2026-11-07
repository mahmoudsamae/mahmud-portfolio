import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Needed because the root layout lives under the dynamic [locale] segment.
    globalNotFound: true,
  },
  images: {
    // AVIF first (smaller), WebP as fallback for browsers without AVIF support.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // The CV contains personal contact details: downloadable, but not indexed.
        source: "/cv/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
