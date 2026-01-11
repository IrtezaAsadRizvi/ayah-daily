// components/landing/VerseHistory.tsx
"use client";

import React, { useCallback } from "react";
import { BookOpenText } from "lucide-react";
import Dropdown, { DropdownItem } from "../common/Dropdown";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setVerse } from "@/state/verseSlice";
import { fetchVerseDirect } from "@/lib/verse/VerseLoader";

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
  const t = useTranslations("Display");
  const tHeader = useTranslations("Header");
  const dispatch = useDispatch();

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

  const loadAndShow = useCallback(
    async (s: string, a: string) => {
      const surah = Number(s);
      const ayah = Number(a);
      if (!Number.isFinite(surah) || !Number.isFinite(ayah)) return;
      try {
        // fetch only → no writes to verge_of_the_day
        const data = await fetchVerseDirect(surah, ayah);
        // update UI via Redux store
        dispatch(setVerse(data));
      } catch (e) {
        console.error("Failed to load verse", e);
      }
    },
    [dispatch]
  );

  const renderItem = useCallback(
    (item: DropdownItem) => {
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
        <div
          className="flex flex-col gap-2 py-1"
          onClick={() => {
            if (m?.surah && m?.verse) loadAndShow(m.surah, m.verse);
          }}
        >
          <div className="text leading-5 flex items-center justify-between">
            <span className="font-bold font-spectral text-md">{m?.title ?? item.text} </span>
            {m?.ar ? <span className="text-lg opacity-70 leading-4">{m.ar}</span> : null}
          </div>

          {m?.date ? (
            <div className="text-[11px] opacity-60 leading-4 flex items-center justify-between">
              <span className="opacity-70 text-xs font-medium capitalize">
                {t("ayah")} {m?.verse}
              </span>
              {new Date(m.date).toLocaleString().split(",")[0]}
            </div>
          ) : null}
        </div>
      );
    },
    [loadAndShow, t]
  );

  const handleSelect = (value: string) => {
    // Optional: parse and load if user selects via keyboard
    const [s, a] = value.split("/");
    if (s && a) loadAndShow(s, a);
  };

  return (
    <div className="inline-flex">
      <Dropdown
        title={<BookOpenText />}
        tooltip={tHeader("history")}
        ariaLabel={tHeader("history")}
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
