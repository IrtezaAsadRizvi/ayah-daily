// components/landing/VergeDisplay.tsx
"use client";

import React, { useEffect, useState } from "react";
import { loadVergeOfToday, markViewed, VerseResponse } from "@/lib/verse/VerseLoader";
import { useTranslations, useLocale } from "next-intl";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { setVerse } from "@/state/verseSlice";
import VergeInfo from "@/components/landing/VergeInfo";
import { Loader } from "lucide-react";

type LoadingState = { status: "idle" | "loading" };
type ReadyState = { status: "ready"; surah: number; ayah: number; data: VerseResponse };
type ErrorState = { status: "error"; message: string };
type State = LoadingState | ReadyState | ErrorState;

export default function VergeDisplay() {
  const t = useTranslations("Display");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<State>({ status: "idle" });

  // Verse selected elsewhere (e.g., from history dropdown) lives in Redux
  const storeVerse = useAppSelector((s) => s.verse.data);

  // On mount: load today's verge (persisted pair), mark as viewed once
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setState({ status: "loading" });
        const { surah, ayah, data } = await loadVergeOfToday();
        if (cancelled) return;

        // Share initial verse in global state (lets other components render it)
        dispatch(setVerse(data));

        // Keep your viewed history behavior for the daily pick
        markViewed(surah, ayah);

        setState({ status: "ready", surah, ayah, data });
      } catch (err: any) {
        if (cancelled) return;
        setState({ status: "error", message: err?.message || "Failed to load verse." });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  // If Redux verse changes (e.g., user clicked a history item), show it on-screen only
  useEffect(() => {
    if (!storeVerse) return;

    setState((prev) => {
      const prevReady = (prev && prev.status === "ready" ? prev : null) as ReadyState | null;
      const surah = storeVerse.surahNo ?? prevReady?.surah ?? 0;
      const ayah = storeVerse.ayahNo ?? prevReady?.ayah ?? 0;
      return { status: "ready", surah, ayah, data: storeVerse };
    });
  }, [storeVerse]);

  if (state.status !== "ready") {
    if (state.status === "error") {
      return (
        <section className="space-y-2 text-center flex-grow flex justify-center items-center flex-col max-w-4xl px-4">
          <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">{state.message}</div>
        </section>
      );
    }
    return (
      <section className="space-y-2 text-center flex-grow flex justify-center items-center flex-col max-w-4xl px-4">
        <span className="text-black/50 animate-spin">
          <Loader size={32} />
        </span>
      </section>
    );
  }

  const { data } = state;

  // Choose translation based on locale
  const isBn = (locale || "").toLowerCase() === "bn";
  const displayText = isBn && data.bengali ? data.bengali : data.english;
  const displayLang = isBn && data.bengali ? "bn" : "en";

  return (
    <section className="space-y-2 text-center flex-grow flex justify-center items-center flex-col max-w-4xl p-4">
      {data.surahNameTranslation && (
        <p className="text-slate-600 dark:text-slate-400 font-medium">{data.surahNameTranslation}</p>
      )}

      <h2 className="font-semibold font-spectral text-4xl !mb-10">{data.surahName}</h2>

      {data.arabic1 && (
        <p className="text-2xl leading-relaxed font-arabic" lang="ar" dir="rtl">
          {data.arabic1}
        </p>
      )}

      <p className="text-2xl leading-relaxed font-spectral font-medium" lang={displayLang}>
        {displayText}
      </p>

      {data.ayahNo && (
        <p className="text text-slate-600 dark:text-slate-400 font-medium font-spectral">
          <span className="capitalize">{t("ayah")}</span> {data.ayahNo}
        </p>
      )}

      <VergeInfo />
    </section>
  );
}
