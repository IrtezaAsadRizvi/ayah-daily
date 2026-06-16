"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

type SurahMeta = {
  surahName: string;
  surahNameArabic?: string;
  surahNameTranslation?: string;
};

// Module-level cache so we don't refetch surah.json on every open.
let surahCache: SurahMeta[] | null = null;

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("Tools");
  const locale = useLocale();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [surahs, setSurahs] = useState<SurahMeta[]>(surahCache ?? []);

  // Load surah list once when first opened.
  useEffect(() => {
    if (!open || surahCache) return;
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/surah.json", { cache: "force-cache" });
        if (!res.ok) return;
        const data = (await res.json()) as SurahMeta[];
        surahCache = data;
        if (alive) setSurahs(data);
      } catch {
        // surah list optional — search just yields no matches
      }
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

  // Reset query each time the modal is opened.
  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  const trimmed = query.trim();

  // Detect "39:10" or "39 10" → jump-to-verse intent.
  const verseRef = useMemo(() => {
    const m = trimmed.match(/^(\d+)\s*[:\s]\s*(\d+)$/);
    if (!m) return null;
    return { surah: Number(m[1]), ayah: Number(m[2]) };
  }, [trimmed]);

  const matches = useMemo(() => {
    const q = trimmed.toLowerCase();
    if (!q) return [];
    return surahs
      .map((s, i) => ({ ...s, surahNo: i + 1 }))
      .filter(
        (s) =>
          s.surahName?.toLowerCase().includes(q) ||
          s.surahNameTranslation?.toLowerCase().includes(q)
      )
      .slice(0, 30);
  }, [surahs, trimmed]);

  const goSurah = (surahNo: number) => {
    onClose();
    router.push(`/${locale}/surah/${surahNo}`);
  };

  const goVerse = (surah: number, ayah: number) => {
    onClose();
    router.push(`/${locale}?surah=${surah}&ayah=${ayah}`);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] bg-black/45 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={t("search")}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/20
                   bg-white/10 backdrop-blur-2xl shadow-2xl
                   text-white p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-spectral font-semibold text-lg">{t("search")}</h2>
          <button
            type="button"
            aria-label="Close"
            className="icon-button text-white/70 hover:text-white"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search_placeholder")}
            className="w-full rounded-xl border border-white/20 bg-white/10
                       px-4 py-2.5 text-white placeholder-white/50
                       outline-none focus:border-white/40"
          />
        </div>

        {/* Jump-to-verse action when query looks like S:A */}
        {verseRef && (
          <button
            type="button"
            onClick={() => goVerse(verseRef.surah, verseRef.ayah)}
            className="mt-3 flex w-full items-center justify-between rounded-xl
                       border border-white/20 bg-[#9261fb]/30 px-4 py-2.5
                       text-left hover:bg-[#9261fb]/45 focus:outline-none"
          >
            <span className="text-sm">
              {t("jump_hint")} · {verseRef.surah}:{verseRef.ayah}
            </span>
            <ArrowRight size={16} className="rtl:rotate-180" />
          </button>
        )}

        {/* Surah name matches */}
        {trimmed && (
          <div className="mt-3 max-h-[50vh] overflow-y-auto">
            {matches.length === 0 && !verseRef ? (
              <p className="py-4 text-sm opacity-70">{t("no_results")}</p>
            ) : (
              <ul className="divide-y divide-white/15">
                {matches.map((m) => (
                  <li key={m.surahNo}>
                    <button
                      type="button"
                      onClick={() => goSurah(m.surahNo)}
                      className="w-full rounded-lg px-1 py-2.5 text-left
                                 hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-spectral font-bold">
                          {m.surahNo}. {m.surahName}
                        </span>
                        {m.surahNameArabic ? (
                          <span className="text-lg opacity-70">{m.surahNameArabic}</span>
                        ) : null}
                      </div>
                      {m.surahNameTranslation ? (
                        <div className="mt-0.5 text-[11px] opacity-60">
                          {m.surahNameTranslation}
                        </div>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
