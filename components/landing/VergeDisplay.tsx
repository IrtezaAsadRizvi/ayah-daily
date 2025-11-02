"use client";

import React, { useEffect, useState } from "react";
import { loadVergeOfToday, markViewed, VerseResponse } from "@/lib/verse/VerseLoader";
import { useTranslations, useLocale } from "next-intl";
import { useDispatch } from "react-redux";
import { setVerse } from "@/state/verseSlice";
import VergeInfo from '@/components/landing/VergeInfo'
import { Loader } from "lucide-react";

type LoadingState = { status: "idle" | "loading" };
type ReadyState = { status: "ready"; surah: number; ayah: number; data: VerseResponse };
type ErrorState = { status: "error"; message: string };
type State = LoadingState | ReadyState | ErrorState;

export default function VergeDisplay() {
    const t = useTranslations("Display");
    const locale = useLocale();
    const dispatch = useDispatch();
    const [state, setState] = useState<State>({ status: "idle" });

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                setState({ status: "loading" });
                const { surah, ayah, data } = await loadVergeOfToday();
                if (cancelled) return;
                dispatch(setVerse(data));
                markViewed(surah, ayah);
                setState({ status: "ready", surah, ayah, data });
            } catch (err: any) {
                if (cancelled) return;
                setState({ status: "error", message: err?.message || "Failed to load verse." });
            }
        })();
        return () => { cancelled = true; };
    }, [dispatch]);

    if (state.status !== "ready") {
        if (state.status === "error") {
            return <section className="space-y-2 text-center flex-grow flex justify-center items-center flex-col max-w-4xl px-4">
                <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">{state.message}</div>
            </section>;
        }
        return <section className="space-y-2 text-center flex-grow flex justify-center items-center flex-col max-w-4xl px-4">
            <span className="text-black/50 animate-spin"><Loader size={32}/></span>
        </section>;
    }

    const { data } = state;

    // Choose translation based on locale
    const isBn = locale?.toLowerCase() === "bn";
    const displayText = isBn && data.bengali ? data.bengali : data.english;
    const displayLang = isBn && data.bengali ? "bn" : "en";

    return (
        <section className="space-y-2 text-center flex-grow flex justify-center items-center flex-col max-w-4xl p-4">
            {data.surahNameTranslation && <p className="text-slate-600 dark:text-slate-400 font-medium">{data.surahNameTranslation}</p>}

            <h2 className="font-semibold font-spectral text-4xl !mb-10">
                {data.surahName}
            </h2>

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

            <VergeInfo/>
        </section>
    );
}
