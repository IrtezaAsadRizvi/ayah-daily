// lib/verse/VerseServer.ts
import { AYAH_COUNTS, SURAH_COUNT } from "./constants";
import type { VerseResponse, VergeOfDay } from "./VerseLoader";

const BASE_URL = "https://quranapi.pages.dev/api/";

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pickDailySuraAyah(dateStr: string): { surah: number; ayah: number } {
  const seed = hashString(dateStr);
  const surah = (seed % SURAH_COUNT) + 1;
  const ayahSeed = (seed * 9301 + 49297) % 233280;
  const ayah = (ayahSeed % AYAH_COUNTS[surah]) + 1;
  return { surah, ayah };
}

async function fetchVerse(surah: number, ayah: number): Promise<VerseResponse> {
  const url = `${BASE_URL}/${surah}/${ayah}.json`;
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to fetch verse ${surah}/${ayah}: ${res.status}`);
  return (await res.json()) as VerseResponse;
}

export async function getServerVerseOfDay(): Promise<VergeOfDay> {
  const today = new Date().toISOString().slice(0, 10);
  const { surah, ayah } = pickDailySuraAyah(today);
  const data = await fetchVerse(surah, ayah);
  return { surah, ayah, data };
}
