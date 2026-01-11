import type { Metadata } from "next";
import VergeDisplay from "@/components/landing/VergeDisplay";
import VergeActions from "@/components/landing/VergeActions";
import { getServerVerseOfDay } from "@/lib/verse/VerseServer";

const SITE_URL = "https://ayah-daily.web.app";
const SUPPORTED_LOCALES = ["en", "bn"] as const;

type Locale = (typeof SUPPORTED_LOCALES)[number];

const META_COPY: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Ayah Daily - One Quran verse a day",
    description: "One Quran verse a day — simple and beautiful.",
  },
  bn: {
    title: "আয়াহ ডেইলি - প্রতিদিন একটি কোরআনের আয়াত",
    description: "প্রতিদিন একটি কোরআনের আয়াত — সরল এবং সুন্দর।",
  },
};

function normalizeLocale(value: string | undefined): Locale {
  return SUPPORTED_LOCALES.includes(value as Locale) ? (value as Locale) : "en";
}

export async function generateMetadata(
  { params }: { params: { locale: string } }
): Promise<Metadata> {
  const locale = normalizeLocale(params.locale);
  const { title, description } = META_COPY[locale];
  const canonical = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `${SITE_URL}/en`,
        bn: `${SITE_URL}/bn`,
        "x-default": `${SITE_URL}/en`,
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
      locale: locale === "bn" ? "bn_BD" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/ayah_daily_og.png`],
    },
  };
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function HomePage() {
  const initial = await getServerVerseOfDay();

  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <VergeDisplay initial={initial} />
      <VergeActions />
    </section>
  );
}
