"use client";

// Client renderer for a surah page. This app provides next-intl messages only
// on the client (ClientIntlProvider), so all translated UI lives here while the
// server page handles data fetching, metadata, and JSON-LD.

import Link from "next/link";
import { useTranslations } from "next-intl";
import AyahRow from "@/components/surah/AyahRow";

type NavMeta = { number: number; name: string };

type Props = {
  locale: string;
  number: number;
  surahName: string;
  surahNameTranslation: string;
  surahNameArabicLong: string;
  totalAyah: number;
  isMeccan: boolean;
  arabic: string[];
  translation: { text: string[]; lang: string; dir: "ltr" | "rtl" };
  prev?: NavMeta;
  next?: NavMeta;
};

const navCard =
  "group flex flex-col rounded-2xl border border-black/5 dark:border-white/10 bg-white/50 dark:bg-white/[0.05] backdrop-blur-sm shadow-sm px-5 py-3 transition-colors hover:border-[var(--accent)]/40";

export default function SurahReader(props: Props) {
  const t = useTranslations("Surah");
  const tDisplay = useTranslations("Display");
  const placeLabel = props.isMeccan ? t("meccan") : t("medinan");

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
      {/* Breadcrumb trail */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href={`/${props.locale}`} className="hover:underline">
              {tDisplay("title")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/${props.locale}/surahs`} className="hover:underline">
              {t("surahs")}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-slate-700 dark:text-slate-200">{props.surahName}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="animate-verse-rise mt-8 text-center">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {props.surahNameTranslation}
        </p>
        <h1 className="mt-1 font-spectral text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-slate-100">
          {props.surahName}
        </h1>
        <p
          lang="ar"
          dir="rtl"
          className="mt-3 font-arabic text-2xl sm:text-3xl text-slate-900 dark:text-slate-100"
        >
          {props.surahNameArabicLong}
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          {props.totalAyah} {t("verses")} · {placeLabel}
        </p>
      </header>

      {/* Ayahs */}
      <div className="mt-10 space-y-4">
        {props.arabic.map((arabic, i) => (
          <AyahRow
            key={i}
            number={i + 1}
            arabic={arabic}
            translation={props.translation.text[i]}
            translationLang={props.translation.lang}
            translationDir={props.translation.dir}
            ayahLabel={tDisplay("ayah")}
          />
        ))}
      </div>

      {/* Prev / next navigation */}
      <nav
        aria-label="Surah navigation"
        className="mt-12 flex items-center justify-between gap-4"
      >
        {props.prev ? (
          <Link href={`/${props.locale}/surah/${props.prev.number}`} className={navCard}>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {t("previous")}
            </span>
            <span className="font-spectral font-medium text-slate-900 dark:text-slate-100 group-hover:text-[var(--accent)] transition-colors">
              {props.prev.name}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {props.next ? (
          <Link
            href={`/${props.locale}/surah/${props.next.number}`}
            className={`${navCard} items-end text-right`}
          >
            <span className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {t("next")}
            </span>
            <span className="font-spectral font-medium text-slate-900 dark:text-slate-100 group-hover:text-[var(--accent)] transition-colors">
              {props.next.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
