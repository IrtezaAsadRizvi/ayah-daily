"use client";

import React, { useCallback } from "react";
import { BookOpenText } from "lucide-react";
import Dropdown, { DropdownItem } from "../common/Dropdown";
// If you already export ViewedEntry from VerseLoader, use the import below.
// import type { ViewedEntry } from "@/lib/verse/VerseLoader";

// Minimal local type to avoid coupling:
type ViewedEntry = { surah: string; verse: string; date: string };

type SurahMeta = {
    surahName: string;
    surahNameArabic?: string;
    surahNameArabicLong?: string;
    surahNameTranslation?: string;
    revelationPlace?: string;
    totalAyah?: number;
};

function readViewedList(): ViewedEntry[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem("verge_viewed");
        const parsed = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(
            (e) => e && typeof e.surah === "string" && typeof e.verse === "string" && typeof e.date === "string"
        );
    } catch {
        return [];
    }
}

async function fetchSurahs(): Promise<SurahMeta[]> {
    // public/surah.json → fetch only when dropdown opens
    const res = await fetch("/surah.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load surah.json");
    return (await res.json()) as SurahMeta[];
}

const VerseHistory = () => {
    const loadItemsOnOpen = useCallback(async (): Promise<DropdownItem[]> => {
        // get most recent 5
        const viewed = readViewedList()
            .slice()
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .slice(0, 5);

        if (viewed.length === 0) return [];

        const surahs = await fetchSurahs();

        // Build dropdown items
        const items: DropdownItem[] = viewed.map((v) => {
            const sNum = Number(v.surah); // surah.json is 1-indexed by order
            const meta = surahs[sNum - 1];
            const title = meta?.surahName ?? `Surah ${v.surah}`;
            const ar = meta?.surahNameArabic ?? "";
            const value = `${v.surah}/${v.verse}`;

            return {
                text: `${title} - ${v.verse}`,
                value,
                // Pass any extra data for custom renderer
                meta: {
                    ar,
                    date: v.date,
                    title,
                    verse: v.verse,
                    surah: v.surah,
                },
            };
        });

        return items;
    }, []);

    const renderItem = useCallback((item: DropdownItem) => {
        const m = item.meta as
            | {
                ar?: string;
                date?: string;
                title?: string;
                verse?: string;
                surah?: string;
            }
            | undefined;

        return (
            <div className="flex flex-col gap-0.5 py-1">
                <div className="text-sm leading-5">
                    {m?.title ?? item.text}{" "}
                    <span className="opacity-70">- {m?.verse}</span>
                </div>
                {m?.ar ? (
                    <div className="text-xs opacity-70 leading-4">{m.ar}</div>
                ) : null}
                {m?.date ? (
                    <div className="text-[11px] opacity-60 leading-4">
                        {new Date(m.date).toLocaleString()}
                    </div>
                ) : null}
            </div>
        );
    }, []);

    const handleSelect = (value: string) => {
        // Do whatever you prefer (navigate, copy, toast, etc.)
        // For now, just log: "27/79"
        // You can navigate to your verse page if you have one.
        console.log("Selected verse:", value);
    };

    return (
        <div className="inline-flex">
            <Dropdown
            title={<BookOpenText />}
            loadItemsOnOpen={loadItemsOnOpen}
            renderItem={renderItem}
            onSelect={handleSelect}
            listClassName="min-w-[240px]"
            itemClassName="px-4 py-2"
            emptyContent={<span className="px-4 py-2 text-sm opacity-70">No recent items</span>}
            />
        </div>
    );
};

export default VerseHistory;
