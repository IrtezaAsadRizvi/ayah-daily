"use client";

import { useEffect, useState } from "react";
import VergeDisplay from "@/components/landing/VergeDisplay";
import VergeActions from "@/components/landing/VergeActions";
import SeoIntro from "@/components/landing/SeoIntro";
import { fetchVerseDirect, VerseResponse } from "@/lib/verse/VerseLoader";

type FixedVersePageProps = {
  surah: number;
  ayah: number;
};

type InitialState = { surah: number; ayah: number; data: VerseResponse };

export default function FixedVersePage({ surah, ayah }: FixedVersePageProps) {
  const [initial, setInitial] = useState<InitialState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchVerseDirect(surah, ayah);
        if (cancelled) return;
        setInitial({ surah, ayah, data });
      } catch (err: any) {
        if (cancelled) return;
        setError(err?.message || "Failed to load verse.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [surah, ayah]);

  if (error) {
    return (
      <section className="space-y-2 text-center flex-grow flex justify-center items-center flex-col max-w-4xl px-4">
        <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
      </section>
    );
  }

  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <VergeDisplay initial={initial} mode="fixed" />
      <VergeActions />
      <SeoIntro />
    </section>
  );
}
