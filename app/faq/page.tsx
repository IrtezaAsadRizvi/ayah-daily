import type { Metadata } from "next";
import FaqContent from "@/components/faq/FaqContent";
import { LOCALES } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/i18n/meta";

export const metadata: Metadata = {
  title: "Ayah Daily FAQ",
  description:
    "Frequently asked questions about Ayah Daily, daily Quran verses, translations, tafsir, and using the app without ads or login.",
  alternates: {
    canonical: `${SITE_URL}/en/faq`,
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/faq`])),
      "x-default": `${SITE_URL}/en/faq`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/en/faq`,
    siteName: "Ayah Daily",
    title: "Ayah Daily FAQ",
    description:
      "Frequently asked questions about Ayah Daily, daily Quran verses, translations, tafsir, and using the app without ads or login.",
    images: [
      {
        url: `${SITE_URL}/ayah_daily_og.png`,
        width: 1200,
        height: 630,
        alt: "Ayah Daily FAQ",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayah Daily FAQ",
    description:
      "Frequently asked questions about Ayah Daily, daily Quran verses, translations, tafsir, and using the app without ads or login.",
    images: [`${SITE_URL}/ayah_daily_og.png`],
  },
};

export default function FaqPage() {
  return <FaqContent />;
}
