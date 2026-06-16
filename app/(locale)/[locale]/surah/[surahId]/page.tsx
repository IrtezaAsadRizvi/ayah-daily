// app/(locale)/[locale]/surah/[surahId]/page.tsx
// Per-surah reference page. Server component: data fetch + metadata + JSON-LD
// ship in the static HTML. The translated, visible UI is rendered by the client
// <SurahReader> (this app has no server-side next-intl provider).

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SurahReader from "@/components/surah/SurahReader";
import { getSurah, getSurahMeta, SURAH_META } from "@/lib/verse/surahData";
import { LOCALES, normalizeLocale } from "@/lib/i18n/locales";
import { OG_LOCALE, SITE_URL } from "@/lib/i18n/meta";

export function generateStaticParams(): Array<{ surahId: string }> {
  return SURAH_META.map((_, i) => ({ surahId: String(i + 1) }));
}

// bn -> bengali (ltr), ur -> urdu (rtl), everything else -> english (ltr).
// Never fabricate translations for locales we lack data for.
function pickTranslation(
  locale: string,
  data: { english: string[]; bengali: string[]; urdu: string[] }
): { text: string[]; lang: string; dir: "ltr" | "rtl" } {
  const normalized = locale.toLowerCase();
  if (normalized === "bn" && data.bengali?.length) return { text: data.bengali, lang: "bn", dir: "ltr" };
  if (normalized === "ur" && data.urdu?.length) return { text: data.urdu, lang: "ur", dir: "rtl" };
  return { text: data.english, lang: "en", dir: "ltr" };
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; surahId: string };
}): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const n = Number(params.surahId);
  const meta = getSurahMeta(n);
  if (!meta) return {};

  const canonical = `${SITE_URL}/${locale}/surah/${n}`;
  const title = `Surah ${meta.surahName} (${meta.surahNameArabic}) — translation & recitation · Ayah Daily`;
  const description = `Read Surah ${meta.surahName} (${meta.surahNameTranslation}) — all ${meta.totalAyah} verses in Arabic with translation and recitation on Ayah Daily.`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/surah/${n}`])),
        "x-default": `${SITE_URL}/en/surah/${n}`,
      },
    },
    openGraph: {
      type: "article",
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

export default async function SurahPage({
  params,
}: {
  params: { locale: string; surahId: string };
}) {
  const locale = normalizeLocale(params.locale);
  const n = Number(params.surahId);
  if (!Number.isInteger(n) || n < 1 || n > SURAH_META.length) notFound();

  const data = await getSurah(n);
  const translation = pickTranslation(locale, data);
  const prevMeta = n > 1 ? getSurahMeta(n - 1) : undefined;
  const nextMeta = n < SURAH_META.length ? getSurahMeta(n + 1) : undefined;
  const canonical = `${SITE_URL}/${locale}/surah/${n}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Surahs", item: `${SITE_URL}/${locale}/surahs` },
      { "@type": "ListItem", position: 3, name: data.surahName, item: canonical },
    ],
  };

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `Surah ${data.surahName} (${data.surahNameArabic})`,
    alternateName: data.surahNameTranslation,
    url: canonical,
    inLanguage: locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: "Quran",
    position: n,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumb, creativeWork]) }}
      />
      <SurahReader
        locale={locale}
        number={n}
        surahName={data.surahName}
        surahNameTranslation={data.surahNameTranslation}
        surahNameArabicLong={data.surahNameArabicLong}
        totalAyah={data.totalAyah}
        isMeccan={data.revelationPlace === "Mecca"}
        arabic={data.arabic1}
        translation={translation}
        prev={prevMeta ? { number: n - 1, name: prevMeta.surahName } : undefined}
        next={nextMeta ? { number: n + 1, name: nextMeta.surahName } : undefined}
      />
    </>
  );
}
