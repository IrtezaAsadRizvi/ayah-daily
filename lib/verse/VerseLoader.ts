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

// New viewed entry format
export type ViewedEntry = {
    surah: string; // keep as string to match requested format
    verse: string; // keep as string to match requested format
    date: string;  // ISO with local offset, e.g. "2025-11-03T21:36:00+06:00"
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
const KEY_VERGE_OF_DAY = "verge_of_the_day";           // "s/a" e.g., "2/7"
const KEY_VERGE_OF_DAY_DATE = "verge_of_the_day_date"; // "YYYY-MM-DD"
const KEY_VERGE_VIEWED = "verge_viewed";               // NEW: JSON array of ViewedEntry

// Helpers
const isBrowser = typeof window !== "undefined";
const todayStr = () => new Date().toISOString().slice(0, 10);

// Build a local ISO string with timezone offset like 2025-11-03T21:36:00+06:00
function localIsoWithOffset(d = new Date()): string {
    const pad = (n: number) => String(n).padStart(2, "0");
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    const seconds = pad(d.getSeconds());

    const tzMin = -d.getTimezoneOffset(); // minutes east of UTC
    const sign = tzMin >= 0 ? "+" : "-";
    const abs = Math.abs(tzMin);
    const offH = pad(Math.floor(abs / 60));
    const offM = pad(abs % 60);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offH}:${offM}`;
}

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

/**
 * Migration helper:
 * - Old format: {"27":"79","30":"46"} (comma-separated lists possible)
 * - New format: [{ surah:"27", verse:"79", date:"..." }, ...]
 */
function migrateOldViewedFormat(raw: any): ViewedEntry[] | null {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
    const entries: ViewedEntry[] = [];
    const now = localIsoWithOffset();
    for (const [surahStr, versesStr] of Object.entries(raw as Record<string, string>)) {
        if (typeof versesStr !== "string") continue;
        const verses = versesStr.split(",").map((v) => v.trim()).filter(Boolean);
        for (const verse of verses) {
            entries.push({ surah: surahStr, verse, date: now });
        }
    }
    return entries;
}

/**
 * Read viewed list (new format).
 * - If old format is detected, migrate and rewrite to storage.
 */
function getViewedList(): ViewedEntry[] {
    if (!isBrowser) return [];
    try {
        const raw = localStorage.getItem(KEY_VERGE_VIEWED);
        if (!raw) return [];

        const parsed = JSON.parse(raw);

        // Already new format (array of objects with surah/verse/date)
        if (Array.isArray(parsed)) {
            // Validate minimal shape
            const valid = parsed.filter(
                (e) => e && typeof e.surah === "string" && typeof e.verse === "string" && typeof e.date === "string"
            );
            // In case of garbage, return only valid ones
            return valid;
        }

        // Old object format -> migrate
        const migrated = migrateOldViewedFormat(parsed);
        if (migrated) {
            localStorage.setItem(KEY_VERGE_VIEWED, JSON.stringify(migrated));
            return migrated;
        }

        return [];
    } catch {
        return [];
    }
}

function saveViewedList(list: ViewedEntry[]) {
    if (!isBrowser) return;
    localStorage.setItem(KEY_VERGE_VIEWED, JSON.stringify(list));
}

function wasViewed(viewed: ViewedEntry[], surah: number, ayah: number): boolean {
    const s = String(surah);
    const v = String(ayah);
    return viewed.some((e) => e.surah === s && e.verse === v);
}

function setVergeOfDay(surah: number, ayah: number) {
    if (!isBrowser) return;
    localStorage.setItem(KEY_VERGE_OF_DAY, `${surah}/${ayah}`);
    localStorage.setItem(KEY_VERGE_OF_DAY_DATE, todayStr());
}

/**
 * Pick a (surah, ayah) pair that is NOT in viewed list (if possible).
 * If everything ends up viewed for a surah we try multiple attempts and then fall back.
 */
function pickFreshSuraAyah(viewed: ViewedEntry[]): { surah: number; ayah: number } {
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
    const viewed = getViewedList();
    const { surah, ayah } = pickFreshSuraAyah(viewed);
    setVergeOfDay(surah, ayah);

    const data = await fetchVerse(surah, ayah);
    return { surah, ayah, data };
}

/**
 * Mark a verse as viewed in 'verge_viewed'
 * - New format: [{ surah:"27", verse:"79", date:"2025-11-03T21:36:00+06:00" }]
 * - Prevent duplicates.
 */
export function markViewed(surah: number, ayah: number) {
    if (!isBrowser) return;
    const list = getViewedList();

    const s = String(surah);
    const v = String(ayah);
    const existsIdx = list.findIndex((e) => e.surah === s && e.verse === v);

    if (existsIdx >= 0) {
        // Already exists: optionally refresh date (or keep original; here we keep original)
        // If you prefer updating date on re-view, uncomment:
        // list[existsIdx].date = localIsoWithOffset();
        saveViewedList(list);
        return;
    }

    const entry: ViewedEntry = { surah: s, verse: v, date: localIsoWithOffset() };
    list.push(entry);
    saveViewedList(list);
}
