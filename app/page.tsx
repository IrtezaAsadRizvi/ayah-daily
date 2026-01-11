// app/page.tsx
import type { Metadata } from "next";
import VergeDisplay from "@/components/landing/VergeDisplay";
import VergeActions from "@/components/landing/VergeActions";
import { getServerVerseOfDay } from "@/lib/verse/VerseServer";

const SITE_URL = "https://ayah-daily.web.app";

export const metadata: Metadata = {
  title: "Ayah Daily - One Quran verse a day",
  description: "One Quran verse a day — simple and beautiful.",
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      en: `${SITE_URL}/en`,
      bn: `${SITE_URL}/bn`,
      "x-default": `${SITE_URL}/en`,
    },
  },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/en`,
    siteName: "Ayah Daily",
    title: "Ayah Daily - One Quran verse a day",
    description: "One Quran verse a day — simple and beautiful.",
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
    title: "Ayah Daily - One Quran verse a day",
    description: "One Quran verse a day — simple and beautiful.",
    images: [`${SITE_URL}/ayah_daily_og.png`],
  },
};

export default async function HomePage() {
  const initial = await getServerVerseOfDay();

  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <VergeDisplay initial={initial} />
      <VergeActions />
    </section>
  );
}
