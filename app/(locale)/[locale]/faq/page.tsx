import type { Metadata } from "next";
import FaqContent from "@/components/faq/FaqContent";
import { LOCALES, normalizeLocale } from "@/lib/i18n/locales";
import { OG_LOCALE, SITE_URL } from "@/lib/i18n/meta";
import en from "@/messages/en.json";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5"] as const;

function buildFaqJsonLd() {
  const { questions, answers } = en.Faq;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_KEYS.map((qKey) => {
      const aKey = `a${qKey.slice(1)}` as keyof typeof answers;
      return {
        "@type": "Question",
        name: questions[qKey],
        acceptedAnswer: {
          "@type": "Answer",
          text: answers[aKey],
        },
      };
    }),
  };
}

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const canonical = `${SITE_URL}/${locale}/faq`;
  const title = "Ayah Daily FAQ";
  const description =
    "Frequently asked questions about Ayah Daily, daily Quran verses, translations, tafsir, and using the app without ads or login.";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}/faq`])),
        "x-default": `${SITE_URL}/en/faq`,
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

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd()) }}
      />
      <FaqContent />
    </>
  );
}
