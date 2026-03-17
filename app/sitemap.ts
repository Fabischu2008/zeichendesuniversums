import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getPosts, getProducts } from "@/lib/cms";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly" },
    { url: absoluteUrl("/freebie"), lastModified: now, changeFrequency: "monthly" },
    { url: absoluteUrl("/shop"), lastModified: now, changeFrequency: "weekly" },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly" },
    { url: absoluteUrl("/tools"), lastModified: now, changeFrequency: "monthly" },
    {
      url: absoluteUrl("/tools/compatibility"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    {
      url: absoluteUrl("/tools/birth-chart"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    { url: absoluteUrl("/reading"), lastModified: now, changeFrequency: "monthly" },
  ];

  const productRoutes: MetadataRoute.Sitemap = getProducts().map((p) => ({
    url: absoluteUrl(`/shop/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
  }));

  const blogRoutes: MetadataRoute.Sitemap = getPosts().map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}

