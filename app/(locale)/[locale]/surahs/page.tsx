// app/(locale)/[locale]/surahs/page.tsx
// Browse-all-surahs index. Server component handles metadata + JSON-LD; the
// translated UI is rendered by the client <SurahIndex> (no server-side next-intl).

import type { Metadata } from "next";

import SurahIndex from "@/components/surah/SurahIndex";
import { LOCALES, normalizeLocale } from "@/lib/i18n/locales";
import { OG_LOCALE, SITE_URL } from "@/lib/i18n/meta";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const canonical = `${SITE_URL}/${locale}/surahs`;
  const title = "Browse the Quran — all 114 surahs · Ayah Daily";
  const description =
    "Browse all 114 surahs of the Quran with Arabic, translation and recitation. Open any surah to read its verses on Ayah Daily — free and ad-free.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/surahs`])),
        "x-default": `${SITE_URL}/en/surahs`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Ayah Daily",
      title,
      description,
      images: [{ url: `${SITE_URL}/ayah_daily_og.png`, width: 1200, height: 630, alt: title }],
      locale: OG_LOCALE[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/ayah_daily_og.png`],
    },
  };
}

export default function SurahsIndexPage({ params }: { params: { locale: string } }) {
  const locale = normalizeLocale(params.locale);
  const canonical = `${SITE_URL}/${locale}/surahs`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Surahs", item: canonical },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SurahIndex locale={locale} />
    </>
  );
}
