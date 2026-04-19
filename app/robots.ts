import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/checkout",
          "/success",
          "/success-freebie",
          "/tools/birth-chart/profile",
          "/tools/compatibility/access",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

