// components/landing/VergeInfo.tsx
"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "verge_of_the_day"; // "s/a", e.g. "2/7"

function getFromStorage(): { surah?: number; ayah?: number } {
    if (typeof window === "undefined") return {};
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const [s, a] = raw.split("/").map((n) => parseInt(n, 10));
    return {
        surah: Number.isFinite(s) ? s : undefined,
        ayah: Number.isFinite(a) ? a : undefined,
    };
}

export default function VergeInfo() {
    const t = useTranslations("Display");
    // verse is stored at state.verse.data
    const verse = useSelector((s: any) => s?.verse?.data);

    const { surah, ayah } = useMemo(() => {
        const fromLS = getFromStorage();
        return {
            surah: verse?.surahNo ?? fromLS.surah,
            ayah: verse?.ayahNo ?? fromLS.ayah ?? 1,
        };
    }, [verse]);

    const continueUrl =
        typeof surah === "number" ? `https://quran.com/${surah}` : undefined;

    const tafsirUrl =
        typeof surah === "number" && typeof ayah === "number"
            ? `https://quran.com/${surah}/${ayah}/tafsirs`
            : undefined;

    const linkClass =
        "font-spectral hover:text-slate-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors";

    return (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
            {continueUrl && (
                <a href={continueUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t("continue_reading")}
                </a>
            )}

            {continueUrl && tafsirUrl && (
                <span aria-hidden className="select-none opacity-40">
                    &middot;
                </span>
            )}

            {tafsirUrl && (
                <a href={tafsirUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t("read_tafsir")}
                </a>
            )}
        </div>
    );
}
