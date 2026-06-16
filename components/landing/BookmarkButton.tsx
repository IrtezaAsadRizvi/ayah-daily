"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

// Resolve the currently-displayed verse: prefer Redux, fall back to
// the persisted "verge_of_the_day" ("s/a") for the daily verse.
function currentRef(reduxSurah?: number, reduxAyah?: number): { s: string; a: string } | null {
  if (reduxSurah && reduxAyah) return { s: String(reduxSurah), a: String(reduxAyah) };
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("verge_of_the_day");
    if (!raw) return null;
    const [s, a] = raw.split("/");
    if (!s || !a) return null;
    return { s, a };
  } catch {
    return null;
  }
}

const BookmarkButton = () => {
  const t = useTranslations("Tools");
  const surahNo = useSelector((s: any) => s?.verse?.data?.surahNo) as number | undefined;
  const ayahNo = useSelector((s: any) => s?.verse?.data?.ayahNo) as number | undefined;

  const [saved, setSaved] = useState(false);
  const [ref, setRef] = useState<{ s: string; a: string } | null>(null);

  // Recompute the active verse + saved state whenever the verse changes.
  useEffect(() => {
    const r = currentRef(surahNo, ayahNo);
    setRef(r);
    setSaved(r ? isBookmarked(r.s, r.a) : false);
  }, [surahNo, ayahNo]);

  if (!ref) return null;

  const onToggle = () => {
    const next = toggleBookmark(ref.s, ref.a);
    setSaved(next);
  };

  return (
    <button
      type="button"
      className="icon-button text-slate-600 dark:text-slate-400"
      aria-label={saved ? t("saved") : t("save")}
      title={saved ? t("saved") : t("save")}
      aria-pressed={saved}
      onClick={onToggle}
    >
      {saved ? <BookmarkCheck className="text-[#9261fb]" /> : <Bookmark />}
    </button>
  );
};

export default BookmarkButton;
