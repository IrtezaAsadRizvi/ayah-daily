// lib/streak.ts
// Pure, SSR-safe streak computation from the `verge_viewed` reading history.

type ViewedEntry = { surah: string; verse: string; date: string };

const KEY_VERGE_VIEWED = "verge_viewed";

function readViewed(): ViewedEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY_VERGE_VIEWED);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (e) =>
        e &&
        typeof e.surah === "string" &&
        typeof e.verse === "string" &&
        typeof e.date === "string"
    );
  } catch {
    return [];
  }
}

// Local calendar day key (YYYY-MM-DD) from any parseable date string.
function dayKey(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * Returns the current consecutive-day reading streak counting back from today.
 * - Today or yesterday anchors the streak; any gap breaks it.
 * - 0 if there is no reading history (or it only includes older days).
 */
export function computeStreak(): number {
  if (typeof window === "undefined") return 0;

  const viewed = readViewed();
  if (viewed.length === 0) return 0;

  // Unique set of local calendar days that have at least one viewed verse.
  const days = new Set<string>();
  for (const e of viewed) {
    const t = Date.parse(e.date);
    if (!Number.isFinite(t)) continue;
    days.add(dayKey(new Date(t)));
  }
  if (days.size === 0) return 0;

  const today = new Date();
  const todayKey = dayKey(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = dayKey(yesterday);

  // Anchor: streak only counts if the most recent activity is today or yesterday.
  let cursor: Date;
  if (days.has(todayKey)) {
    cursor = today;
  } else if (days.has(yesterdayKey)) {
    cursor = yesterday;
  } else {
    return 0;
  }

  let streak = 0;
  // Walk backwards one calendar day at a time while each day is present.
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
