// lib/verse/VerseLoader.ts
export type ReciterAudio = {
  reciter?: string;
  url?: string;
  originalUrl?: string;
};

export type VerseResponse = {
  // required
  surahName: string;
  english: string;

  // optional (based on sample payload)
  surahNameArabic?: string;
  surahNameArabicLong?: string;
  surahNameTranslation?: string;
  revelationPlace?: string;
  totalAyah?: number;
  surahNo?: number;
  ayahNo?: number;
  audio?: Record<string, ReciterAudio>;
  arabic1?: string;
  arabic2?: string;
  bengali?: string;
  urdu?: string;

  // future-proofing for any unexpected fields
  [key: string]: unknown;
};

export type VergeOfDay = {
    surah: number;
    ayah: number;
    data: VerseResponse;
};

const BASE_URL = "https://quranapi.pages.dev/api/";

// 114 surahs total
export const SURAH_COUNT = 114;

// Ayah counts per surah (1-indexed; index 0 is a dummy)
const AYAH_COUNTS: number[] = [
    0,
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128, 111, 110, 98, 135,
    112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30, 73, 54, 45, 83, 182, 88, 75, 85,
    54, 53, 89, 59, 37, 35, 38, 29, 18, 45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13,
    14, 11, 11, 18, 12, 12, 30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42,
    29, 19, 36, 25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11,
    11, 8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6,
];

// Storage keys
const KEY_VERGE_OF_DAY = "verge_of_the_day";          // "s/a" e.g., "2/7"
const KEY_VERGE_OF_DAY_DATE = "verge_of_the_day_date"; // "YYYY-MM-DD"
const KEY_VERGE_VIEWED = "verge_viewed";              // object like {"1":"7,11","35":"5"}

// Helpers
const isBrowser = typeof window !== "undefined";
const todayStr = () => new Date().toISOString().slice(0, 10);

function randInt(min: number, max: number) {
    // inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parseSuraAyah(value: string | null): { surah: number; ayah: number } | null {
    if (!value) return null;
    const [s, a] = value.split("/").map((x) => parseInt(x, 10));
    if (!Number.isFinite(s) || !Number.isFinite(a)) return null;
    if (s < 1 || s > SURAH_COUNT) return null;
    if (a < 1 || a > AYAH_COUNTS[s]) return null;
    return { surah: s, ayah: a };
}

function getViewedMap(): Record<string, string> {
    if (!isBrowser) return {};
    try {
        const raw = localStorage.getItem(KEY_VERGE_VIEWED);
        if (!raw) return {};
        const obj = JSON.parse(raw);
        if (obj && typeof obj === "object") return obj as Record<string, string>;
        return {};
    } catch {
        return {};
    }
}

function wasViewed(viewed: Record<string, string>, surah: number, ayah: number): boolean {
    const list = viewed[String(surah)];
    if (!list) return false;
    // list like "7,11"
    const set = new Set(list.split(",").filter(Boolean).map((n) => parseInt(n, 10)));
    return set.has(ayah);
}

function setVergeOfDay(surah: number, ayah: number) {
    if (!isBrowser) return;
    localStorage.setItem(KEY_VERGE_OF_DAY, `${surah}/${ayah}`);
    localStorage.setItem(KEY_VERGE_OF_DAY_DATE, todayStr());
}

/**
 * Pick a (surah, ayah) pair that is NOT in verge_viewed (if possible).
 * If everything ends up viewed for a surah we try multiple attempts and then fall back.
 */
function pickFreshSuraAyah(viewed: Record<string, string>): { surah: number; ayah: number } {
    const MAX_ATTEMPTS = 500; // ample tries to avoid viewed ones
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
        const surah = randInt(1, SURAH_COUNT);
        const ayah = randInt(1, AYAH_COUNTS[surah]);
        if (!wasViewed(viewed, surah, ayah)) return { surah, ayah };
    }
    // Fallback: return any valid (if user viewed too much)
    const surah = randInt(1, SURAH_COUNT);
    const ayah = randInt(1, AYAH_COUNTS[surah]);
    return { surah, ayah };
}

/**
 * Fetch verse JSON from the API, e.g. /2/7.json
 */
async function fetchVerse(surah: number, ayah: number): Promise<VerseResponse> {
    const url = `${BASE_URL}/${surah}/${ayah}.json`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
        throw new Error(`Failed to fetch verse ${surah}/${ayah}: ${res.status}`);
    }
    const data = (await res.json()) as VerseResponse;
    return data;
}

/**
 * Public: Load the "verge of the day"
 * - Keeps the same through the day (changes next day).
 * - Avoids ayahs already in 'verge_viewed' when selecting a new one.
 * - Returns { surah, ayah, data } with 'surahName' and 'english' in data.
 */
export async function loadVergeOfToday(): Promise<VergeOfDay> {
    if (!isBrowser) {
        // SSR guard: pick a deterministic placeholder within bounds (won't set storage on server)
        const surah = 1;
        const ayah = 1;
        const data = await fetchVerse(surah, ayah);
        return { surah, ayah, data };
    }

    const lastDate = localStorage.getItem(KEY_VERGE_OF_DAY_DATE);
    const storedPair = parseSuraAyah(localStorage.getItem(KEY_VERGE_OF_DAY));
    const today = todayStr();

    // If same day and we have a stored pair, reuse it
    if (lastDate === today && storedPair) {
        const data = await fetchVerse(storedPair.surah, storedPair.ayah);
        return { surah: storedPair.surah, ayah: storedPair.ayah, data };
    }

    // New day or missing pair: pick a new one, avoiding viewed
    const viewed = getViewedMap();
    const { surah, ayah } = pickFreshSuraAyah(viewed);
    setVergeOfDay(surah, ayah);

    const data = await fetchVerse(surah, ayah);
    return { surah, ayah, data };
}

/**
 * Mark a verse as viewed in 'verge_viewed'
 * - Format: {"1":"7,11","35":"5"}
 */
export function markViewed(surah: number, ayah: number) {
    if (!isBrowser) return;
    const viewed = getViewedMap();
    const key = String(surah);
    const current = new Set(
        (viewed[key]?.split(",") ?? []).filter(Boolean).map((n) => parseInt(n, 10))
    );
    current.add(ayah);
    viewed[key] = Array.from(current).sort((a, b) => a - b).join(",");
    localStorage.setItem(KEY_VERGE_VIEWED, JSON.stringify(viewed));
}
