import type { Metadata } from "next";
import HowItWorksContent from "@/components/how-it-works/HowItWorksContent";
import { LOCALES, normalizeLocale } from "@/lib/i18n/locales";
import { OG_LOCALE, SITE_URL } from "@/lib/i18n/meta";

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const canonical = `${SITE_URL}/${locale}/how-it-works`;
  const title = "How Ayah Daily Works";
  const description =
    "Learn how Ayah Daily selects the daily Quran verse, provides translations and tafsir, and stays free with no ads or login.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/how-it-works`])
        ),
        "x-default": `${SITE_URL}/en/how-it-works`,
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Ayah Daily",
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/ayah_daily_og.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
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

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
