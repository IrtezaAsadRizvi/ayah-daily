// lib/verse/surahData.ts
// Build-time data helpers for the per-surah Quran reference pages.
//
// `getSurah` fetches the full surah payload (parallel ayah arrays) from the
// public Quran API and memoizes it in an in-module Map so each surah is fetched
// at most once across all 12 locale builds (static export runs each locale).
//
// `SURAH_META` is the 114-entry metadata list bundled from public/surah.json —
// used for the index page and `generateStaticParams` without any network call.

import surahMetaJson from "@/public/surah.json";

const BASE_URL = "https://quranapi.pages.dev/api";

/** Per-surah metadata (no ayah text). Matches the entries in public/surah.json. */
export type SurahMeta = {
  surahName: string;
  surahNameArabic: string;
  surahNameArabicLong: string;
  surahNameTranslation: string;
  revelationPlace: "Mecca" | "Madina" | string;
  totalAyah: number;
};

/** Full surah payload from the API: metadata + parallel ayah-text arrays. */
export type SurahFull = SurahMeta & {
  surahNo: number;
  audio: unknown;
  english: string[];
  arabic1: string[];
  arabic2: string[];
  bengali: string[];
  urdu: string[];
};

/** The 114-entry metadata list (1-indexed surahs live at array index n-1). */
export const SURAH_META: SurahMeta[] = surahMetaJson as SurahMeta[];

/** Returns the metadata for surah `n` (1..114), or undefined if out of range. */
export function getSurahMeta(n: number): SurahMeta | undefined {
  return SURAH_META[n - 1];
}

// Memoize in-flight + resolved fetches so 12 locale builds share one request
// per surah.
const cache = new Map<number, Promise<SurahFull>>();

/** Fetch the full surah `n` (1..114). Memoized for the lifetime of the build. */
export function getSurah(n: number): Promise<SurahFull> {
  const cached = cache.get(n);
  if (cached) return cached;

  const promise = (async () => {
    const res = await fetch(`${BASE_URL}/${n}.json`, { cache: "force-cache" });
    if (!res.ok) {
      throw new Error(`Failed to fetch surah ${n}: ${res.status}`);
    }
    return (await res.json()) as SurahFull;
  })();

  cache.set(n, promise);
  return promise;
}
