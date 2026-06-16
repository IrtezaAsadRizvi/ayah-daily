// components/landing/VergeDisplay.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
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

type VergeDisplayProps = {
  initial?: { surah: number; ayah: number; data: VerseResponse } | null;
  mode?: "daily" | "fixed";
};

export default function VergeDisplay({ initial, mode = "daily" }: VergeDisplayProps) {
  const t = useTranslations("Display");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<State>(
    initial ? { status: "ready", surah: initial.surah, ayah: initial.ayah, data: initial.data } : { status: "idle" }
  );

  // Verse selected elsewhere (e.g., from history dropdown) lives in Redux
  const storeVerse = useAppSelector((s) => s.verse.data);

  // Refs for fit-to-viewport sizing
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initial?.data) dispatch(setVerse(initial.data));
  }, [dispatch, initial?.data]);

  useEffect(() => {
    if (mode !== "fixed" || !initial?.data) return;
    setState({ status: "ready", surah: initial.surah, ayah: initial.ayah, data: initial.data });
  }, [initial, mode]);

  // On mount: load today's verge (persisted pair), mark as viewed once
  useEffect(() => {
    if (mode === "fixed") return;
    let cancelled = false;

    (async () => {
      try {
        if (!initial) setState({ status: "loading" });
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
  }, [dispatch, initial, mode]);

  useEffect(() => {
    if (mode !== "fixed" || !initial) return;
    markViewed(initial.surah, initial.ayah);
  }, [initial, mode]);

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

  // Fit the verse block to the available height: shrink a --verse-scale custom
  // property (which all verse type sizes multiply by) until the content fits.
  // Re-runs on verse change, viewport resize, and once web fonts have loaded.
  useEffect(() => {
    const box = sectionRef.current;
    const content = contentRef.current;
    if (!box || !content) return;

    const fit = () => {
      content.style.setProperty("--verse-scale", "1");
      const available = box.clientHeight - 16; // small breathing buffer
      if (available <= 0) return;
      let scale = 1;
      let guard = 0;
      // Step down until it fits (or we hit a readable floor).
      while (content.scrollHeight > available && scale > 0.6 && guard < 24) {
        scale = Math.max(0.6, scale - 0.04);
        content.style.setProperty("--verse-scale", String(scale));
        guard++;
      }
    };

    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(box);
    (document as any).fonts?.ready?.then(fit).catch(() => {});

    return () => ro.disconnect();
  }, [state]);

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

  // Choose translation based on locale.
  // We only have real per-locale verse data for Bengali (bn) and Urdu (ur).
  // Every other locale (fr/es/tr/etc) honestly falls back to English until
  // real per-locale verse translation data is available. We never fabricate
  // translations for locales we don't have data for.
  const normalizedLocale = (locale || "").toLowerCase();
  let displayText = data.english;
  let displayLang = "en";
  let displayDir: "ltr" | "rtl" = "ltr";

  if (normalizedLocale === "bn" && data.bengali) {
    displayText = data.bengali;
    displayLang = "bn";
  } else if (normalizedLocale === "ur" && data.urdu) {
    displayText = data.urdu;
    displayLang = "ur";
    displayDir = "rtl";
  }

  // Type sizes scale with viewport width (clamp) and the fit factor (--verse-scale).
  const surahNameSize = "calc(clamp(1.5rem, 5vw, 2.25rem) * var(--verse-scale, 1))";
  const arabicSize = "calc(clamp(1.4rem, 6vw, 2.75rem) * var(--verse-scale, 1))";
  const translationSize = "calc(clamp(1rem, 3.4vw, 1.5rem) * var(--verse-scale, 1))";

  return (
    <section
      ref={sectionRef}
      className="flex-grow w-full flex flex-col justify-center items-center text-center px-6"
    >
      {/* key re-triggers the staggered entrance + refit whenever the verse changes */}
      <div key={`${state.surah}/${state.ayah}`} ref={contentRef} className="w-full max-w-3xl mx-auto">
        {/* Eyebrow / kicker — the page's single h1, framing rather than competing */}
        <h1
          className="animate-verse-rise text-[11px] sm:text-xs font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400"
          style={{ animationDelay: "0ms" }}
        >
          {t("title")}
        </h1>

        {data.surahNameTranslation && (
          <p
            className="animate-verse-rise mt-5 text-sm font-medium text-slate-500 dark:text-slate-400"
            style={{ animationDelay: "80ms" }}
          >
            {data.surahNameTranslation}
          </p>
        )}

        <h2
          className="animate-verse-rise mt-1 font-spectral font-semibold leading-tight"
          style={{ animationDelay: "140ms", fontSize: surahNameSize }}
        >
          {data.surahName}
        </h2>

        {data.arabic1 && (
          <p
            className="animate-verse-rise mt-10 font-arabic leading-[1.9] text-slate-900 dark:text-white"
            style={{ animationDelay: "240ms", fontSize: arabicSize }}
            lang="ar"
            dir="rtl"
          >
            {data.arabic1}
          </p>
        )}

        <p
          className="animate-verse-rise mt-7 mx-auto max-w-2xl font-spectral leading-relaxed text-slate-700 dark:text-slate-200"
          style={{ animationDelay: "340ms", fontSize: translationSize }}
          lang={displayLang}
          dir={displayDir}
        >
          {displayText}
        </p>

        {data.ayahNo && (
          <p
            className="animate-verse-rise mt-6 text-sm font-medium font-spectral text-slate-500 dark:text-slate-400"
            style={{ animationDelay: "420ms" }}
          >
            <span className="capitalize">{t("ayah")}</span> {data.ayahNo}
          </p>
        )}

        <div className="animate-verse-rise" style={{ animationDelay: "500ms" }}>
          <VergeInfo />
        </div>
      </div>
    </section>
  );
}
