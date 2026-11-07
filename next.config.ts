import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Needed because the root layout lives under the dynamic [locale] segment.
    globalNotFound: true,
  },
};

export default nextConfig;
