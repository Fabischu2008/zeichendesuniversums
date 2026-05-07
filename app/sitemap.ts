import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getPosts, getProducts } from "@/lib/cms";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly" },
    { url: absoluteUrl("/freebie"), lastModified: now, changeFrequency: "monthly" },
    {
      url: absoluteUrl("/freebie-auswahl"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    {
      url: absoluteUrl("/sternzeichen"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    {
      url: absoluteUrl("/beziehung"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    {
      url: absoluteUrl("/freebie_beziehung"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    { url: absoluteUrl("/shop"), lastModified: now, changeFrequency: "weekly" },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly" },
    {
      url: absoluteUrl("/aszendent-berechnen"),
      lastModified: now,
      changeFrequency: "weekly",
    },
    {
      url: absoluteUrl("/mondzeichen-beziehung"),
      lastModified: now,
      changeFrequency: "weekly",
    },
    {
      url: absoluteUrl("/synastrie-einfach-erklaert"),
      lastModified: now,
      changeFrequency: "weekly",
    },
    {
      url: absoluteUrl("/beziehungsanalyse-astrologie"),
      lastModified: now,
      changeFrequency: "weekly",
    },
    {
      url: absoluteUrl("/big-3-bedeutung"),
      lastModified: now,
      changeFrequency: "weekly",
    },
    {
      url: absoluteUrl("/sternzeichen-kompatibilitaet"),
      lastModified: now,
      changeFrequency: "weekly",
    },
    {
      url: absoluteUrl("/venus-mars-kompatibilitaet"),
      lastModified: now,
      changeFrequency: "weekly",
    },
    {
      url: absoluteUrl("/astrologie-beziehungstipps"),
      lastModified: now,
      changeFrequency: "weekly",
    },
    {
      url: absoluteUrl("/geburtshoroskop-erstellen"),
      lastModified: now,
      changeFrequency: "weekly",
    },
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
    {
      url: absoluteUrl("/tools/astro-map"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    {
      url: absoluteUrl("/tools/human-design"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    {
      url: absoluteUrl("/tools/bewusstsein"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    {
      url: absoluteUrl("/tools/bewusstsein/stufen"),
      lastModified: now,
      changeFrequency: "monthly",
    },
    { url: absoluteUrl("/reading"), lastModified: now, changeFrequency: "monthly" },
    { url: absoluteUrl("/impressum"), lastModified: now, changeFrequency: "yearly" },
    { url: absoluteUrl("/datenschutz"), lastModified: now, changeFrequency: "yearly" },
    { url: absoluteUrl("/agb"), lastModified: now, changeFrequency: "yearly" },
    { url: absoluteUrl("/widerruf"), lastModified: now, changeFrequency: "yearly" },
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

