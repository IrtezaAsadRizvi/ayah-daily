// components/surah/AyahRow.tsx
// Presentational server component: one ayah (number badge + Arabic + the
// locale-appropriate translation). No interactivity, so no "use client".

import type { ReactNode } from "react";

type AyahRowProps = {
  /** 1-indexed ayah number. */
  number: number;
  /** Arabic text (arabic1[i]) — always shown, rendered RTL. */
  arabic: string;
  /** Locale-appropriate translation text. */
  translation: string;
  /** BCP-47 lang for the translation (en | bn | ur). */
  translationLang: string;
  /** Reading direction for the translation. */
  translationDir: "ltr" | "rtl";
  /** Localized "ayah" label (capitalized via CSS). */
  ayahLabel: ReactNode;
};

export default function AyahRow({
  number,
  arabic,
  translation,
  translationLang,
  translationDir,
  ayahLabel,
}: AyahRowProps) {
  return (
    <article className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] backdrop-blur-sm shadow-sm p-5 sm:p-7">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--accent)" }}
        >
          {number}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          <span className="capitalize">{ayahLabel}</span> {number}
        </span>
      </div>

      <p
        lang="ar"
        dir="rtl"
        className="mt-5 text-right font-arabic text-2xl sm:text-3xl leading-loose text-slate-900 dark:text-slate-100"
      >
        {arabic}
      </p>

      <p
        lang={translationLang}
        dir={translationDir}
        className="mt-4 font-spectral leading-relaxed text-slate-600 dark:text-slate-300"
      >
        {translation}
      </p>
    </article>
  );
}
