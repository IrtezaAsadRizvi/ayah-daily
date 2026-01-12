// app/page.tsx
import type { Metadata } from "next";
import VergeDisplay from "@/components/landing/VergeDisplay";
import VergeActions from "@/components/landing/VergeActions";
import SeoIntro from "@/components/landing/SeoIntro";
import FixedVersePage from "@/components/landing/FixedVersePage";
import { getServerVerseOfDay } from "@/lib/verse/VerseServer";
import { LOCALES } from "@/lib/i18n/locales";
import { META_COPY, SITE_URL } from "@/lib/i18n/meta";
import { AYAH_COUNTS, SURAH_COUNT } from "@/lib/verse/constants";

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

type QueryValue = string | string[] | undefined;

function parseParam(value: QueryValue): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

function validateRange(surah: number, ayah: number): boolean {
  if (surah < 1 || surah > SURAH_COUNT) return false;
  if (ayah < 1 || ayah > AYAH_COUNTS[surah]) return false;
  return true;
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { surah?: QueryValue; ayah?: QueryValue };
}) {
  const surah = parseParam(searchParams?.surah);
  const ayah = parseParam(searchParams?.ayah);

  if (surah && ayah && validateRange(surah, ayah)) {
    return <FixedVersePage surah={surah} ayah={ayah} />;
  }

  const initial = await getServerVerseOfDay();

  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <VergeDisplay initial={initial} />
      <VergeActions />
      <SeoIntro />
    </section>
  );
}
