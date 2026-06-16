// lib/bookmarks.ts
// Client-only verse bookmarks, persisted in localStorage under `verge_bookmarks`.

export type Bookmark = { surah: string; verse: string; date: string };

const KEY_VERGE_BOOKMARKS = "verge_bookmarks";

const isBrowser = typeof window !== "undefined";

function localIsoWithOffset(d = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  const tzMin = -d.getTimezoneOffset();
  const sign = tzMin >= 0 ? "+" : "-";
  const abs = Math.abs(tzMin);
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}` +
    `${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`
  );
}

export function getBookmarks(): Bookmark[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(KEY_VERGE_BOOKMARKS);
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

function save(list: Bookmark[]) {
  if (!isBrowser) return;
  localStorage.setItem(KEY_VERGE_BOOKMARKS, JSON.stringify(list));
}

export function isBookmarked(surah: string | number, ayah: string | number): boolean {
  const s = String(surah);
  const v = String(ayah);
  return getBookmarks().some((e) => e.surah === s && e.verse === v);
}

/**
 * Toggle a bookmark for (surah, ayah). Returns the new bookmarked state.
 */
export function toggleBookmark(surah: string | number, ayah: string | number): boolean {
  if (!isBrowser) return false;
  const s = String(surah);
  const v = String(ayah);
  const list = getBookmarks();
  const idx = list.findIndex((e) => e.surah === s && e.verse === v);
  if (idx >= 0) {
    list.splice(idx, 1);
    save(list);
    return false;
  }
  list.push({ surah: s, verse: v, date: localIsoWithOffset() });
  save(list);
  return true;
}
