// components/surah/SurahCard.tsx
// Presentational server component for the index grid: one surah card linking to
// its reference page. No interactivity, so no "use client".

import Link from "next/link";
import type { SurahMeta } from "@/lib/verse/surahData";

type SurahCardProps = {
  /** 1-indexed surah number. */
  number: number;
  meta: SurahMeta;
  locale: string;
  /** Localized "verses" word. */
  versesLabel: string;
  /** Localized tag for Meccan revelation. */
  meccanLabel: string;
  /** Localized tag for Medinan revelation. */
  medinanLabel: string;
};

export default function SurahCard({
  number,
  meta,
  locale,
  versesLabel,
  meccanLabel,
  medinanLabel,
}: SurahCardProps) {
  const isMeccan = meta.revelationPlace === "Mecca";
  const placeLabel = isMeccan ? meccanLabel : medinanLabel;

  return (
    <Link
      href={`/${locale}/surah/${number}`}
      className="group block rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] backdrop-blur-sm shadow-sm p-5 transition-colors hover:border-[var(--accent)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span
            aria-hidden="true"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {number}
          </span>
          <div className="min-w-0">
            <h2 className="font-spectral font-semibold truncate text-slate-900 dark:text-slate-100 group-hover:text-[var(--accent)] transition-colors">
              {meta.surahName}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
              {meta.surahNameTranslation}
            </p>
          </div>
        </div>
        <span
          lang="ar"
          dir="rtl"
          className="font-arabic text-xl text-slate-900 dark:text-slate-100 shrink-0"
        >
          {meta.surahNameArabic}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className="text-slate-500 dark:text-slate-400">
          {meta.totalAyah} {versesLabel}
        </span>
        <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">
          ·
        </span>
        <span className="rounded-full px-2 py-0.5 font-medium bg-[var(--accent)]/10 text-[var(--accent)]">
          {placeLabel}
        </span>
      </div>
    </Link>
  );
}
