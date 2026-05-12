import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/metrics/:path*",
        destination: "https://g-vz33ytztts.fps.goog/metrics/:path*",
      },
      {
        source: "/analytics/:path*",
        destination: "https://gt-nn6krtxk.fps.goog/analytics/:path*",
      },
    ];
  },
};

export default nextConfig;
