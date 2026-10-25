import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/success-freebie",
        destination: "/freebie/download",
        permanent: true,
      },
      {
        source: "/partnerschaft",
        destination: "/freebie_beziehung",
        permanent: true,
      },
      {
        source: "/partnerschaft/download",
        destination: "/freebie_beziehung/download",
        permanent: true,
      },
      {
        source: "/test",
        destination: "/",
        permanent: true,
      },
      {
        source: "/reading/beziehung",
        destination: "/reading",
        permanent: true,
      },
      {
        source: "/shop/reading-tarot-60",
        destination: "/reading",
        permanent: true,
      },
      {
        source: "/shop/reading-beziehung",
        destination: "/reading",
        permanent: true,
      },
      {
        source: "/shop/reading-profil-30",
        destination: "/reading",
        permanent: true,
      },
      {
        source: "/shop/coaching-einfluss",
        destination: "/coaching",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Browser & Crawler fragen oft /favicon.ico — ohne Datei bleibt ein alter Cache/404.
      { source: "/favicon.ico", destination: "/favicon.jpg" },
    ];
  },
};

export default nextConfig;
