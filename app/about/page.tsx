import type { Metadata } from "next";
import AboutContent from "@/components/about/AboutContent";
import { LOCALES } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/i18n/meta";

export const metadata: Metadata = {
  title: "About Ayah Daily",
  description:
    "Learn what Ayah Daily is, how it works, and why it focuses on simple daily Quran reading without ads or login.",
  alternates: {
    canonical: `${SITE_URL}/en/about`,
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/about`])),
      "x-default": `${SITE_URL}/en/about`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/en/about`,
    siteName: "Ayah Daily",
    title: "About Ayah Daily",
    description:
      "Learn what Ayah Daily is, how it works, and why it focuses on simple daily Quran reading without ads or login.",
    images: [
      {
        url: `${SITE_URL}/ayah_daily_og.png`,
        width: 1200,
        height: 630,
        alt: "About Ayah Daily",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ayah Daily",
    description:
      "Learn what Ayah Daily is, how it works, and why it focuses on simple daily Quran reading without ads or login.",
    images: [`${SITE_URL}/ayah_daily_og.png`],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
