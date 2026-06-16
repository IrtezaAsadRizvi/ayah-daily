"use client";

import React, { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setVerse } from "@/state/verseSlice";
import { fetchVerseDirect } from "@/lib/verse/VerseLoader";
import { TOTAL_AYAHS } from "@/lib/verse/constants";

type ViewedEntry = { surah: string; verse: string; date: string };
type SurahMeta = { surahName: string; surahNameArabic?: string };
type RecentItem = { surah: string; verse: string; date: string; title: string; ar: string };

function readViewedList(): ViewedEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("verge_viewed");
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

export default function ProgressModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("Progress");
  const tDisplay = useTranslations("Display");
  const dispatch = useDispatch();

  const [readCount, setReadCount] = useState(0);
  const [recent, setRecent] = useState<RecentItem[]>([]);

  // Read progress + recent 5 from localStorage each time the modal opens.
  useEffect(() => {
    if (!open) return;
    const viewed = readViewedList();
    setReadCount(viewed.length);

    const recent5 = viewed
      .slice()
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
      .slice(0, 5);

    if (recent5.length === 0) {
      setRecent([]);
      return;
    }

    let alive = true;
    (async () => {
      let surahs: SurahMeta[] = [];
      try {
        const res = await fetch("/surah.json", { cache: "no-store" });
        if (res.ok) surahs = (await res.json()) as SurahMeta[];
      } catch {
        // surah names are optional — fall back to "Surah N"
      }
      if (!alive) return;
      setRecent(
        recent5.map((v) => {
          const meta = surahs[Number(v.surah) - 1];
          return {
            surah: v.surah,
            verse: v.verse,
            date: v.date,
            title: meta?.surahName ?? `Surah ${v.surah}`,
            ar: meta?.surahNameArabic ?? "",
          };
        })
      );
    })();
    return () => {
      alive = false;
    };
  }, [open]);

  // Escape to close + lock background scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const loadAndShow = useCallback(
    async (s: string, a: string) => {
      const surah = Number(s);
      const ayah = Number(a);
      if (!Number.isFinite(surah) || !Number.isFinite(ayah)) return;
      try {
        const data = await fetchVerseDirect(surah, ayah);
        dispatch(setVerse(data));
        onClose();
      } catch (e) {
        console.error("Failed to load verse", e);
      }
    },
    [dispatch, onClose]
  );

  if (!open) return null;

  const pct = TOTAL_AYAHS > 0 ? (readCount / TOTAL_AYAHS) * 100 : 0;
  const pctLabel = pct > 0 && pct < 0.1 ? "<0.1" : pct.toFixed(1);
  // Keep a visible sliver once at least one ayah is read.
  const barWidth = Math.max(pct, readCount > 0 ? 1.5 : 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={t("title")}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/20
                   bg-white/10 backdrop-blur-2xl shadow-2xl
                   text-white p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-spectral font-semibold text-lg">{t("title")}</h2>
          <button
            type="button"
            aria-label="Close"
            className="icon-button text-white/70 hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Overall Quran progress */}
        <div className="mt-4">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-[#9261fb] transition-[width] duration-500"
              style={{ width: `${barWidth}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-white/80">
            {t("ayahs_read", {
              read: readCount.toLocaleString(),
              total: TOTAL_AYAHS.toLocaleString(),
            })}
            <span className="opacity-70"> · {pctLabel}%</span>
          </p>
        </div>

        {/* Recent 5 ayahs */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold uppercase tracking-wide opacity-60">
            {t("recent")}
          </h3>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm opacity-70">{t("empty")}</p>
          ) : (
            <ul className="mt-2 divide-y divide-white/15">
              {recent.map((r, i) => (
                <li key={`${r.surah}/${r.verse}/${i}`}>
                  <button
                    type="button"
                    onClick={() => loadAndShow(r.surah, r.verse)}
                    className="w-full text-left py-2.5 px-1 rounded-lg
                               hover:bg-white/10 focus:outline-none focus:bg-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-spectral">{r.title}</span>
                      {r.ar ? <span className="text-lg opacity-70">{r.ar}</span> : null}
                    </div>
                    <div className="mt-0.5 flex items-center justify-between text-[11px] opacity-60">
                      <span className="capitalize">
                        {tDisplay("ayah")} {r.verse}
                      </span>
                      <span>{new Date(r.date).toLocaleDateString()}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
