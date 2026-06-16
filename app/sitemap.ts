import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n/locales";

const SITE_URL = "https://ayah-daily.web.app";
const SUBPATHS = [
  "",
  "/about",
  "/how-it-works",
  "/faq",
  "/surahs",
  "/glossary",
] as const;
const SURAH_COUNT = 114;

export const dynamic = "force-static";

// Note: per-locale hreflang alternates are emitted via <link rel="alternate">
// in the document <head> (generateMetadata.alternates.languages). Next 13.4's
// MetadataRoute.Sitemap only renders <loc>, so changeFrequency/priority/
// alternates are intentionally omitted here — they would be dropped silently.
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  LOCALES.forEach((locale) => {
    SUBPATHS.forEach((sub) => {
      entries.push({ url: `${SITE_URL}/${locale}${sub}` });
    });
    for (let id = 1; id <= SURAH_COUNT; id += 1) {
      entries.push({ url: `${SITE_URL}/${locale}/surah/${id}` });
    }
  });

  return entries;
}
