// app/page.tsx
import type { Metadata } from "next";
import HomePageClient from "@/components/landing/HomePageClient";
import { getServerVerseOfDay } from "@/lib/verse/VerseServer";
import { LOCALES } from "@/lib/i18n/locales";
import { META_COPY, SITE_URL } from "@/lib/i18n/meta";

export const metadata: Metadata = {
  title: META_COPY.en.title,
  description: META_COPY.en.description,
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
      "x-default": `${SITE_URL}/en`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/en`,
    siteName: "Ayah Daily",
    title: META_COPY.en.title,
    description: META_COPY.en.description,
    images: [
      {
        url: `${SITE_URL}/ayah_daily_og.png`,
        width: 1200,
        height: 630,
        alt: "Ayah Daily - One Quran verse a day",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: META_COPY.en.title,
    description: META_COPY.en.description,
    images: [`${SITE_URL}/ayah_daily_og.png`],
  },
};

export default async function HomePage() {
  const initial = await getServerVerseOfDay();

  return <HomePageClient initial={initial} />;
}
