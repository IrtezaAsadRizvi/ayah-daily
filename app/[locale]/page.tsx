import type { Metadata } from "next";
import VergeDisplay from "@/components/landing/VergeDisplay";
import VergeActions from "@/components/landing/VergeActions";
import { getServerVerseOfDay } from "@/lib/verse/VerseServer";
import { LOCALES, type Locale, normalizeLocale } from "@/lib/i18n/locales";

const SITE_URL = "https://ayah-daily.web.app";

const META_COPY: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Ayah Daily - One Quran verse a day",
    description: "One Quran verse a day — simple and beautiful.",
  },
  bn: {
    title: "আয়াহ ডেইলি - প্রতিদিন একটি কোরআনের আয়াত",
    description: "প্রতিদিন একটি কোরআনের আয়াত — সরল এবং সুন্দর।",
  },
  ar: {
    title: "آية يومية - آية واحدة من القرآن كل يوم",
    description: "آية واحدة من القرآن كل يوم — بسيط وجميل.",
  },
  ur: {
    title: "روزانہ آیت - ہر دن قرآن کی ایک آیت",
    description: "ہر دن قرآن کی ایک آیت — سادہ اور خوبصورت۔",
  },
  id: {
    title: "Ayat Harian - Satu ayat Al-Qur'an setiap hari",
    description: "Satu ayat Al-Qur'an setiap hari — sederhana dan indah.",
  },
  tr: {
    title: "Günün Ayeti - Her gün Kur'an'dan bir ayet",
    description: "Her gün Kur'an'dan bir ayet — sade ve güzel.",
  },
  fa: {
    title: "آیه روزانه - هر روز یک آیه از قرآن",
    description: "هر روز یک آیه از قرآن — ساده و زیبا.",
  },
  ms: {
    title: "Ayat Harian - Satu ayat Al-Quran setiap hari",
    description: "Satu ayat Al-Quran setiap hari — ringkas dan indah.",
  },
  fr: {
    title: "Verset quotidien - Un verset du Coran par jour",
    description: "Un verset du Coran par jour — simple et beau.",
  },
  es: {
    title: "Versículo diario - Un versículo del Corán al día",
    description: "Un versículo del Corán al día — simple y hermoso.",
  },
  hi: {
    title: "दैनिक आयत - हर दिन कुरआन की एक आयत",
    description: "हर दिन कुरआन की एक आयत — सरल और सुंदर।",
  },
};

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  bn: "bn_BD",
  ar: "ar_SA",
  ur: "ur_PK",
  id: "id_ID",
  tr: "tr_TR",
  fa: "fa_IR",
  ms: "ms_MY",
  fr: "fr_FR",
  es: "es_ES",
  hi: "hi_IN",
};

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
        ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
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

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
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
