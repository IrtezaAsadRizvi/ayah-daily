import type { Metadata } from "next";
import GlossaryContent from "@/components/glossary/GlossaryContent";
import { LOCALES, normalizeLocale } from "@/lib/i18n/locales";
import { OG_LOCALE, SITE_URL } from "@/lib/i18n/meta";
import en from "@/messages/en.json";

const TERM_KEYS = ["ayah", "surah", "tafsir", "tilawat", "juz", "quran"] as const;

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const canonical = `${SITE_URL}/${locale}/glossary`;
  const title = "Quran glossary — key terms · Ayah Daily";
  const description =
    "Plain-language definitions of key Quran terms — ayah, surah, tafsir, tilawat, juz, and Quran — to help you read and understand the daily verse.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/glossary`])
        ),
        "x-default": `${SITE_URL}/en/glossary`,
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

type GlossaryMessages = {
  title?: string;
  intro?: string;
  terms?: Record<string, string>;
};

function buildGlossaryJsonLd(locale: string) {
  const glossary = (en as { Glossary?: GlossaryMessages }).Glossary;
  const terms = glossary?.terms;
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: glossary?.title ?? "Quran glossary — key terms",
    description: glossary?.intro,
    inLanguage: locale,
    hasDefinedTerm: TERM_KEYS.map((key) => ({
      "@type": "DefinedTerm",
      name: terms?.[key],
      description: terms?.[`${key}_def`],
      inLanguage: locale,
    })),
  };
}

export default function GlossaryPage(
  { params }: { params: { locale: string } }
) {
  const locale = normalizeLocale(params.locale);
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildGlossaryJsonLd(locale)),
        }}
      />
      <GlossaryContent />
    </>
  );
}
