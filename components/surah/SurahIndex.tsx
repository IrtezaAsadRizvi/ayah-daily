"use client";

// Client renderer for the /surahs index. Translated labels via next-intl
// (client-only here); the server page supplies metadata + JSON-LD.

import { useTranslations } from "next-intl";
import SurahCard from "@/components/surah/SurahCard";
import surahMetaJson from "@/public/surah.json";
import type { SurahMeta } from "@/lib/verse/surahData";

const SURAH_META = surahMetaJson as SurahMeta[];

export default function SurahIndex({ locale }: { locale: string }) {
  const t = useTranslations("Surah");
  const versesLabel = t("verses");
  const meccanLabel = t("meccan");
  const medinanLabel = t("medinan");

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      <header className="animate-verse-rise max-w-2xl">
        <h1 className="font-spectral text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-slate-100">
          {t("browse_title")}
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
          {t("browse_intro")}
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SURAH_META.map((meta, i) => {
          const number = i + 1;
          return (
            <li key={number}>
              <SurahCard
                number={number}
                meta={meta}
                locale={locale}
                versesLabel={versesLabel}
                meccanLabel={meccanLabel}
                medinanLabel={medinanLabel}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
