"use client";

import { useTranslations } from "next-intl";

const CARD =
  "rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] backdrop-blur-sm shadow-sm";

const TERMS: Array<[string, string]> = [
  ["ayah", "ayah_def"],
  ["surah", "surah_def"],
  ["tafsir", "tafsir_def"],
  ["tilawat", "tilawat_def"],
  ["juz", "juz_def"],
  ["quran", "quran_def"],
];

export default function GlossaryContent() {
  const t = useTranslations("Glossary");

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-16">
      <header className="text-center">
        <h1
          className="animate-verse-rise font-spectral font-bold text-3xl sm:text-4xl text-slate-900 dark:text-slate-100"
          style={{ animationDelay: "0ms" }}
        >
          {t("title")}
        </h1>
        <p
          className="animate-verse-rise mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300"
          style={{ animationDelay: "90ms" }}
        >
          {t("intro")}
        </p>
      </header>

      <dl className="mt-10 space-y-3 text-left">
        {TERMS.map(([termKey, defKey], i) => (
          <div
            key={termKey}
            className={`animate-verse-rise ${CARD} p-5`}
            style={{ animationDelay: `${180 + i * 70}ms` }}
          >
            <dt
              className="font-spectral text-lg font-semibold text-slate-900 dark:text-slate-100"
              style={{ color: "var(--accent)" }}
            >
              {t(`terms.${termKey}`)}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {t(`terms.${defKey}`)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
