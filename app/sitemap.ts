import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n/locales";

const SITE_URL = "https://ayah-daily.web.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified,
    },
  ];

  LOCALES.forEach((locale) => {
    entries.push(
      {
        url: `${SITE_URL}/${locale}`,
        lastModified,
      },
      {
        url: `${SITE_URL}/${locale}/about`,
        lastModified,
      }
    );
  });

  return entries;
}
