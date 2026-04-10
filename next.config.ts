import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async rewrites() {
    return [
      // Browser & Crawler fragen oft /favicon.ico — ohne Datei bleibt ein alter Cache/404.
      { source: "/favicon.ico", destination: "/favicon.jpg" },
    ];
  },
};

export default nextConfig;
