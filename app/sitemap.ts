import type { MetadataRoute } from "next";

const SITE_URL = "https://ayah-daily.web.app";
const LOCALES = ["en", "bn"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "daily",
    priority: 1,
  }));
}
