import type { Metadata } from "next";
import HowItWorksContent from "@/components/how-it-works/HowItWorksContent";
import { LOCALES } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/i18n/meta";

export const metadata: Metadata = {
  title: "How Ayah Daily Works",
  description:
    "Learn how Ayah Daily selects the daily Quran verse, provides translations and tafsir, and stays free with no ads or login.",
  alternates: {
    canonical: `${SITE_URL}/en/how-it-works`,
    languages: {
      ...Object.fromEntries(
        LOCALES.map((l) => [l, `${SITE_URL}/${l}/how-it-works`])
      ),
      "x-default": `${SITE_URL}/en/how-it-works`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/en/how-it-works`,
    siteName: "Ayah Daily",
    title: "How Ayah Daily Works",
    description:
      "Learn how Ayah Daily selects the daily Quran verse, provides translations and tafsir, and stays free with no ads or login.",
    images: [
      {
        url: `${SITE_URL}/ayah_daily_og.png`,
        width: 1200,
        height: 630,
        alt: "How Ayah Daily Works",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "How Ayah Daily Works",
    description:
      "Learn how Ayah Daily selects the daily Quran verse, provides translations and tafsir, and stays free with no ads or login.",
    images: [`${SITE_URL}/ayah_daily_og.png`],
  },
};

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
