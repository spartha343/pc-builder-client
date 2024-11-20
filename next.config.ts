import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.mos.cms.futurecdn.net"] // Add this line
  },
  /* config options here */
  reactStrictMode: true
};

export default nextConfig;
