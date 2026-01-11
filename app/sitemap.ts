import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n/locales";

const SITE_URL = "https://ayah-daily.web.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "daily",
    priority: 1,
  }));
}
