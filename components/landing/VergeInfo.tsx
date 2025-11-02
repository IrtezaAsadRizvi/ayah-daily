// components/landing/VergeInfo.tsx
"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Dot } from "lucide-react";
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
    // verse is stored at state.verse.verse
    const verse = useSelector((s: any) => s?.verse?.verse);

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

    return (
        <div className="!mt-10 flex flex-wrap items-center justify-center text-slate-600 dark:text-slate-400">
            <Dot />
            {continueUrl && (
                <a
                    href={continueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-spectral"
                >
                    {t('continue_reading')}
                </a>
            )}
            <Dot />
            {tafsirUrl && (
                <a
                    href={tafsirUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-spectral"
                >
                    {t('read_tafsir')}
                </a>
            )}
            <Dot />
        </div>
    );
}
